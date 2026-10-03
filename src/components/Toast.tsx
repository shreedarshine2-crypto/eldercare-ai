import React from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-inverse-surface/95 text-inverse-on-surface backdrop-blur-xl rounded-2xl shadow-2xl border border-outline-variant/20 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className={`material-symbols-outlined text-[22px] shrink-0 ${
            toast.type === 'error' ? 'text-error' :
            toast.type === 'info' ? 'text-secondary-fixed' : 'text-tertiary-fixed'
          }`}>
            {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
          </span>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-label-md font-semibold text-sm">{toast.title}</span>
            {toast.message && (
              <span className="font-body-sm text-xs text-inverse-on-surface/80 mt-0.5 leading-relaxed">
                {toast.message}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-lg text-inverse-on-surface/60 hover:text-inverse-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
