import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Tasdiqlash',
  cancelLabel = 'Bekor qilish',
  variant = 'danger'
}: ConfirmModalProps) {
  const colors = {
    danger: 'bg-red-600 hover:bg-red-700 shadow-red-600/20 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 text-white'
  };

  const iconColors = {
    danger: 'text-red-600 bg-red-50',
    warning: 'text-amber-600 bg-amber-50',
    info: 'text-blue-600 bg-blue-50'
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-slate-100"
        >
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconColors[variant]}`}>
              <AlertTriangle size={28} />
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2">
              <X size={24} />
            </button>
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-3">{title}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{message}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-6 py-4 rounded-2xl font-bold shadow-lg transition-all ${colors[variant]}`}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
