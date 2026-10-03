import React, { useState } from 'react';
import { NavPage } from '../types';

interface SettingsViewProps {
  onNavigate: (page: NavPage) => void;
  onAddToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onNavigate,
  onAddToast
}) => {
  const [sensitivity, setSensitivity] = useState<'conservative' | 'balanced' | 'sensitive'>('balanced');
  const [inactivityThreshold, setInactivityThreshold] = useState('45');
  const [faceBlur, setFaceBlur] = useState(true);
  const [edgeOnly, setEdgeOnly] = useState(true);
  const [autoEmsRelay, setAutoEmsRelay] = useState(false);
  const [sirenVolume, setSirenVolume] = useState(85);

  const handleSaveSettings = () => {
    onAddToast('Settings Saved', 'Telemetry thresholds and privacy configs updated.', 'success');
  };

  const handleTestSiren = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.25);
      osc.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext fallback
    }
    onAddToast('Siren Chime Tested', 'Testing 0.5s audio chirp.', 'info');
  };

  return (
    <div className="flex flex-col w-full pb-space-xl select-none max-w-4xl">
      <div className="flex flex-col gap-1 mb-space-lg">
        <h1 className="font-headline-xl text-on-surface">System Configuration & Privacy</h1>
        <p className="font-body-md text-on-surface-variant">
          Adjust FallNet optical neural model thresholds, HIPAA edge obfuscation, and rapid escalation rules.
        </p>
      </div>

      <div className="flex flex-col gap-space-md">
        
        {/* 1. AI Vision Fall Detection Model */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            <span className="font-headline-sm text-on-surface">FallNet Optical Inference Engine</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Tunes vertical descent acceleration vectors and floor-level immobility filters before triggering a Priority 1 emergency siren.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            <button
              type="button"
              onClick={() => setSensitivity('conservative')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                sensitivity === 'conservative'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <span className="font-label-md font-bold text-on-surface">Conservative</span>
              <span className="text-xs text-on-surface-variant">Minimizes false alarms; triggers only on heavy floor impact &gt; 1.8G.</span>
            </button>

            <button
              type="button"
              onClick={() => setSensitivity('balanced')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                sensitivity === 'balanced'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-label-md font-bold text-on-surface">Balanced (Recommended)</span>
                <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.2 rounded">Default</span>
              </div>
              <span className="text-xs text-on-surface-variant">Optimal for senior independent living. Sensitivity 94.2%.</span>
            </button>

            <button
              type="button"
              onClick={() => setSensitivity('sensitive')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                sensitivity === 'sensitive'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <span className="font-label-md font-bold text-on-surface">Ultra-Sensitive</span>
              <span className="text-xs text-on-surface-variant">For high-fall-risk wards. Triggers on slumps and slow slips.</span>
            </button>
          </div>
        </div>

        {/* 2. Inactivity Triggers */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-secondary font-bold">
            <span className="material-symbols-outlined text-[22px]">timer</span>
            <span className="font-headline-sm text-on-surface">Static Inactivity Threshold</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-on-surface-variant max-w-md">
              Sounds gentle voice inquiry or ping to caregiver smartphone when no micro-movements are detected in armchair/bed.
            </span>
            <select
              value={inactivityThreshold}
              onChange={(e) => setInactivityThreshold(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2 font-body-sm text-on-surface outline-none focus:border-primary"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes (Active Default)</option>
              <option value="60">60 Minutes</option>
              <option value="90">90 Minutes</option>
            </select>
          </div>
        </div>

        {/* 3. Privacy & HIPAA Compliance Controls */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-tertiary font-bold">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
            <span className="font-headline-sm text-on-surface">Privacy & HIPAA Masking</span>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cursor-pointer">
            <div className="flex flex-col">
              <span className="font-label-md font-semibold text-on-surface">Dynamic Edge Face Blur Shield</span>
              <span className="text-xs text-on-surface-variant">
                Synthesizes human keypoints locally while pixelating facial features to preserve senior dignity.
              </span>
            </div>
            <input
              type="checkbox"
              checked={faceBlur}
              onChange={(e) => setFaceBlur(e.target.checked)}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cursor-pointer">
            <div className="flex flex-col">
              <span className="font-label-md font-semibold text-on-surface">Zero-Cloud Raw Video Processing</span>
              <span className="text-xs text-on-surface-variant">
                Only motion vectors and event alert freeze frames leave the on-premises SafeVision hardware.
              </span>
            </div>
            <input
              type="checkbox"
              checked={edgeOnly}
              onChange={(e) => setEdgeOnly(e.target.checked)}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
          </label>
        </div>

        {/* 4. Siren & Audio Escalation */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-error font-bold">
            <span className="material-symbols-outlined text-[22px]">volume_up</span>
            <span className="font-headline-sm text-on-surface">Emergency Audio & Auto-Relay</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div className="flex flex-col">
              <span className="font-label-md font-semibold text-on-surface">Audible Unit Siren Volume</span>
              <span className="text-xs text-on-surface-variant">Broadcasted from camera speaker in Living Room</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="20"
                max="100"
                value={sirenVolume}
                onChange={(e) => setSirenVolume(Number(e.target.value))}
                className="w-28 accent-primary h-1 bg-surface-variant/40 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={handleTestSiren}
                className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container-highest text-xs font-semibold rounded-lg text-on-surface"
              >
                Test Chime
              </button>
            </div>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cursor-pointer">
            <div className="flex flex-col">
              <span className="font-label-md font-semibold text-on-surface">Automated 911 EMS Relay</span>
              <span className="text-xs text-on-surface-variant">
                If caregiver does not acknowledge fall alert within 60 seconds, transmit GPS and telemetry to Metro EMS.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoEmsRelay}
              onChange={(e) => setAutoEmsRelay(e.target.checked)}
              className="w-5 h-5 accent-error cursor-pointer"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 rounded-xl font-label-md text-on-surface-variant hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            className="px-6 py-2.5 rounded-xl font-label-md font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm"
          >
            Save Configuration Changes
          </button>
        </div>
      </div>
    </div>
  );
};
