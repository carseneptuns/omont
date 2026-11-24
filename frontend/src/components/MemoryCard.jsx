import { Link } from "react-router-dom";
import { getColor } from "../utils/colors.js";
import { getPaperColor } from "../utils/paperColors.js";
import { shortDate } from "../utils/dateUtils.js";

export default function MemoryCard({ memory }) {
  const shade = getColor(memory.typewriter_color);
  const paperShade = getPaperColor(memory.paper_color);
  const preview = (memory.content || "").trim().slice(0, 110);

  return (
    <Link
      to={`/?memory=${memory.id}`}
      className="focus-ring group block py-6 border-b border-paper-ink/10 last:border-none"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-type text-base text-paper-ink group-hover:translate-x-0.5 transition-transform">
            {memory.title || "untitled memory"}
          </h3>
          <p className="mt-2 font-mono text-sm text-paper-ink/60 leading-relaxed line-clamp-2">
            {preview || "..."}
          </p>
        </div>
        <span className="flex items-center gap-1 shrink-0 mt-1.5">
          <span
            title="paper color"
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ background: paperShade.bg }}
          />
          <span
            title="typewriter color"
            className="w-2.5 h-2.5 rounded-full border border-black/10"
            style={{ background: shade.body }}
          />
        </span>
      </div>
      <span className="mt-3 block font-mono text-xs text-paper-ink/40">
        {shortDate(memory.updated_at || memory.created_at)}
      </span>
    </Link>
  );
}
