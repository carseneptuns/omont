import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * toast: { id, message, tone } | null
 * tone: "success" | "error"
 */
export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => onDismiss(), 2600);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className={`px-5 py-2.5 rounded-full shadow-machine font-mono text-sm tracking-wide
              ${toast?.tone === "error"
                ? "bg-[#4a2f2c] text-[#f2dcd8]"
                : "bg-[#2c2a26] text-[#f2ede2]"}`}
          >
            {toast?.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
