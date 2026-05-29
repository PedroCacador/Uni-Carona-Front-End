import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === 'success';

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 px-4 w-full max-w-[440px]"
      role={isSuccess ? 'status' : 'alert'}
      aria-live={isSuccess ? 'polite' : 'assertive'}
    >
      <div className={`flex items-center gap-3 bg-white rounded-2xl pl-4 pr-2.5 py-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] border ${isSuccess ? 'border-green-200' : 'border-red-200'}`}>
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isSuccess ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
        </span>
        <span className="text-[14px] font-semibold text-slate-700 flex-1 leading-snug">{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar notificação"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 flex-shrink-0"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
