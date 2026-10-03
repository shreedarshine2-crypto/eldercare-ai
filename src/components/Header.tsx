import React, { useState } from 'react';
import { WardProfile } from '../types';
import { CURRENT_CAREGIVER } from '../data/mockData';

interface HeaderProps {
  ward: WardProfile;
  onOpenEmergency: () => void;
  unreadCount: number;
  onToggleNotifications: () => void;
  onNavigateToProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  ward,
  onOpenEmergency,
  unreadCount,
  onToggleNotifications,
  onNavigateToProfile
}) => {
  const [wardDropdownOpen, setWardDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter select-none border-b border-surface-container-high/60">
      {/* Left: Active Ward & Live Armed Indicator */}
      <div className="flex items-center gap-space-lg">
        {/* Active Ward Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setWardDropdownOpen(!wardDropdownOpen)}
            className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-outline-variant/30 hover:border-primary/40 transition-all text-left"
          >
            <span className="material-symbols-outlined text-secondary text-[20px]">person_pin</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Active Ward</span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                {ward.name}, Age {ward.age} • {ward.location}
              </span>
            </div>
            <span className={`material-symbols-outlined text-on-surface-variant text-[18px] ml-space-xs transition-transform duration-200 ${
              wardDropdownOpen ? 'rotate-180 text-primary' : ''
            }`}>
              expand_more
            </span>
          </button>

          {/* Dropdown Menu */}
          {wardDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 text-xs font-semibold uppercase text-on-surface-variant tracking-wider">
                Assigned Wards
              </div>
              <div 
                onClick={() => {
                  setWardDropdownOpen(false);
                  onNavigateToProfile();
                }}
                className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <img src={ward.image} alt={ward.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="font-label-md font-semibold text-on-surface">{ward.name} (78)</span>
                    <span className="font-body-sm text-xs text-on-surface-variant">{ward.unit} • {ward.residence}</span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              </div>

              <div className="mt-1 pt-1 border-t border-surface-container-high/60">
                <button
                  type="button"
                  onClick={() => {
                    setWardDropdownOpen(false);
                    onNavigateToProfile();
                  }}
                  className="w-full text-center py-2 font-label-sm text-primary hover:underline"
                >
                  View Complete Ward Health Chart →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* System Armed & Active Pill */}
        <div className="hidden xl:flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-outline-variant/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            System Armed & Active • HD Camera Online
          </span>
        </div>
      </div>

      {/* Right Controls: Emergency Dial, Alerts Bell, Caregiver Identity */}
      <div className="flex items-center gap-space-md">
        {/* Emergency Dial Red Button */}
        <button
          type="button"
          onClick={onOpenEmergency}
          className="flex items-center gap-space-xs bg-error text-on-error px-space-md py-space-sm rounded-xl font-label-lg text-label-lg shadow-[0_2px_8px_rgba(186,26,26,0.25)] hover:bg-error/90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
          <span>Emergency Dial</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={onToggleNotifications}
          className="relative p-space-sm text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container-high transition-colors"
          title="Incident Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-error ring-2 ring-surface animate-pulse" />
          )}
        </button>

        {/* Caregiver Mini Avatar */}
        <div 
          onClick={onNavigateToProfile}
          className="flex items-center gap-space-sm pl-space-xs cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img
            alt={CURRENT_CAREGIVER.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container/30 shadow-sm"
            src={CURRENT_CAREGIVER.avatar}
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="font-label-md text-label-md text-on-surface font-semibold">S. Jenkins</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Caregiver</span>
          </div>
        </div>
      </div>
    </header>
  );
};
