import React from 'react';
import { NavPage } from '../types';
import { ASSETS, CURRENT_CAREGIVER } from '../data/mockData';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  hasActiveAlert: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  hasActiveAlert
}) => {
  const navItems: Array<{ id: NavPage; label: string; icon: string; badge?: boolean }> = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'live-monitoring', label: 'Live Monitoring', icon: 'videocam' },
    { id: 'abnormal-alerts', label: 'Abnormal Alerts', icon: 'notification_important', badge: hasActiveAlert },
    { id: 'alert-history', label: 'Alert History', icon: 'history' },
    { id: 'elderly-profile', label: 'Elderly Profile', icon: 'elderly' },
    { id: 'settings', label: 'Settings', icon: 'tune' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="h-20 px-gutter flex items-center gap-space-md cursor-pointer group"
        >
          <img 
            alt="ElderCare AI Logo" 
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            src={ASSETS.logo}
            onError={(e) => {
              // Fallback icon if network image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
              ElderCare AI
            </span>
            <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase font-semibold">
              Safety Intelligence
            </span>
          </div>
        </div>

        {/* Caregiver Identity Card */}
        <div className="px-gutter mb-space-lg">
          <div 
            onClick={() => onNavigate('elderly-profile')}
            className="flex items-center gap-space-md p-space-sm bg-surface-container-lowest rounded-xl shadow-[0_1px_4px_rgba(15,23,42,0.04)] cursor-pointer hover:bg-surface-container-highest/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">medical_services</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface truncate">
                {CURRENT_CAREGIVER.name}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {CURRENT_CAREGIVER.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-space-xs px-gutter">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
                className={`flex items-center justify-between px-space-md py-space-sm rounded-xl transition-all text-left ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold shadow-[0_2px_8px_rgba(0,104,95,0.18)]'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-md">
                  <span 
                    className={`material-symbols-outlined text-[20px] ${
                      item.id === 'abnormal-alerts' && hasActiveAlert && !isActive ? 'text-error animate-pulse' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${
                    isActive ? 'bg-error text-on-error animate-pulse' : 'bg-error-container text-on-error-container animate-bounce'
                  }`}>
                    ALERT
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* HIPAA & Privacy Safe Card */}
      <div className="p-gutter">
        <div className="p-space-md rounded-xl bg-surface-container-high/60 flex flex-col gap-space-xs border border-outline-variant/30">
          <div className="flex items-center gap-space-xs text-primary">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-sm text-label-sm font-semibold">HIPAA & Privacy Safe</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
            On-device edge AI synthesis enabled for video stream privacy.
          </span>
        </div>
      </div>
    </aside>
  );
};
