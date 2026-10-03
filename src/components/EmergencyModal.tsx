import React, { useState } from 'react';
import { WardProfile } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  ward: WardProfile;
  onDispatchInitiated: (service: string) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  ward,
  onDispatchInitiated
}) => {
  const [includeTelemetry, setIncludeTelemetry] = useState(true);
  const [isCalling, setIsCalling] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCall = (targetName: string, number: string) => {
    setIsCalling(targetName);
    setTimeout(() => {
      setIsCalling(null);
      onDispatchInitiated(`${targetName} (${number})`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-md p-space-md select-none animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-xl shadow-2xl flex flex-col gap-space-md border border-outline-variant/30">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-12 h-12 rounded-2xl bg-error text-on-error flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[28px] animate-pulse">crisis_alert</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-error font-bold uppercase tracking-wider">
                Emergency Response Console
              </span>
              <h2 className="font-headline-md text-on-surface">Emergency Escalation</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Location & Access Card */}
        <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-on-surface-variant font-semibold uppercase">
              Target Ward & Location
            </span>
            <span className="px-2 py-0.5 rounded-full font-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant font-semibold">
              GPS Ground Verified
            </span>
          </div>
          <div className="font-headline-sm text-on-surface">
            {ward.name} • {ward.unit}
          </div>
          <div className="font-body-sm text-on-surface-variant">
            {ward.residence}
          </div>
          <div className="mt-1 pt-1.5 border-t border-outline-variant/20 flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface font-mono">
            <span>Gate Code: <strong>#1209</strong></span>
            <span>Keybox / Door Code: <strong>#8842</strong></span>
            <span>Elevator Key: <strong>Sec-4</strong></span>
          </div>
        </div>

        {/* Telemetry Switch */}
        <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/40 cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">encrypted</span>
            <span className="font-label-md text-on-surface">Transfer Real-Time Optical Fall Telemetry to Paramedics</span>
          </div>
          <input
            type="checkbox"
            checked={includeTelemetry}
            onChange={(e) => setIncludeTelemetry(e.target.checked)}
            className="w-5 h-5 accent-primary rounded cursor-pointer"
          />
        </label>

        {/* Rapid Contacts List */}
        <div className="flex flex-col gap-2">
          <span className="font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
            Direct Dial Lines
          </span>

          {/* 1. EMS 911 Direct Priority */}
          <button
            type="button"
            disabled={isCalling !== null}
            onClick={() => handleCall('Metro EMS Dispatch 911', '911')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-error text-on-error hover:bg-error/90 transition-all shadow-md group disabled:opacity-50 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">e911_emergency</span>
              <div className="flex flex-col">
                <span className="font-label-lg font-bold">Dispatch Metro EMS (911)</span>
                <span className="text-xs text-on-error/80">Priority Line for Pinecrest District 4</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-surface/20 text-xs font-semibold uppercase">
              {isCalling === 'Metro EMS Dispatch 911' ? 'Connecting...' : 'Connect Now'}
            </span>
          </button>

          {/* 2. Attending Physician */}
          <button
            type="button"
            disabled={isCalling !== null}
            onClick={() => handleCall('Dr. Robert Vance (Attending MD)', '(555) 0144')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all border border-outline-variant/30 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center font-bold text-xs">
                MD
              </div>
              <div className="flex flex-col">
                <span className="font-label-md font-semibold">Dr. Robert Vance</span>
                <span className="text-xs text-on-surface-variant">Attending Geriatric Physician • (555) 0144</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]">call</span>
          </button>

          {/* 3. Primary Caregiver / Family */}
          <button
            type="button"
            disabled={isCalling !== null}
            onClick={() => handleCall('Sarah Jenkins (Daughter/RN)', '(555) 0192')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all border border-outline-variant/30 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container/30 text-primary flex items-center justify-center font-bold text-xs">
                RN
              </div>
              <div className="flex flex-col">
                <span className="font-label-md font-semibold">Sarah Jenkins</span>
                <span className="text-xs text-on-surface-variant">Daughter & Primary Caregiver • (555) 0192</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">call</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
          <span>All emergency dispatches are recorded for HIPAA compliance.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg hover:bg-surface-container text-on-surface font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
