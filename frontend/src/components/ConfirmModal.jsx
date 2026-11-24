import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#211f1c]/40 backdrop-blur-[2px] px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-sm bg-paper paper-texture rounded-sm shadow-paper px-7 py-6 font-mono text-paper-ink"
          >
            <h2 className="font-type text-lg mb-2">{title}</h2>
            <p className="text-sm leading-relaxed text-paper-ink/80 mb-6">
              {message}
            </p>
            <div className="flex justify-end gap-3 text-sm">
              <button
                onClick={onCancel}
                className="focus-ring px-4 py-1.5 rounded-full border border-paper-ink/20 hover:bg-paper-ink/5 transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`focus-ring px-4 py-1.5 rounded-full text-paper transition-colors
                  ${danger ? "bg-[#7a4038] hover:bg-[#6b332c]" : "bg-paper-ink hover:bg-[#252420]"}`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
