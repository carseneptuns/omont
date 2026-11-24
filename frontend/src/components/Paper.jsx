import { motion } from "framer-motion";
import WritingArea from "./WritingArea.jsx";
import SaveStatus from "./SaveStatus.jsx";
import { stampDate } from "../utils/dateUtils.js";
import { getPaperColor } from "../utils/paperColors.js";

export default function Paper({
  title,
  onTitleChange,
  content,
  onContentChange,
  onType,
  saveStatus,
  jitter,
  wordCount = 0,
  maxWords,
  pageFull,
  paperColor = "beige",
}) {
  const shade = getPaperColor(paperColor);

  return (
    <motion.div
      animate={jitter ? { y: [0, 1, 0] } : { y: 0 }}
      transition={{ duration: 0.09 }}
      className="relative w-full max-w-[560px] mx-auto -mb-6 z-10"
    >
      <motion.div
        animate={{ backgroundColor: shade.bg }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="paper-texture rounded-t-md rounded-b-sm shadow-paper px-6 md:px-9 pt-7 md:pt-9 pb-10 md:pb-12 border border-black/5"
      >
        {/* header */}
        <div className="flex items-baseline justify-between font-mono text-[11px] md:text-xs tracking-wide text-paper-ink/55">
          <span>omont.{stampDate().split(".")[2]}</span>
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="untitled memory"
            className="focus-ring bg-transparent border-none outline-none text-right text-paper-ink/70 placeholder:text-paper-ink/35 max-w-[55%]"
          />
        </div>
        <div className="mt-2 mb-6 border-t border-dashed border-paper-ink/20" />

        <WritingArea value={content} onChange={onContentChange} onType={onType} />

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-paper-ink/40 shrink-0">
            {stampDate()}
          </span>
          {typeof maxWords === "number" && (
            <span
              className={`font-mono text-[11px] shrink-0 ${
                pageFull ? "text-[#8a5a42]" : "text-paper-ink/35"
              }`}
            >
              {wordCount}/{maxWords} words
              {pageFull ? " · new page to keep going" : ""}
            </span>
          )}
          <SaveStatus status={saveStatus} />
        </div>
      </motion.div>
    </motion.div>
  );
}
