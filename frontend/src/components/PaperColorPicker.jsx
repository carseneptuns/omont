import { useState, useRef, useEffect } from "react";
import { PAPER_COLOR_ORDER, PAPER_COLORS } from "../utils/paperColors.js";

export default function PaperColorPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex items-center gap-2 text-xs font-mono tracking-wide text-paper-ink/70 hover:text-paper-ink transition-colors"
        aria-label="Change paper color"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/10 transition-colors duration-250"
          style={{ background: PAPER_COLORS[value]?.bg }}
        />
        Paper
      </button>

      {open && (
        <div className="absolute right-0 mt-3 py-3 px-3.5 bg-paper paper-texture rounded-sm shadow-paper z-40 animate-fade-up">
          <p className="text-[10px] font-mono tracking-wider text-paper-ink/50 mb-2 whitespace-nowrap">
            paper color
          </p>
          <div className="grid grid-cols-4 gap-2.5">
            {PAPER_COLOR_ORDER.map((name) => (
              <button
                key={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                title={PAPER_COLORS[name].label}
                className={`focus-ring w-6 h-6 rounded-full border transition-transform duration-250 hover:scale-110 ${
                  value === name
                    ? "border-paper-ink/60 ring-2 ring-offset-2 ring-offset-paper ring-paper-ink/30"
                    : "border-black/10"
                }`}
                style={{ background: PAPER_COLORS[name].bg }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
