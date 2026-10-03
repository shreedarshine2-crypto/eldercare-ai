import React, { useState, useEffect } from 'react';
import { AlertIncident, WardProfile, NavPage } from '../types';
import { ASSETS } from '../data/mockData';

interface AbnormalAlertsViewProps {
  activeIncident: AlertIncident | null;
  ward: WardProfile;
  onResolveIncident: (incidentId: string, category: string, note: string) => void;
  onNavigate: (page: NavPage) => void;
  onTriggerIntercom: () => void;
  isIntercomLive: boolean;
  onOpenEmergency: () => void;
  onAddToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AbnormalAlertsView: React.FC<AbnormalAlertsViewProps> = ({
  activeIncident,
  ward,
  onResolveIncident,
  onNavigate,
  onTriggerIntercom,
  isIntercomLive,
  onOpenEmergency,
  onAddToast
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(17);
  const [isSirenMuted, setIsSirenMuted] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [resolutionCategory, setResolutionCategory] = useState('Arthur is safe & standing (Assisted by Caregiver)');
  const [resolutionNote, setResolutionNote] = useState('');
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({ 1: true });

  // Live timer tick
  useEffect(() => {
    if (!activeIncident) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeIncident]);

  const handleMuteSiren = () => {
    setIsSirenMuted(true);
    onAddToast('Audio Siren Muted', 'Unit 4B local audible alert silenced. Visual alert remains active.', 'info');
  };

  const handleConfirmResolve = () => {
    if (!activeIncident) return;
    onResolveIncident(activeIncident.id, resolutionCategory, resolutionNote);
    setIsResolveModalOpen(false);
    onAddToast('Alert Resolved & Cleared', `Incident #EV-9402 logged as: ${resolutionCategory}`, 'success');
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  if (!activeIncident) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
        <div className="w-20 h-20 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[42px]">check_circle</span>
        </div>
        <h2 className="font-headline-md text-on-surface">No Critical Safety Events Active</h2>
        <p className="font-body-md text-on-surface-variant max-w-md mt-2">
          Arthur is currently resting in a safe state with normal postural equilibrium. All edge AI vision monitors are operating nominal.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 bg-primary text-on-primary font-label-lg rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate('alert-history')}
            className="px-5 py-2.5 bg-surface-container-high text-on-surface font-label-lg rounded-xl hover:bg-surface-container transition-colors"
          >
            View Alert History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-margin select-none">
      <div className="w-full flex flex-col gap-space-lg">
        
        {/* Top Action & Urgency Banner */}
        <div className="relative overflow-hidden rounded-xl bg-error-container p-space-md shadow-md border border-error/20">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-error/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative z-10">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-error flex items-center justify-center text-on-error shadow-sm flex-shrink-0">
                <span className="material-symbols-outlined text-[28px] animate-pulse">crisis_alert</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-semibold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-surface animate-ping"></span>
                    Critical Safety Event Detected
                  </span>
                  <span className="text-on-error-container font-label-md text-label-md font-medium">
                    Action Required Immediately
                  </span>
                </div>
                <p className="font-headline-sm text-headline-sm text-on-error-container mt-0.5">
                  Elapsed Time: <span className="font-bold tabular-nums font-mono">{elapsedSeconds}</span>s ago • Incident Logged at {activeIncident.timestamp}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm w-full md:w-auto">
              <button
                type="button"
                onClick={handleMuteSiren}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl font-label-lg text-label-lg shadow-sm transition-all ${
                  isSirenMuted 
                    ? 'bg-tertiary-container/30 text-tertiary font-bold border border-tertiary/40' 
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSirenMuted ? 'volume_off' : 'volume_up'}
                </span>
                <span>{isSirenMuted ? 'Siren Muted' : 'Mute Siren'}</span>
              </button>
              <a
                href="#action-matrix"
                className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs bg-error text-on-error px-space-md py-space-sm rounded-xl font-label-lg text-label-lg shadow-sm hover:bg-error/90 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">emergency_home</span>
                <span>Go to Response Panel</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ward Context Profile & Classification Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Ward Details */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="relative">
                  <img
                    alt={ward.name}
                    className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-error/30"
                    src={ASSETS.arthurAvatarAlert}
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-error ring-2 ring-surface-container-lowest flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-on-error animate-ping"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <h1 className="font-headline-md text-headline-md text-on-surface">
                      {activeIncident.title}
                    </h1>
                    <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                      Priority 1 (Emergency)
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Rapid descent followed by ground-level immobility observed in{' '}
                    <span className="font-semibold text-on-surface">{activeIncident.location}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Monitored Ward
                </span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {ward.name} • Age {ward.age}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {ward.unit}, {ward.residence.split(',')[0]}
                </span>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-md">
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                  Model: <span className="font-semibold text-on-surface">Visual Optical FallNet v3.2</span>
                </span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">speed</span>
                  Latency: <span className="font-semibold text-on-surface">118ms (Edge Processed)</span>
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                Encrypted Telemetry via On-Premises Gateway #GW-092
              </span>
            </div>
          </div>

          {/* AI Confidence Card */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Confidence Metric
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                Verified High
              </span>
            </div>
            <div className="flex items-center gap-space-md my-space-xs">
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-error"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="94.2, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-headline-sm text-headline-sm text-on-surface font-bold">
                  94%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  High Fall Probability
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Kinematic signature matches horizontal floor displacement.
                </span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
              <div className="bg-error h-full rounded-full transition-all duration-700" style={{ width: '94.2%' }}></div>
            </div>
          </div>
        </div>

        {/* Central Evidence Deck: Split View (Freeze-frame snapshot vs Live Reconnect) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
          {/* Video Streams Panel */}
          <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center justify-between flex-wrap gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">splitscreen</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Visual Verification Feed</h2>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Living Room Optical Sensor #01
                </span>
              </div>
            </div>

            {/* Feeds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Incident Freeze-Frame Snapshot */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-error">pause_circle</span>
                    Event Freeze Snapshot (10:42:18 PM)
                  </span>
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                    Impact T-0s
                  </span>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-inverse-surface group shadow-inner">
                  <img
                    alt="Event freeze snapshot"
                    className="w-full h-full object-cover"
                    src={ASSETS.eventFreezeSnapshot}
                  />
                  {/* AI Bounding Box Overlay for Pose Detection */}
                  <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-end">
                    <div className="w-48 h-28 ml-10 mb-4 rounded border-2 border-dashed border-error/90 bg-error/15 relative flex flex-col justify-between p-1.5 backdrop-blur-[1px]">
                      <div className="flex items-center justify-between">
                        <span className="bg-error text-on-error font-label-sm text-label-sm font-semibold px-1 rounded">
                          Pose: Horizontal / Ground
                        </span>
                        <span className="bg-error/80 text-on-error font-label-sm text-label-sm px-1 rounded">
                          94.2%
                        </span>
                      </div>
                      <span className="text-on-error font-label-sm text-label-sm self-end bg-inverse-surface/80 px-1 rounded">
                        Height: 0.12m
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-space-xs py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-error">lock_clock</span>
                    Captured Trigger Frame
                  </div>
                </div>
              </div>

              {/* Live Feed Reconnection */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold text-tertiary flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
                    </span>
                    Live Feed (Active Reconnect)
                  </span>
                  <span className="px-space-xs py-0.5 rounded bg-tertiary-container/30 text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
                    Real-Time HD
                  </span>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-inverse-surface shadow-inner">
                  <img
                    alt="Live surveillance stream"
                    className="w-full h-full object-cover"
                    src={ASSETS.liveFeedReconnect}
                  />
                  {/* Overlay and Status */}
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent flex flex-col justify-between p-3 pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className="bg-error text-on-error px-space-xs py-0.5 rounded font-label-sm text-label-sm font-bold tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-on-error animate-ping"></span> REC LIVE
                      </span>
                      <span className="bg-inverse-surface/75 text-inverse-on-surface px-space-xs py-0.5 rounded font-label-sm text-label-sm font-mono">
                        30 FPS • 1080p
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-inverse-on-surface">
                      <span className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded flex items-center gap-1 ${
                        isIntercomLive ? 'bg-error text-on-error animate-pulse' : 'bg-inverse-surface/80'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {isIntercomLive ? 'mic' : 'mic_none'}
                        </span>
                        {isIntercomLive ? 'Intercom Broadcasting Live' : 'Two-way Audio: Ready'}
                      </span>
                      <span className="font-label-sm text-label-sm bg-inverse-surface/80 px-space-xs py-0.5 rounded">
                        Microphone active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Kinematics Sparkline Panel */}
            <div className="mt-space-xs bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm border border-outline-variant/20">
              <div className="flex items-center justify-between flex-wrap gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary">show_chart</span>
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                    Telemetry Kinematics (Vertical Velocity & Displacement)
                  </span>
                </div>
                <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-error"></span> Descent Velocity (m/s)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Ground Elevation (m)
                  </span>
                </div>
              </div>

              {/* Inline Telemetry SVG Graph */}
              <div className="w-full h-28 relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 110">
                  <defs>
                    <linearGradient id="velocityGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line stroke="#bcc9c6" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="600" y1="20" y2="20"></line>
                  <line stroke="#bcc9c6" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="600" y1="55" y2="55"></line>
                  <line stroke="#bcc9c6" strokeDasharray="4" strokeWidth="0.5" x1="0" x2="600" y1="90" y2="90"></line>
                  
                  {/* Elevation Line: Steady 1.3m, sharp drop to 0.05m at x=340 */}
                  <path d="M 0,35 L 260,36 L 290,40 L 320,50 L 340,95 L 600,98" fill="none" stroke="#006398" strokeLinecap="round" strokeWidth="2.5"></path>
                  
                  {/* Velocity Spike Fill Area and Stroke */}
                  <path d="M 0,90 L 260,90 L 300,85 L 330,15 L 345,75 L 360,90 L 600,90 Z" fill="url(#velocityGrad)"></path>
                  <path d="M 0,90 L 260,90 L 300,85 L 330,15 L 345,75 L 360,90 L 600,90" fill="none" stroke="#ba1a1a" strokeLinecap="round" strokeWidth="2.5"></path>
                  
                  {/* Critical Incident Annotation Marker at Peak */}
                  <circle className="animate-ping" cx="330" cy="15" fill="#ba1a1a" r="5"></circle>
                  <circle cx="330" cy="15" fill="#ffffff" r="3.5" stroke="#ba1a1a" strokeWidth="2"></circle>
                </svg>

                {/* Annotation Badge on SVG Graph */}
                <div className="absolute top-1 left-[55%] -translate-x-1/2 bg-surface-container-lowest px-space-xs py-0.5 rounded shadow-sm border border-error/20 flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold">
                  <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                  2.8 m/s sudden drop @ 10:42:18
                </div>
              </div>

              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant font-mono">
                <span>-30s (10:41:48) Normal Gait</span>
                <span className="text-error font-bold">Impact Registered (10:42:18)</span>
                <span>+{elapsedSeconds}s Inactivity at Floor (Present)</span>
              </div>
            </div>
          </div>

          {/* Protocol & Response Checklist Column */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            {/* Emergency Protocol Guidance */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">assignment_turned_in</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Standard Response Protocol</h3>
              </div>
              <div className="flex flex-col gap-space-sm">
                
                {/* Step 1 */}
                <div 
                  onClick={() => toggleStep(1)}
                  className={`p-space-sm rounded-xl flex items-start gap-space-sm cursor-pointer transition-all border ${
                    completedSteps[1] 
                      ? 'bg-primary-container/15 border-primary/30' 
                      : 'bg-surface-container-low border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5 ${
                    completedSteps[1] ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {completedSteps[1] ? '✓' : '1'}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Inspect Video & Speak Over Intercom
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Confirm conscious state. Use the bidirectional audio button below.
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div 
                  onClick={() => toggleStep(2)}
                  className={`p-space-sm rounded-xl flex items-start gap-space-sm cursor-pointer transition-all border ${
                    completedSteps[2] 
                      ? 'bg-primary-container/15 border-primary/30' 
                      : 'bg-surface-container-low border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5 ${
                    completedSteps[2] ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {completedSteps[2] ? '✓' : '2'}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Assess Responsiveness within 30s
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      If no vocal or visible feedback, sound unit safety chime.
                    </span>
                  </div>
                </div>

                {/* Step 3 */}
                <div 
                  onClick={() => toggleStep(3)}
                  className={`p-space-sm rounded-xl flex items-start gap-space-sm cursor-pointer transition-all border ${
                    completedSteps[3] 
                      ? 'bg-primary-container/15 border-primary/30' 
                      : 'bg-surface-container-low border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0 mt-0.5 ${
                    completedSteps[3] ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'
                  }`}>
                    {completedSteps[3] ? '✓' : '3'}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Dispatch EMS & Alert Family
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Press 911 Direct EMS button to transfer video snapshot and address.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high/40 p-space-sm rounded-lg flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">info</span>
                <span>Safety event detection alert — please verify visually before dismissing.</span>
              </div>
            </div>

            {/* Rapid Contacts Direct Dial Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-surface">Emergency Contacts</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">Direct Dial Ready</span>
              </div>
              <div className="flex flex-col gap-space-xs mt-1">
                
                {/* Contact 1 */}
                <div className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-label-md">
                      SJ
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface">Sarah Jenkins</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Daughter • Primary (555-0192)</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => onAddToast('Calling Sarah Jenkins', 'Dialing (555) 0192 on speaker...', 'info')}
                    className="p-2 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </button>
                </div>

                {/* Contact 2 */}
                <div className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-semibold text-label-md">
                      RV
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface">Dr. Robert Vance</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Attending MD • (555-0144)</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => onAddToast('Calling Dr. Robert Vance', 'Dialing clinical office line (555) 0144...', 'info')}
                    className="p-2 rounded-xl bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </button>
                </div>

                {/* Contact 3: 911 */}
                <div className="flex items-center justify-between p-space-sm rounded-lg bg-error-container/40 border border-error/20">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-full bg-error text-on-error flex items-center justify-center font-semibold text-label-md">
                      911
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">Metro EMS Dispatch</span>
                      <span className="font-label-sm text-label-sm text-on-error-container">Pinecrest District 4 Priority Line</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={onOpenEmergency}
                    className="p-2 rounded-xl bg-error text-on-error hover:bg-error/90 active:scale-95 transition-all flex items-center justify-center shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">e911_emergency</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Command Bar */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md border border-outline-variant/30 flex flex-col gap-space-md" id="action-matrix">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Caregiver Action Command</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Select immediate protocol step based on visual review and live response.
              </p>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              Unit Address Pre-Populated: 742 Evergreen Terr, Unit 4B
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            
            {/* Button 1: Dispatch Emergency EMS */}
            <button
              type="button"
              onClick={onOpenEmergency}
              className="group relative flex flex-col items-start justify-between p-space-md rounded-xl bg-error text-on-error shadow-md hover:bg-error/90 hover:scale-[1.01] active:scale-[0.99] transition-all text-left"
            >
              <div className="flex items-center justify-between w-full">
                <span className="material-symbols-outlined text-[32px]">e911_emergency</span>
                <span className="text-on-error bg-surface/20 px-2 py-0.5 rounded font-label-sm text-label-sm font-bold uppercase">
                  Immediate
                </span>
              </div>
              <div className="mt-space-md">
                <span className="font-headline-sm text-headline-sm font-bold block leading-tight">Dispatch EMS (911)</span>
                <span className="font-label-sm text-label-sm text-on-error/80 mt-1 block">
                  Send telemetry, medical info & entry codes
                </span>
              </div>
            </button>

            {/* Button 2: Call Arthur (Intercom) */}
            <button
              type="button"
              onClick={onTriggerIntercom}
              className={`group flex flex-col items-start justify-between p-space-md rounded-xl shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all text-left ${
                isIntercomLive 
                  ? 'bg-tertiary text-on-tertiary ring-4 ring-tertiary/30 animate-pulse' 
                  : 'bg-secondary text-on-secondary hover:bg-secondary/90'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="material-symbols-outlined text-[32px]">
                  {isIntercomLive ? 'settings_voice' : 'record_voice_over'}
                </span>
                <span className="bg-surface/20 px-2 py-0.5 rounded font-label-sm text-label-sm font-bold">
                  {isIntercomLive ? 'Broadcasting...' : 'Standby'}
                </span>
              </div>
              <div className="mt-space-md">
                <span className="font-headline-sm text-headline-sm font-bold block leading-tight">
                  {isIntercomLive ? 'End Arthur Intercom' : 'Call Arthur Intercom'}
                </span>
                <span className="font-label-sm text-label-sm opacity-90 mt-1 block">
                  Broadcast direct voice through Room Cam 01
                </span>
              </div>
            </button>

            {/* Button 3: View Full Live Stream */}
            <button
              type="button"
              onClick={() => onNavigate('live-monitoring')}
              className="group flex flex-col items-start justify-between p-space-md rounded-xl bg-primary text-on-primary shadow-sm hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all text-left"
            >
              <div className="flex items-center justify-between w-full">
                <span className="material-symbols-outlined text-[32px]">fullscreen</span>
                <span className="text-on-primary bg-surface/20 px-2 py-0.5 rounded font-label-sm text-label-sm">
                  Pan-Tilt-Zoom
                </span>
              </div>
              <div className="mt-space-md">
                <span className="font-headline-sm text-headline-sm font-bold block leading-tight">
                  Full Live Feed & Cam Controls
                </span>
                <span className="font-label-sm text-label-sm text-on-primary/80 mt-1 block">
                  Open high-res room pan & 360 audio array
                </span>
              </div>
            </button>

            {/* Button 4: Mark as Safe / False Alarm */}
            <button
              type="button"
              onClick={() => setIsResolveModalOpen(true)}
              className="group flex flex-col items-start justify-between p-space-md rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface hover:scale-[1.01] active:scale-[0.99] transition-all text-left border border-outline-variant/30"
            >
              <div className="flex items-center justify-between w-full">
                <span className="material-symbols-outlined text-[32px] text-tertiary">verified</span>
                <span className="text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded font-label-sm text-label-sm">
                  Resolution
                </span>
              </div>
              <div className="mt-space-md">
                <span className="font-headline-sm text-headline-sm font-bold block leading-tight">
                  Mark as Safe / False Alarm
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block">
                  Dismiss siren & log posture anomaly note
                </span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Resolution / Confirmation Modal Overlay */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-md p-space-md animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-xl shadow-2xl flex flex-col gap-space-md border border-outline-variant/30">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface">Resolve Fall Alert</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                Are you sure you want to dismiss this critical alert? This will stop warning chimes and notify all registered caregivers that Arthur Jenkins is safe.
              </p>
            </div>
            
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Resolution Category
              </label>
              <select
                value={resolutionCategory}
                onChange={(e) => setResolutionCategory(e.target.value)}
                className="w-full bg-surface-container-low rounded-xl px-space-md py-space-sm font-body-sm text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
              >
                <option>Arthur is safe & standing (Assisted by Caregiver)</option>
                <option>Intentional Floor Exercise / Stretching</option>
                <option>Optical Sensor Glitch / Object Movement Misclassification</option>
                <option>Self-Recovered Fall (No Injury Reported)</option>
              </select>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Caregiver Resolution Note (Optional)
              </label>
              <textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                rows={2}
                placeholder="e.g. Arthur slipped gently reaching for eyeglasses. No contusion, assisted to armchair, vitals normal."
                className="w-full bg-surface-container-low rounded-xl p-space-sm font-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-space-sm mt-space-sm">
              <button
                type="button"
                onClick={() => setIsResolveModalOpen(false)}
                className="px-space-md py-space-sm rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmResolve}
                className="px-space-md py-space-sm rounded-xl font-label-lg text-label-lg bg-primary text-on-primary shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
              >
                Confirm & Clear Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
