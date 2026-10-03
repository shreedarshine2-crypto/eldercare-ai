import React from 'react';
import { NavPage, NotificationItem } from '../types';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (item: NotificationItem) => void;
  onClearAll: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-6 w-96 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-space-md z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-sm font-bold text-on-surface">System Notifications</span>
          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[10px]">
            {notifications.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-primary hover:underline font-medium"
          >
            Mark all read
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-on-surface-variant text-sm">
            No unread notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                item.read 
                  ? 'bg-surface-container-low/50 border-transparent hover:bg-surface-container' 
                  : 'bg-surface-container-lowest border-primary/20 shadow-sm hover:border-primary/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    item.type === 'critical' ? 'bg-error animate-ping' :
                    item.type === 'warning' ? 'bg-secondary' :
                    item.type === 'success' ? 'bg-tertiary' : 'bg-primary'
                  }`} />
                  <span className="font-label-md text-xs font-semibold text-on-surface">{item.title}</span>
                </div>
                <span className="font-label-sm text-[10px] text-on-surface-variant font-mono">{item.timestamp}</span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
