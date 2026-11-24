import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import MemoryCard from "../components/MemoryCard.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Toast from "../components/Toast.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { memoriesApi } from "../services/api.js";

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [toast, setToast] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  const showToast = (message, tone = "success") =>
    setToast({ id: Date.now(), message, tone });

  const load = async (search) => {
    setStatus("loading");
    try {
      const data = await memoriesApi.getAll(search);
      setMemories(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    load(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleDelete = async () => {
    try {
      await memoriesApi.remove(pendingDelete.id);
      setMemories((prev) => prev.filter((m) => m.id !== pendingDelete.id));
      showToast("Memory deleted.");
    } catch {
      showToast("Couldn't delete that memory.", "error");
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 pb-24">
      <h1 className="font-type text-2xl text-paper-ink/90 mt-2 mb-8">
        your memories
      </h1>

      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-paper-ink/15">
        <PiMagnifyingGlassLight className="text-paper-ink/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your memories..."
          className="focus-ring w-full bg-transparent border-none outline-none font-mono text-sm text-paper-ink placeholder:text-paper-ink/35"
        />
      </div>

      {status === "loading" && (
        <p className="font-mono text-sm text-paper-ink/50 mt-10 text-center">
          Opening the archive...
        </p>
      )}

      {status === "error" && (
        <p className="font-mono text-sm text-paper-ink/50 mt-10 text-center">
          Couldn't load your memories. Please try again.
        </p>
      )}

      {status === "ready" && memories.length === 0 && (
        <div className="text-center mt-16">
          <p className="font-type text-lg text-paper-ink/70 mb-1">
            No memories yet.
          </p>
          <p className="font-mono text-sm text-paper-ink/45 mb-6">
            Start typing something worth remembering.
          </p>
          <Link
            to="/"
            className="focus-ring inline-block text-xs font-mono tracking-wide px-5 py-2 rounded-full bg-paper-ink text-paper hover:bg-[#252420] transition-colors"
          >
            Start Writing
          </Link>
        </div>
      )}

      {status === "ready" && memories.length > 0 && (
        <div>
          {memories.map((memory) => (
            <div key={memory.id} className="relative group">
              <MemoryCard memory={memory} />
              <button
                onClick={() => setPendingDelete(memory)}
                className="focus-ring absolute right-0 bottom-6 text-[11px] font-mono text-paper-ink/30 opacity-0 group-hover:opacity-100 hover:text-[#8a4a42] transition-opacity"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete this memory?"
        message="This can't be undone."
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
