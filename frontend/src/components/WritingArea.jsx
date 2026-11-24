import { useRef, useEffect } from "react";

export default function WritingArea({ value, onChange, onType, placeholder }) {
  const ref = useRef(null);

  // auto-grow so the paper feels like it's genuinely being filled,
  // not scrolling inside a boxed textarea
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
          onType?.(e.key);
        }
      }}
      placeholder={placeholder || "write whatever is on your mind..."}
      spellCheck={false}
      className="writing-area w-full resize-none bg-transparent border-none outline-none
        font-type text-[15px] md:text-[16px] leading-[1.7] tracking-[0.015em]
        text-paper-ink placeholder:text-paper-ink/35 min-h-[220px] md:min-h-[320px]"
      rows={1}
    />
  );
}
