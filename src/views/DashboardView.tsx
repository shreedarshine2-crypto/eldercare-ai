import React, { useState } from 'react';
import { WardProfile, NavPage } from '../types';
import { ASSETS } from '../data/mockData';

interface DashboardViewProps {
  ward: WardProfile;
  onNavigate: (page: NavPage) => void;
  onOpenEmergency: () => void;
  onTriggerIntercom: () => void;
  isIntercomLive: boolean;
  onAddToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  ward,
  onNavigate,
  onOpenEmergency,
  onTriggerIntercom,
  isIntercomLive,
  onAddToast
}) => {
  const [quickMode, setQuickMode] = useState<'evening' | 'bedtime'>('evening');
  const [isNightVision, setIsNightVision] = useState(false);
  const [hoveredHour, setHoveredHour] = useState<string | null>(null);

  const hourlyData = [
    { hour: '7A', height: '45%', percent: '65%', type: 'rest', label: 'Morning Awaken' },
    { hour: '8A', height: '60%', percent: '80%', type: 'meal', label: 'Breakfast Routine' },
    { hour: '9A', height: '35%', percent: '50%', type: 'rest', label: 'Reading News' },
    { hour: '10A', height: '92%', percent: '94%', type: 'active', highlight: 'Peak Walk', label: 'Hallway Stroll (450m)' },
    { hour: '11A', height: '55%', percent: '70%', type: 'active', label: 'Garden Patio Seated' },
    { hour: '12P', height: '50%', percent: '60%', type: 'meal', label: 'Lunch Adherence' },
    { hour: '1P', height: '22%', percent: '20%', type: 'rest', label: 'Living Room Rest' },
    { hour: '2P', height: '18%', percent: '15%', type: 'check', highlight: 'Voice Check', label: 'Inactivity Handled' },
    { hour: '3P', height: '52%', percent: '68%', type: 'active', label: 'Physical Therapy Exercises' },
    { hour: '4P', height: '64%', percent: '74%', type: 'active', label: 'Telephone Call with Family' },
    { hour: '5P', height: '38%', percent: 'Live', type: 'live', highlight: 'Live', label: 'Armchair Reading Currently' }
  ];

  const handleSnapshot = () => {
    onAddToast('Snapshot Captured', 'Encrypted frame saved to Arthur Jenkins compliance record.', 'success');
  };

  const handleTriggerChime = () => {
    // Play subtle friendly chime frequency using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext fallback
    }
    onAddToast('Gentle Chime Broadcasted', 'Soft chime sounded in Living Room (Cam 01 speaker).', 'info');
  };

  return (
    <div className="flex flex-col w-full pb-space-xl select-none">
      
      {/* Top Greeting & Contextual Reassurance Banner */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30 mb-space-lg">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-space-md z-10">
          <div className="flex items-start gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_with_heart
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-tertiary tracking-wider uppercase font-semibold">
                  Live System Status: Secured
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  Last packet received 2s ago
                </span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface mt-0.5">
                Good evening, Sarah. Arthur is currently resting safely in the Living Room.
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                No anomalous motion patterns or fall vectors registered in the last 6 hours. Routine adherence is at {ward.routineAdherencePercent}% today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant hidden lg:inline font-medium">
              Quick Mode:
            </span>
            <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/20">
              <button
                type="button"
                onClick={() => {
                  setQuickMode('evening');
                  onAddToast('Evening Watch Mode Active', 'High sensitivity optical gait tracking engaged.', 'info');
                }}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1 ${
                  quickMode === 'evening'
                    ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span> Evening Watch
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuickMode('bedtime');
                  onAddToast('Bedtime Protocol Engaged', 'Bed pressure grid + floor nightlight pathing prioritized.', 'info');
                }}
                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1 ${
                  quickMode === 'bedtime'
                    ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">bedtime</span> Bedtime Protocol
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Metric Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">
        {/* 1. Elderly Status */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Subject Posture
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
              </span>
              Normal Activity
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-headline-sm text-headline-sm text-on-surface flex items-baseline gap-space-xs">
              <span>Seated in Armchair</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">directions_walk</span>
              <span>Last active motion 4 mins ago</span>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Skeletal Pose</span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Stable Equilibrium (98.4%)</span>
          </div>
        </div>

        {/* 2. Camera Telemetry */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Sensory Feed
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              1080p • 30 FPS
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-headline-sm text-headline-sm text-on-surface flex items-baseline gap-space-xs">
              <span>HD Cam #1 Online</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">wifi</span>
              <span className="font-mono text-xs">Latency 140ms • 99.8% Uptime</span>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Stream Location</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">Living Room South Angle</span>
          </div>
        </div>

        {/* 3. AI Detection Engine */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Edge Inference
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
              Optical Flow V4
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-headline-sm text-headline-sm text-on-surface flex items-baseline gap-space-xs">
              <span>Safety AI Active</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
              <span>Privacy Synthesis Enabled</span>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Pose Keypoints</span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">33 Tracking Vectors</span>
          </div>
        </div>

        {/* 4. Today's Alerts */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Alerts Today
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
              0 Critical
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-headline-sm text-headline-sm text-on-surface flex items-baseline gap-space-xs">
              <span>1 Alert Resolved</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span>Inactivity check at 2:15 PM</span>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Resolution Time</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold font-mono">
              48 sec (Voice check)
            </span>
          </div>
        </div>
      </section>

      {/* Main Bento Grid: 8 cols (Left) vs 4 cols (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
          
          {/* Live Video Glance Card */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high/60">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">videocam</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Living Room Stream Glance</h2>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span> REC
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => setIsNightVision(!isNightVision)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isNightVision 
                      ? 'bg-secondary text-on-secondary' 
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Night Vision Mode"
                >
                  <span className="material-symbols-outlined text-[18px]">bedtime</span>
                </button>
                <button
                  type="button"
                  onClick={handleSnapshot}
                  className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                  title="Take Instant Snapshot"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('live-monitoring')}
                  className="flex items-center gap-1 px-space-sm py-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-label-md text-label-md transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                  <span>Full Screen</span>
                </button>
              </div>
            </div>

            {/* Video Canvas Simulator with AI Bounding Box Overlay */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-xl overflow-hidden bg-inverse-surface group shadow-inner">
              <img
                alt="Living room stream glance"
                className={`w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.01] ${
                  isNightVision ? 'grayscale brightness-125 contrast-125' : ''
                }`}
                src={ASSETS.livingRoomArmchair}
              />
              {/* Edge Privacy Filter Watermark & HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-inverse-surface/40 pointer-events-none"></div>

              {/* Top-Left Telemetry Pill */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                <div className="flex items-center gap-2 bg-inverse-surface/75 backdrop-blur-md px-3 py-1.5 rounded-lg text-inverse-on-surface font-label-sm text-label-sm shadow-md">
                  <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
                  <span>CAM 01: SOUTH-WEST ANGLE</span>
                  <span className="text-outline-variant">|</span>
                  <span className="font-mono text-tertiary-fixed">60.2 FPS</span>
                </div>
                <div className="bg-inverse-surface/60 backdrop-blur-md px-3 py-1 rounded-md text-inverse-on-surface/90 font-label-sm text-label-sm inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary-fixed-dim">verified_user</span>
                  <span>Edge AI Privacy Blur Active</span>
                </div>
              </div>

              {/* Dynamic AI Pose & Bounding Overlay around armchair */}
              <div className="absolute top-[24%] left-[28%] w-[44%] h-[58%] rounded-xl pointer-events-none transition-all duration-300">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-fixed-dim"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-fixed-dim"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-fixed-dim"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-fixed-dim"></div>
                <div className="absolute inset-0 bg-primary/5 rounded-lg"></div>

                {/* Subject Badge */}
                <div className="absolute -top-7 left-0 bg-primary/90 backdrop-blur-md text-on-primary px-2.5 py-0.5 rounded font-label-sm text-label-sm shadow flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">face</span>
                  <span className="font-semibold">{ward.name}</span>
                  <span className="text-primary-fixed text-[10px]">98.4% CONF</span>
                </div>

                {/* Skeletal Posture Vector Tag */}
                <div className="absolute -bottom-6 right-0 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface px-2.5 py-0.5 rounded font-label-sm text-label-sm shadow flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">accessibility_new</span>
                  <span>Pose: Seated Stable (V-Angle 112°)</span>
                </div>
              </div>

              {/* Bottom Floating Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-inverse-surface/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-inverse-on-surface">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">graphic_eq</span>
                  <span className="font-label-sm text-label-sm font-mono">Room Audio: Ambient Calm (38 dB)</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button
                    type="button"
                    onClick={onTriggerIntercom}
                    className={`backdrop-blur-md px-3 py-1.5 rounded-xl font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-md ${
                      isIntercomLive
                        ? 'bg-error text-on-error animate-pulse'
                        : 'bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      {isIntercomLive ? 'mic' : 'mic_none'}
                    </span>
                    <span>{isIntercomLive ? 'Broadcasting...' : 'Hold to Speak'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('live-monitoring')}
                    className="bg-primary hover:bg-primary-container text-on-primary px-3 py-1.5 rounded-xl font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Full Stream</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Behavioral Activity Timeline & Hourly Activity Breakdown */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-sm mb-space-sm">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Daily Activity & Routine Adherence</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Continuous skeletal motion quantification over the last 14 hours.
                </p>
              </div>
              <div className="flex items-center gap-space-xs text-xs">
                <span className="flex items-center gap-1 font-label-sm text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-primary"></span> Active Movement
                </span>
                <span className="flex items-center gap-1 font-label-sm text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-secondary-fixed"></span> Sedentary/Rest
                </span>
                <span className="flex items-center gap-1 font-label-sm text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-tertiary-fixed"></span> Mealtime
                </span>
              </div>
            </div>

            {/* Hourly Interactive Activity Visualization */}
            <div className="w-full bg-surface-container-low/50 p-space-md rounded-xl border border-outline-variant/20">
              <div className="h-44 w-full flex items-end gap-2 pt-4 px-2">
                {hourlyData.map((d) => (
                  <div
                    key={d.hour}
                    onMouseEnter={() => setHoveredHour(d.hour)}
                    onMouseLeave={() => setHoveredHour(null)}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                  >
                    {d.highlight && (
                      <div className={`absolute -top-2 px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-sm ${
                        d.highlight === 'Peak Walk' ? 'bg-primary text-on-primary' :
                        d.highlight === 'Voice Check' ? 'bg-error-container text-on-error-container' :
                        'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}>
                        {d.highlight}
                      </div>
                    )}
                    <span className="font-label-sm text-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {d.percent}
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all group-hover:brightness-95 ${
                        d.type === 'active' ? 'bg-primary' :
                        d.type === 'meal' ? 'bg-tertiary-fixed group-hover:bg-tertiary' :
                        d.type === 'live' ? 'bg-tertiary-fixed' :
                        d.type === 'check' ? 'bg-secondary-container' : 'bg-secondary-fixed'
                      }`}
                      style={{ height: d.height }}
                    ></div>
                    <span className={`font-label-sm text-label-sm ${d.hour === '5P' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                      {d.hour}
                    </span>

                    {/* Tooltip on Hover */}
                    {hoveredHour === d.hour && (
                      <div className="absolute bottom-16 bg-inverse-surface text-inverse-on-surface text-xs p-2 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
                        <div className="font-bold">{d.hour}:00 - {d.label}</div>
                        <div className="text-[11px] opacity-80">Mobility Intensity: {d.percent}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Biometric Telemetry Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-md">
              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">directions_walk</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Mobility Index</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">Good (88/100)</span>
                  <span className="font-label-sm text-label-sm text-tertiary font-medium">Normal gait cadence</span>
                </div>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">timer</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Continuous Rest</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">32 Minutes</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Comfort limit: 90 mins</span>
                </div>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Fall Risk Level</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">Low (2.1%)</span>
                  <span className="font-label-sm text-label-sm text-primary font-medium">No instability signals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          
          {/* Quick Ward Actions Card */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Quick Ward Actions</h2>
            <div className="flex flex-col gap-space-xs">
              
              {/* Action 1: Launch Stream */}
              <button
                type="button"
                onClick={() => onNavigate('live-monitoring')}
                className="w-full flex items-center justify-between p-space-sm rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all group shadow-[0_2px_8px_rgba(0,104,95,0.18)]"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[22px]">videocam</span>
                  <span className="font-label-lg text-label-lg font-semibold">Open 4K HD Live Stream</span>
                </div>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>

              {/* Action 2: Voice Intercom */}
              <button
                type="button"
                onClick={onTriggerIntercom}
                className={`w-full flex items-center justify-between p-space-sm rounded-xl transition-all group border border-outline-variant/20 ${
                  isIntercomLive ? 'bg-tertiary-container/30 text-tertiary ring-2 ring-tertiary' : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">speaker_phone</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-label-lg text-label-lg">Call Arthur via Intercom</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Direct speaker ping</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">call</span>
              </button>

              {/* Action 3: Trigger Chime */}
              <button
                type="button"
                onClick={handleTriggerChime}
                className="w-full flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all group border border-outline-variant/20"
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-label-lg text-label-lg">Trigger Gentle Chime</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Friendly medication reminder</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">volume_up</span>
              </button>

              {/* Action 4: Emergency Contacts Sheet */}
              <button
                type="button"
                onClick={onOpenEmergency}
                className="w-full flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all group border border-outline-variant/20"
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-error/10 text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">emergency</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-label-lg text-label-lg">Emergency Contacts</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">EMS • Dr. Vance • Dispatch</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">contacts</span>
              </button>
            </div>
          </div>

          {/* Recent Incident & Behavioral Activity Feed */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high/60">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Alert Log</h2>
              <button
                type="button"
                onClick={() => onNavigate('alert-history')}
                className="font-label-md text-label-md text-primary hover:underline font-semibold"
              >
                View History
              </button>
            </div>
            
            <div className="relative pl-6 space-y-space-md before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {/* Alert 1 */}
              <div className="relative group">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></span>
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">
                      Prolonged Inactivity
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      Today 02:15 PM
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface mt-1">
                    90 min sedentary duration exceeded in Armchair.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary font-medium">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Resolved: Sarah J. checked via Intercom</span>
                  </div>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="relative group">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-tertiary ring-4 ring-surface-container-lowest"></span>
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase">
                      Night Motion Event
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      Yesterday 08:30 PM
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface mt-1">
                    Movement toward bathroom detected outside sleep cycle.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">task_alt</span>
                    <span>Verified: Safe return to bed in 4 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arthur Jenkins Quick Ward Profile */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04),0_1px_3px_-1px_rgba(15,23,42,0.03)] border border-outline-variant/30">
            <div className="flex items-center gap-space-md pb-space-sm border-b border-surface-container-high/60">
              <img
                alt={ward.name}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary/20"
                src={ASSETS.arthurAvatarGentle}
              />
              <div className="flex flex-col min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                  {ward.name}, {ward.age}
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Ward #04 • {ward.unit}
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary mt-0.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  Independent Living Status
                </span>
              </div>
            </div>
            <div className="pt-space-sm space-y-space-xs">
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant font-label-md text-label-md">Primary Risk</span>
                <span className="font-label-md text-label-md text-on-surface font-medium">{ward.primaryRisk}</span>
              </div>
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant font-label-md text-label-md">Primary Caregiver</span>
                <span className="font-label-md text-label-md text-on-surface font-medium">{ward.primaryCaregiver}</span>
              </div>
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant font-label-md text-label-md">Emergency Dispatch</span>
                <span className="font-label-md text-label-md text-primary font-semibold">{ward.emergencyDispatch}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Safety & Privacy Footnote Compliance */}
      <footer className="mt-space-lg p-space-md rounded-xl bg-surface-container-low/70 flex flex-col sm:flex-row items-center justify-between gap-space-sm border border-outline-variant/20">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-outline text-[20px]">info</span>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            ElderCare AI is an automated visual safety monitoring assistive tool, not a certified diagnostic medical device. Alerts do not substitute professional triage.
          </p>
        </div>
        <div className="flex items-center gap-space-md shrink-0">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Firmware: v4.2.1-prod</span>
          <span className="font-label-sm text-label-sm text-primary font-semibold">System Telemetry Healthy</span>
        </div>
      </footer>
    </div>
  );
};
