import { motion } from "framer-motion";
import Paper from "./Paper.jsx";
import TypewriterKeys from "./TypewriterKeys.jsx";
import { getColor } from "../utils/colors.js";

export default function Typewriter({
  color,
  title,
  onTitleChange,
  content,
  onContentChange,
  onType,
  saveStatus,
  jitter,
  activeKey,
  wordCount,
  maxWords,
  pageFull,
  paperColor,
}) {
  const shade = getColor(color);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <Paper
        title={title}
        onTitleChange={onTitleChange}
        content={content}
        onContentChange={onContentChange}
        onType={onType}
        saveStatus={saveStatus}
        jitter={jitter}
        wordCount={wordCount}
        maxWords={maxWords}
        pageFull={pageFull}
        paperColor={paperColor}
      />

      {/* roller */}
      <motion.div
        animate={{ backgroundColor: shade.shade }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-full max-w-[640px] h-8 md:h-10 rounded-t-sm z-20 flex items-center justify-between px-1"
      >
        <span
          className="w-9 h-9 md:w-11 md:h-11 rounded-full -ml-1 -mt-1 shadow-machine border-2"
          style={{ background: shade.highlight, borderColor: shade.shade }}
        />
        <span className="flex-1 h-2 md:h-2.5 mx-3 rounded-full bg-black/30" />
        <span
          className="w-9 h-9 md:w-11 md:h-11 rounded-full -mr-1 -mt-1 shadow-machine border-2"
          style={{ background: shade.highlight, borderColor: shade.shade }}
        />
      </motion.div>

      {/* body */}
      <motion.div
        animate={{ backgroundColor: shade.body }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-full max-w-[700px] rounded-[28px] md:rounded-[36px] shadow-machine
          pt-6 md:pt-8 pb-7 md:pb-9 px-5 md:px-10 z-10"
      >
        {/* subtle top highlight for depth */}
        <div
          className="absolute inset-x-6 top-2 h-2 rounded-full opacity-40"
          style={{ background: shade.highlight }}
        />

        <div className="flex items-center justify-center mb-6 md:mb-8">
          <span
            className="font-type text-xs md:text-sm tracking-[0.3em] text-paper/85 px-4 py-1 rounded-full"
            style={{ background: shade.shade }}
          >
            OMONT
          </span>
        </div>

        <div className="flex justify-center">
          <TypewriterKeys colorShade={shade} activeKey={activeKey} />
        </div>

        {/* decorative side knobs */}
        <span
          className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-16 rounded-full shadow-machine"
          style={{ background: shade.shade }}
        />
        <span
          className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-16 rounded-full shadow-machine"
          style={{ background: shade.shade }}
        />
      </motion.div>
    </div>
  );
}
