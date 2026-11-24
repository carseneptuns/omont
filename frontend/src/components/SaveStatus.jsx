/**
 * status: "idle" | "saving" | "saved" | "error"
 */
export default function SaveStatus({ status }) {
  const copy = {
    idle: null,
    saving: "Saving...",
    saved: "Saved.",
    error: "Couldn't save.",
  }[status];

  if (!copy) return <div className="h-4" />;

  const dotColor =
    status === "error"
      ? "bg-[#8a4a42]"
      : status === "saving"
      ? "bg-paper-ink/40"
      : "bg-[#5f7a5a]";

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-paper-ink/50 h-4">
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} ${
          status === "saving" ? "animate-pulse" : ""
        }`}
      />
      <span>{copy}</span>
    </div>
  );
}
