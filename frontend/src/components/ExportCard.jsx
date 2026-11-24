import { forwardRef } from "react";
import { stampDate } from "../utils/dateUtils.js";
import { getPaperColor, hexToRgba } from "../utils/paperColors.js";

/**
 * A plain, non-interactive rendition of the paper — used only as the
 * source node for html2canvas when the user saves their memory as an
 * image. No textarea, no cursor, no focus states: just the finished
 * page, so the exported PNG looks like something that came out of a
 * typewriter rather than a screenshot of a web app.
 */
const ExportCard = forwardRef(function ExportCard(
  { title, content, paperColor = "beige" },
  ref
) {
  const shade = getPaperColor(paperColor);

  return (
    <div
      ref={ref}
      style={{
        width: 560,
        background: shade.bg,
        color: shade.ink,
        padding: "44px 46px 52px",
        fontFamily: '"Special Elite", monospace',
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          fontFamily: '"Courier Prime", monospace',
          fontSize: 12,
          letterSpacing: "0.02em",
          opacity: 0.6,
        }}
      >
        <span>omont.{stampDate().split(".")[2]}</span>
        <span style={{ opacity: 0.85 }}>
          {title?.trim() || "untitled memory"}
        </span>
      </div>

      <div
        style={{
          margin: "10px 0 26px",
          borderTop: `1px dashed ${hexToRgba(shade.ink, 0.25)}`,
        }}
      />

      <div
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontSize: 16,
          lineHeight: 1.75,
          letterSpacing: "0.015em",
          minHeight: 160,
        }}
      >
        {content?.trim() ? content : " "}
      </div>

      <div
        style={{
          marginTop: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: '"Courier Prime", monospace',
          fontSize: 11,
          opacity: 0.45,
        }}
      >
        <span>{stampDate()}</span>
        <span style={{ letterSpacing: "0.15em" }}>omont.</span>
      </div>
    </div>
  );
});

export default ExportCard;
