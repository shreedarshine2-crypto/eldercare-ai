import React, { useState, useEffect, useRef } from 'react';
import { WardProfile, NavPage } from '../types';
import { ASSETS } from '../data/mockData';

interface LiveMonitoringViewProps {
  ward: WardProfile;
  onNavigate: (page: NavPage) => void;
  onOpenEmergency: () => void;
  onTriggerTestFall: () => void;
  onTriggerIntercom: () => void;
  isIntercomLive: boolean;
  onAddToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const LiveMonitoringView: React.FC<LiveMonitoringViewProps> = ({
  ward,
  onNavigate,
  onOpenEmergency,
  onTriggerTestFall,
  onTriggerIntercom,
  isIntercomLive,
  onAddToast
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isIRView, setIsIRView] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [activePreset, setActivePreset] = useState<'living' | 'reading' | 'hallway'>('living');
  const [motionIntensity, setMotionIntensity] = useState(26);
  const [inactivitySeconds, setInactivitySeconds] = useState(192); // 3 mins 12 secs
  const [liveClock, setLiveClock] = useState('');
  const [simAlertVisible, setSimAlertVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Live timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const m = monthNames[now.getMonth()];
      const d = String(now.getDate()).padStart(2, '0');
      const y = now.getFullYear();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const hh = String(hours).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setLiveClock(`${m} ${d}, ${y} - ${hh}:${mm}:${ss} ${ampm} EST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Motion intensity subtle fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMotionIntensity((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(14, Math.min(46, prev + delta));
      });
      setInactivitySeconds((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleSnapshot = () => {
    onAddToast('High-Res Snapshot Captured', 'Saved with cryptographic timestamp #SS-8821.', 'success');
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleTestFall = () => {
    setSimAlertVisible(true);
    onTriggerTestFall();
    onAddToast('Test Fall Simulation Triggered', 'Critical event relay activated in test sandbox.', 'error');
  };

  // Switch camera background according to active PTZ preset
  const getCameraBg = () => {
    if (activePreset === 'reading') return ASSETS.bedroomRecliner;
    if (activePreset === 'hallway') return ASSETS.hallwayNight;
    return ASSETS.livingRoomStreamNorth;
  };

  return (
    <div className="flex flex-col w-full pb-space-xl select-none">
      
      {/* Top Context & Emergency Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[16px]">sensors</span>
            <span>Neural Edge Node 04 • Continuous Observation</span>
          </div>
          <div className="flex items-baseline gap-space-sm mt-0.5">
            <h1 className="font-headline-md text-headline-md text-on-surface">Living Room Direct Video Feed</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
              Zero-Lag WebRTC
            </span>
          </div>
        </div>

        {/* Quick Emergency & Simulation Controls */}
        <div className="flex items-center flex-wrap gap-space-sm">
          <button
            type="button"
            onClick={handleTestFall}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high text-on-surface rounded-xl font-label-lg text-label-lg shadow-sm hover:bg-surface-variant active:scale-[0.98] transition-all border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">model_training</span>
            <span>Test Fall Simulation Alert</span>
          </button>
          <button
            type="button"
            onClick={onOpenEmergency}
            className="flex items-center gap-space-xs px-space-md py-space-xs bg-error text-on-error rounded-xl font-label-lg text-label-lg shadow-md hover:bg-error/90 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">emergency_home</span>
            <span>Emergency Escalation</span>
          </button>
        </div>
      </div>

      {/* Primary Monitoring Stage: 12-Column Responsive Layout */}
      <div className="grid grid-cols-12 gap-space-lg items-start">
        
        {/* LEFT: Main 16:9 Viewport & Controls Dock (8 cols) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-space-md">
          
          {/* Video Viewport Container (16:9) */}
          <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden bg-on-background shadow-xl select-none group border border-outline-variant/30"
          >
            {/* Background Stream Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                isIRView ? 'grayscale brightness-125 contrast-125' : ''
              } ${!isPlaying ? 'blur-xs brightness-75' : ''}`}
              style={{ backgroundImage: `url('${getCameraBg()}')` }}
            ></div>

            {/* Ambient Darkening Gradient for HUD Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-on-background/70 pointer-events-none"></div>

            {/* TOP-LEFT HUD OVERLAY */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20 pointer-events-none">
              <div className="flex items-center gap-2 bg-on-background/75 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm text-surface border border-surface-variant/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
                </span>
                <span className="font-label-sm text-label-sm font-semibold tracking-wider text-error-container uppercase">
                  REC • LIVE
                </span>
                <span className="w-1 h-1 rounded-full bg-surface-variant/40"></span>
                <span className="font-label-sm text-label-sm tracking-tight text-surface-container font-mono">
                  {liveClock}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-on-background/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-surface-container-high w-fit">
                <span className="material-symbols-outlined text-[15px] text-primary-fixed">videocam</span>
                <span className="font-label-sm text-label-sm font-medium">
                  {activePreset === 'living' ? 'CAM 01: Living Room North' :
                   activePreset === 'reading' ? 'CAM 02: Reading Nook' : 'CAM 03: Hallway Entry'}
                </span>
              </div>
            </div>

            {/* TOP-RIGHT HUD OVERLAY */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-none">
              <div className="hidden sm:flex items-center gap-2.5 bg-on-background/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-sm text-surface text-label-sm font-label-sm font-mono border border-surface-variant/20">
                <span className="text-tertiary-fixed font-semibold">1080p @ 30 FPS</span>
                <span className="text-surface-variant/40">•</span>
                <span className="text-surface-container">4.2 Mbps</span>
                <span className="text-surface-variant/40">•</span>
                <span className="text-secondary-fixed">82ms Latency</span>
              </div>
              <div className="flex items-center gap-1.5 bg-primary-container/80 backdrop-blur-md text-on-primary-container px-2.5 py-1 rounded-lg text-label-sm font-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[15px]">privacy_tip</span>
                <span>Privacy Shield Active (Face Blur On)</span>
              </div>
            </div>

            {/* CENTER AI SKELETAL TRACKING & BOUNDING BOX HUD */}
            {showSkeleton && (
              <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300">
                <div className="absolute top-[22%] left-[44%] w-[22%] h-[64%]">
                  {/* Target Reticle Box */}
                  <div className="w-full h-full relative rounded-lg bg-primary/10 border border-primary-fixed/40">
                    {/* Reticle Corner Markers */}
                    <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary-fixed"></div>
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary-fixed"></div>
                    <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary-fixed"></div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary-fixed"></div>

                    {/* AI Overlay Tag Badge */}
                    <div className="absolute -top-12 left-0 min-w-[210px] bg-on-background/90 backdrop-blur-md text-surface rounded-xl p-2 shadow-lg flex flex-col gap-0.5 border border-surface-variant/20">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-semibold text-primary-fixed">
                          {ward.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 bg-tertiary/40 text-tertiary-fixed rounded-md font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span> Tracked
                        </span>
                      </div>
                      <div className="font-label-sm text-label-sm text-surface-container-high flex items-center justify-between text-[11px]">
                        <span>Posture: <strong>Upright / Walking</strong></span>
                        <span className="font-mono text-secondary-fixed">0.4 m/s</span>
                      </div>
                      <div className="w-full bg-surface-container/20 rounded-full h-1 mt-1 overflow-hidden">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: '14%' }}></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-surface-variant font-mono mt-0.5">
                        <span>Fall Risk: Low</span>
                        <span className="text-tertiary-fixed">p = 0.04</span>
                      </div>
                    </div>

                    {/* Simulated AI Pose Skeleton SVG */}
                    <svg className="absolute inset-0 w-full h-full stroke-primary-fixed-dim" fill="none" viewBox="0 0 100 240">
                      {/* Head */}
                      <circle className="fill-primary/20" cx="50" cy="22" r="10" strokeWidth="2"></circle>
                      <circle className="fill-primary-fixed" cx="50" cy="22" r="3"></circle>
                      {/* Spine / Torso */}
                      <line strokeLinecap="round" strokeWidth="2.5" x1="50" x2="50" y1="32" y2="105"></line>
                      {/* Shoulders */}
                      <line strokeLinecap="round" strokeWidth="2.5" x1="28" x2="72" y1="46" y2="46"></line>
                      {/* Left Arm */}
                      <line strokeLinecap="round" strokeWidth="2" x1="28" x2="22" y1="46" y2="82"></line>
                      <line strokeLinecap="round" strokeWidth="2" x1="22" x2="26" y1="82" y2="114"></line>
                      <circle className="fill-primary-fixed" cx="22" cy="82" r="2.5"></circle>
                      <circle className="fill-primary-fixed" cx="26" cy="114" r="2.5"></circle>
                      {/* Right Arm */}
                      <line strokeLinecap="round" strokeWidth="2" x1="72" x2="78" y1="46" y2="82"></line>
                      <line strokeLinecap="round" strokeWidth="2" x1="78" x2="74" y1="82" y2="114"></line>
                      <circle className="fill-primary-fixed" cx="78" cy="82" r="2.5"></circle>
                      <circle className="fill-primary-fixed" cx="74" cy="114" r="2.5"></circle>
                      {/* Pelvis */}
                      <line strokeLinecap="round" strokeWidth="2.5" x1="36" x2="64" y1="105" y2="105"></line>
                      {/* Left Leg */}
                      <line strokeLinecap="round" strokeWidth="2" x1="38" x2="34" y1="105" y2="165"></line>
                      <line strokeLinecap="round" strokeWidth="2" x1="34" x2="40" y1="165" y2="228"></line>
                      <circle className="fill-primary-fixed" cx="34" cy="165" r="2.5"></circle>
                      <circle className="fill-primary-fixed" cx="40" cy="228" r="3"></circle>
                      {/* Right Leg */}
                      <line strokeLinecap="round" strokeWidth="2" x1="62" x2="68" y1="105" y2="162"></line>
                      <line strokeLinecap="round" strokeWidth="2" x1="68" x2="64" y1="162" y2="225"></line>
                      <circle className="fill-primary-fixed" cx="68" cy="162" r="2.5"></circle>
                      <circle className="fill-primary-fixed" cx="64" cy="225" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Fall Simulation Alert Banner (Triggered by Button) */}
            {simAlertVisible && (
              <div className="absolute inset-x-4 top-16 bg-error/95 backdrop-blur-md rounded-2xl p-4 text-on-error shadow-2xl flex items-center justify-between z-30 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[32px] animate-pulse">warning</span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm leading-tight">
                      CRITICAL ALERT: Rapid Floor Deceleration Detected
                    </span>
                    <span className="font-body-sm text-body-sm text-error-container">
                      Simulated event at Living Room North • Auto-verifying audio cues...
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSimAlertVisible(false)}
                    className="px-3 py-1.5 bg-surface text-error rounded-xl font-label-lg text-label-lg hover:bg-surface-variant transition-colors"
                  >
                    Dismiss Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('abnormal-alerts')}
                    className="px-4 py-1.5 bg-surface-container-lowest text-on-background rounded-xl font-label-lg text-label-lg font-bold shadow-md hover:bg-white transition-colors"
                  >
                    Open Incident Deck →
                  </button>
                </div>
              </div>
            )}

            {/* 2-Way Audio Intercom Active Overlay Indicator */}
            {isIntercomLive && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-primary/95 text-on-primary px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                <span className="material-symbols-outlined text-[20px] animate-pulse">mic</span>
                <span className="font-label-md text-label-md font-semibold">
                  2-Way Audio Channel Open • Arthur Can Hear You
                </span>
              </div>
            )}

            {/* FLOATING BOTTOM CONTROL DOCK */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between bg-on-background/85 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-2xl text-surface border border-surface-variant/20">
              {/* Left playback & audio toggles */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:bg-surface-variant/20 rounded-xl transition-colors text-surface"
                  title={isPlaying ? 'Pause Stream' : 'Resume Stream'}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isPlaying ? 'pause_circle' : 'play_circle'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleSnapshot}
                  className="p-2 hover:bg-surface-variant/20 rounded-xl transition-colors text-surface"
                  title="Take Instant Verified Snapshot"
                >
                  <span className="material-symbols-outlined text-[22px]">camera</span>
                </button>
                <button
                  type="button"
                  onClick={onTriggerIntercom}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    isIntercomLive
                      ? 'bg-error text-on-error animate-pulse'
                      : 'bg-surface-container-high/20 hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isIntercomLive ? 'mic_off' : 'mic'}
                  </span>
                  <span className="hidden md:inline font-label-sm text-label-sm font-medium">
                    {isIntercomLive ? 'Disconnect' : 'Intercom'}
                  </span>
                </button>
              </div>

              {/* Center Toggle Pill Group */}
              <div className="flex items-center gap-1 bg-surface-container-highest/10 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsIRView(!isIRView)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                    isIRView 
                      ? 'bg-secondary text-on-secondary font-semibold shadow-sm' 
                      : 'hover:bg-surface-variant/20 text-surface-container'
                  }`}
                  title="Toggle IR Night Vision"
                >
                  <span className="material-symbols-outlined text-[18px]">bedtime</span>
                  <span className="hidden lg:inline font-label-sm text-label-sm">IR View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSkeleton(!showSkeleton)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                    showSkeleton 
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm' 
                      : 'hover:bg-surface-variant/20 text-surface-container'
                  }`}
                  title="Toggle AI Posture Skeleton"
                >
                  <span className="material-symbols-outlined text-[18px]">accessibility_new</span>
                  <span className="hidden lg:inline font-label-sm text-label-sm">AI Skeleton</span>
                </button>
              </div>

