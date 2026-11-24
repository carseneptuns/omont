const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];

export default function TypewriterKeys({ colorShade, activeKey }) {
  return (
    <div className="flex flex-col items-center gap-[7px] md:gap-2 select-none">
      {ROWS.map((row, i) => (
        <div
          key={i}
          className="flex gap-[6px] md:gap-2"
          style={{ marginLeft: i * 8 }}
        >
          {row.map((letter) => {
            const active = activeKey === letter;
            return (
              <div
                key={letter}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center
                  font-mono text-[9px] md:text-[11px] text-paper/90 shadow-key
                  transition-transform duration-[80ms] ${active ? "scale-95" : ""}`}
                style={{
                  background: active ? colorShade.highlight : colorShade.shade,
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
