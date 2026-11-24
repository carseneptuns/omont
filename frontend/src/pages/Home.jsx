import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Typewriter from "../components/Typewriter.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import PaperColorPicker from "../components/PaperColorPicker.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Toast from "../components/Toast.jsx";
import ExportCard from "../components/ExportCard.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { memoriesApi } from "../services/api.js";
import { MAX_WORDS, countWords } from "../utils/constants.js";
import { getPaperColor } from "../utils/paperColors.js";
import { PiPlusLight, PiDownloadSimpleLight } from "react-icons/pi";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memoryId = searchParams.get("memory");

  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("blue");
  const [paperColor, setPaperColor] = useState("beige");

  const [saveStatus, setSaveStatus] = useState("idle");
  const [toast, setToast] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [jitter, setJitter] = useState(false);
  const [confirmNewPage, setConfirmNewPage] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isFirstRun = useRef(true);
  const jitterTimeout = useRef(null);
  const keyTimeout = useRef(null);
  const limitWarned = useRef(false);
  const exportRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const wordCount = countWords(content);
  const pageFull = wordCount >= MAX_WORDS;

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedContent = useDebounce(content, 1000);
  const debouncedColor = useDebounce(color, 300);
  const debouncedPaperColor = useDebounce(paperColor, 300);

  const showToast = (message, tone = "success") =>
    setToast({ id: Date.now(), message, tone });

  // load a specific memory if the URL asks for one
  useEffect(() => {
    if (!memoryId) {
      setLoaded(true);
      return;
    }
    memoriesApi
      .getOne(memoryId)
      .then((memory) => {
        setId(memory.id);
        setTitle(memory.title);
        setContent(memory.content || "");
        setColor(memory.typewriter_color);
        setPaperColor(memory.paper_color || "beige");
      })
      .catch(() => showToast("Couldn't open that memory.", "error"))
      .finally(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoryId]);

  const persist = useCallback(async () => {
    if (!loaded) return;
    if (!title.trim() && !content.trim()) return; // nothing worth saving yet

    setSaveStatus("saving");
    try {
      if (id) {
        await memoriesApi.update(id, { title, content, color, paperColor });
      } else {
        const created = await memoriesApi.create({ title, content, color, paperColor });
        setId(created.id);
        setSearchParams({ memory: created.id }, { replace: true });
      }
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, [id, title, content, color, paperColor, loaded, setSearchParams]);

  // autosave on debounced change
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, debouncedContent, debouncedColor, debouncedPaperColor]);

  const handleContentChange = (value) => {
    const nextWords = countWords(value);

    // once a page is full, only allow edits that shrink it back down —
    // typing more just gets rejected in favor of a new page
    if (nextWords > MAX_WORDS && nextWords > wordCount) {
      if (!limitWarned.current) {
        showToast(
          `This page is full at ${MAX_WORDS} words — start a new page to keep writing.`,
          "error"
        );
        limitWarned.current = true;
      }
      return;
    }

    limitWarned.current = false;
    setContent(value);
  };

  const handleType = (key) => {
    setJitter(true);
    clearTimeout(jitterTimeout.current);
    jitterTimeout.current = setTimeout(() => setJitter(false), 100);

    if (/^[a-zA-Z]$/.test(key)) {
      setActiveKey(key.toUpperCase());
      clearTimeout(keyTimeout.current);
      keyTimeout.current = setTimeout(() => setActiveKey(null), 90);
    }
  };

  const handleSaveClick = async () => {
    await persist();
    showToast(id ? "Changes saved." : "Memory saved.");
  };

  const handleSaveImage = async () => {
    if (!content.trim() && !title.trim()) {
      showToast("Write something first.", "error");
      return;
    }
    setExporting(true);
    try {
      // let the export node paint before we grab it
      await new Promise((resolve) => setTimeout(resolve, 50));
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: getPaperColor(paperColor).bg,
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");

      const slug =
        (title.trim() || "untitled-memory")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "untitled-memory";

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `omont-${slug}.png`;
      link.click();

      showToast("Image saved.");
    } catch {
      showToast("Couldn't create the image.", "error");
    } finally {
      setExporting(false);
    }
  };

  const startNewPage = () => {
    if (title.trim() || content.trim()) {
      setConfirmNewPage(true);
    } else {
      resetPage();
    }
  };

  const resetPage = () => {
    setId(null);
    setTitle("");
    setContent("");
    setSaveStatus("idle");
    limitWarned.current = false;
    setSearchParams({}, { replace: true });
    setConfirmNewPage(false);
  };

  return (
    <div className="pb-24">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-end gap-5 mb-10 md:mb-14">
        <button
          onClick={startNewPage}
          className="focus-ring flex items-center gap-1.5 text-xs font-mono tracking-wide text-paper-ink/60 hover:text-paper-ink transition-colors"
        >
          <PiPlusLight /> New Page
        </button>
        <button
          onClick={handleSaveClick}
          className="focus-ring text-xs font-mono tracking-wide text-paper-ink/60 hover:text-paper-ink transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleSaveImage}
          disabled={exporting}
          className="focus-ring flex items-center gap-1.5 text-xs font-mono tracking-wide text-paper-ink/60 hover:text-paper-ink transition-colors disabled:opacity-40"
        >
          <PiDownloadSimpleLight />
          {exporting ? "Saving..." : "Save Image"}
        </button>
        <ColorPicker value={color} onChange={setColor} />
        <PaperColorPicker value={paperColor} onChange={setPaperColor} />
      </div>

      <Typewriter
        color={color}
        title={title}
        onTitleChange={setTitle}
        content={content}
        onContentChange={handleContentChange}
        onType={handleType}
        saveStatus={saveStatus}
        jitter={jitter}
        activeKey={activeKey}
        wordCount={wordCount}
        maxWords={MAX_WORDS}
        pageFull={pageFull}
        paperColor={paperColor}
      />

      <ConfirmModal
        open={confirmNewPage}
        title="Start a new page?"
        message="Your current memory is already saved."
        confirmLabel="New Page"
        onConfirm={resetPage}
        onCancel={() => setConfirmNewPage(false)}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* off-screen source node for the "Save Image" export — never shown to the user */}
      <div style={{ position: "fixed", top: 0, left: -10000, pointerEvents: "none" }}>
        <ExportCard ref={exportRef} title={title} content={content} paperColor={paperColor} />
      </div>
    </div>
  );
}