              {/* Right utilities & volume */}
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-surface-container-highest/10 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-surface hover:text-primary-fixed"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
                    </span>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 accent-primary h-1 bg-surface-variant/30 rounded-lg cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="p-2 hover:bg-surface-variant/20 rounded-xl transition-colors text-surface"
                  title="Toggle Fullscreen"
                >
                  <span className="material-symbols-outlined text-[22px]">fullscreen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Room Presets & PTZ Directional Strip */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm p-space-md bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">pan_tool_alt</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface">PTZ Active Presets</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Pan, Tilt & Zoom Room Focal Centers
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-xs flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setActivePreset('living');
                  onAddToast('PTZ Switched', 'Camera centered on Living Room North focal area.', 'info');
                }}
                className={`px-space-md py-1.5 rounded-xl font-label-sm text-label-sm font-semibold transition-all ${
                  activePreset === 'living'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                Preset 1: Living Area {activePreset === 'living' && '(Active)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePreset('reading');
                  onAddToast('PTZ Switched', 'Camera shifted to Reading Nook angle.', 'info');
                }}
                className={`px-space-md py-1.5 rounded-xl font-label-sm text-label-sm font-semibold transition-all ${
                  activePreset === 'reading'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                Preset 2: Reading Nook {activePreset === 'reading' && '(Active)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePreset('hallway');
                  onAddToast('PTZ Switched', 'Camera panned to Hallway Entryway.', 'info');
                }}
                className={`px-space-md py-1.5 rounded-xl font-label-sm text-label-sm font-semibold transition-all ${
                  activePreset === 'hallway'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                Preset 3: Hallway Entry {activePreset === 'hallway' && '(Active)'}
              </button>
            </div>
          </div>

          {/* Camera Session Specs Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md p-space-md bg-surface-container-low rounded-2xl border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[22px]">videocam_auto</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Hardware Model</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">SafeVision Pro AI PTZ-400</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[22px]">enhanced_encryption</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Security Protocol</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">v2.8.4 • WebRTC E2EE Safe</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-[22px]">panorama_wide_angle</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Optics & Aperture</span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">130° Ultrawide UltraHD Sensor</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: AI Behavioral Telemetry & Activity Stream (4 cols) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-space-md">
          
          {/* Real-Time Behavioral Telemetry Panel */}
          <div className="bg-surface-container-lowest p-space-lg rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">monitoring</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Behavioral Telemetry</h2>
              </div>
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold text-tertiary">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> Synchronized
              </span>
            </div>

            {/* Motion Intensity Gauge */}
            <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-2 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Real-Time Motion Intensity</span>
                <span className="font-headline-sm text-headline-sm font-semibold text-primary font-mono tabular-nums">
                  {motionIntensity}%
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${motionIntensity}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Normal gentle movement</span>
                <span className="text-tertiary font-medium">Safe Zone</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-space-sm">
              {/* Floor Proximity */}
              <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-1 border border-outline-variant/20">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-secondary">height</span>
                  <span>Floor Proximity</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold font-mono tabular-nums">
                    1.1
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">meters</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary font-medium mt-1">Normal standing</span>
              </div>

              {/* Inactivity Timer */}
              <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-1 border border-outline-variant/20">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
                  <span>Static Inactivity</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold font-mono tabular-nums">
                    {formatTimer(inactivitySeconds)}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Threshold: 45m</span>
              </div>
            </div>

            {/* Ambient Room Environmental Telemetry */}
            <div className="bg-surface p-space-md rounded-2xl flex flex-col gap-space-xs border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Ambient Environment
              </span>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[18px] text-primary mb-0.5">thermostat</span>
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">71°F</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Optimal</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[18px] text-secondary mb-0.5">wb_sunny</span>
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">Adequate</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Daylight</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[18px] text-tertiary mb-0.5">graphic_eq</span>
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">38 dB</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Normal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Real-Time Detections (Event Feed) */}
          <div className="bg-surface-container-lowest p-space-lg rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">history_toggle_off</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Live Cues</h2>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Last 1 hr</span>
            </div>

            {/* Activity Timeline Cards */}
            <div className="flex flex-col gap-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {/* Event 1 */}
              <div className="relative pl-7 flex flex-col">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                <div className="flex items-baseline justify-between">
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">Walking path toward kitchen</span>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">07:40 PM</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Normal rhythmic gait detected. Distance traveled: 4.8m without stumble or tremor.
                </p>
              </div>

              {/* Event 2 */}
              <div className="relative pl-7 flex flex-col">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-tertiary ring-4 ring-surface-container-lowest"></div>
                <div className="flex items-baseline justify-between">
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">Armchair Stand-up Transition</span>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">07:35 PM</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Smooth postural transition. Stand initiation duration: 2.1s (normal range &lt; 3.0s).
                </p>
              </div>

              {/* Event 3 */}
              <div className="relative pl-7 flex flex-col">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></div>
                <div className="flex items-baseline justify-between">
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">Seated Reading in Living Room</span>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">06:50 PM</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Continuous rest period: 45 minutes. Micro-movements confirmed comfort state.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('alert-history')}
              className="w-full py-2.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">manage_search</span>
              <span>View Comprehensive Log</span>
            </button>
          </div>

          {/* Regulatory & Medical Safety Note */}
          <div className="p-space-md rounded-2xl bg-surface-container-high/40 flex items-start gap-space-sm text-on-surface-variant border border-outline-variant/20">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">verified_user</span>
            <span className="font-label-sm text-label-sm leading-relaxed">
              <strong>HIPAA Compliant System:</strong> Real-time neural processing executes locally on the hub edge. Video frames are synthesized for diagnostic safety indicators and are never monetized or shared.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
