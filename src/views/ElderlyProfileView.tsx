import React, { useState } from 'react';
import { WardProfile, NavPage } from '../types';
import { ASSETS, CURRENT_CAREGIVER } from '../data/mockData';

interface ElderlyProfileViewProps {
  ward: WardProfile;
  onNavigate: (page: NavPage) => void;
  onOpenEmergency: () => void;
  onAddToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ElderlyProfileView: React.FC<ElderlyProfileViewProps> = ({
  ward,
  onNavigate,
  onOpenEmergency,
  onAddToast
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'careplan' | 'sensors' | 'medications'>('overview');
  const [caregiverNotes, setCaregiverNotes] = useState(
    'Arthur is in good spirits today. Blood pressure monitored at 122/78. Reminded to drink water and wear non-skid socks in the evening.'
  );

  const handleSaveNotes = () => {
    onAddToast('Care Notes Saved', 'Synced to Arthur Jenkins chart and duty tablet.', 'success');
  };

  return (
    <div className="flex flex-col w-full pb-space-xl select-none">
      
      {/* Profile Header Hero */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30 mb-space-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="relative">
              <img
                src={ASSETS.arthurAvatarGentle}
                alt={ward.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary-container/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tertiary ring-2 ring-surface-container-lowest flex items-center justify-center text-white text-[12px]">
                ✓
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-headline-xl text-on-surface">{ward.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm font-semibold">
                  Age {ward.age} • Ward #04
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant mt-0.5">
                {ward.unit} • {ward.residence}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                <span>Primary Risk: <strong className="text-on-surface">{ward.primaryRisk}</strong></span>
                <span>•</span>
                <span>Mobility Index: <strong className="text-primary">{ward.mobilityScore}/100</strong></span>
                <span>•</span>
                <span>Caregiver: <strong className="text-on-surface">{ward.primaryCaregiver}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('live-monitoring')}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md font-semibold hover:bg-primary/90 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              <span>Watch Live Cam</span>
            </button>
            <button
              type="button"
              onClick={onOpenEmergency}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-error text-on-error rounded-xl font-label-md font-semibold hover:bg-error/90 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Emergency Dial</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-6 border-b border-surface-container-high pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-label-md rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Clinical Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('careplan')}
            className={`px-4 py-2 font-label-md rounded-xl transition-all ${
              activeTab === 'careplan'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Fall Prevention Care Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sensors')}
            className={`px-4 py-2 font-label-md rounded-xl transition-all ${
              activeTab === 'sensors'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Installed Hardware & Sensors
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('medications')}
            className={`px-4 py-2 font-label-md rounded-xl transition-all ${
              activeTab === 'medications'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Medication Schedule
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            {/* Vitals & Baseline */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3">
              <h2 className="font-headline-sm text-on-surface">Baseline Biometrics & Mobility Assessment</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col">
                  <span className="text-xs text-on-surface-variant font-medium">Gait Velocity</span>
                  <span className="text-lg font-bold text-on-surface mt-1 font-mono">0.82 m/s</span>
                  <span className="text-xs text-tertiary">Normal senior range</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col">
                  <span className="text-xs text-on-surface-variant font-medium">Sit-to-Stand</span>
                  <span className="text-lg font-bold text-on-surface mt-1 font-mono">2.1s</span>
                  <span className="text-xs text-tertiary">Good power</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col">
                  <span className="text-xs text-on-surface-variant font-medium">Resting Heart Rate</span>
                  <span className="text-lg font-bold text-primary mt-1 font-mono">68 bpm</span>
                  <span className="text-xs text-primary font-medium">Stable sinus</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col">
                  <span className="text-xs text-on-surface-variant font-medium">Blood Pressure</span>
                  <span className="text-lg font-bold text-on-surface mt-1 font-mono">122 / 78</span>
                  <span className="text-xs text-tertiary">Normotensive</span>
                </div>
              </div>
            </div>

            {/* Daily Caregiver Notes Entry */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-on-surface">Primary Caregiver Shift Notes</h2>
                <span className="text-xs text-on-surface-variant">Logged by Sarah Jenkins, RN</span>
              </div>
              <textarea
                value={caregiverNotes}
                onChange={(e) => setCaregiverNotes(e.target.value)}
                rows={4}
                className="w-full bg-surface-container-low focus:bg-surface text-on-surface p-3 rounded-xl font-body-sm outline-none border border-outline-variant/30 focus:border-primary resize-none transition-all"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md font-semibold hover:bg-primary/90 transition-all shadow-sm"
                >
                  Save to Ward Medical Chart
                </button>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3">
              <h2 className="font-headline-sm text-on-surface">Diagnoses & Risk Alerts</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">medical_information</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface font-semibold">Mild Benign Postural Instability</span>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Occasional minor balance adjustment when turning rapidly. Prescribed cane for outdoor walks; indoor gait steady without mobility aid.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">visibility</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface font-semibold">Presbyopia / Reading Eyeglasses</span>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Requires reading glasses for books and tablet. Fall risk increases if bending down to retrieve fallen items.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Care Team & Rapid Escalation */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3">
              <h3 className="font-headline-sm text-on-surface">Designated Care Team</h3>
              
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low">
                <img src={CURRENT_CAREGIVER.avatar} alt="Caregiver" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-label-md font-semibold text-on-surface">Sarah Jenkins, RN</span>
                  <span className="text-xs text-on-surface-variant">Daughter & On-Duty Caregiver</span>
                  <span className="text-xs font-mono text-primary">(555) 0192</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low">
                <div className="w-10 h-10 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center font-bold text-xs">
                  MD
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-label-md font-semibold text-on-surface">Dr. Robert Vance</span>
                  <span className="text-xs text-on-surface-variant">Attending Geriatrician</span>
                  <span className="text-xs font-mono text-secondary">(555) 0144</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-error-container/30 border border-error/20">
                <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center font-bold text-xs">
                  911
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-label-md font-semibold text-on-surface">Metro Health EMS</span>
                  <span className="text-xs text-on-error-container">District 4 Rapid Unit (4.2m ETA)</span>
                </div>
              </div>
            </div>

            {/* Emergency Access Codes */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="font-label-sm uppercase font-semibold text-on-surface-variant">Building Access Protocol</span>
              <div className="space-y-1.5 text-xs text-on-surface font-mono">
                <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                  <span>Main Entrance Gate:</span>
                  <strong>#1209</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                  <span>Front Door Lockbox:</span>
                  <strong>#8842</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
                  <span>Fire Extinguisher:</span>
                  <strong>Hallway Closet B</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'careplan' && (
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <h2 className="font-headline-md text-on-surface">Fall Prevention Care Protocol</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[20px]">nightlight</span>
                <span>Nocturnal Pathway</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Automated nightlight strip triggers between bedroom and master bath at 8:30 PM. Floor sensors watch for unexpected stops &gt; 10 minutes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-secondary font-bold">
                <span className="material-symbols-outlined text-[20px]">bathtub</span>
                <span>Bathroom Non-Slip Grid</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Dual support grab bars installed near shower and water closet. Shower chair positioned with non-slip silicone floor pads.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-tertiary font-bold">
                <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                <span>Gait Adherence Goals</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Daily goal: 1,500 gentle steps distributed between morning walk (10 AM) and afternoon stretch (3 PM). No high-impact routines.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sensors' && (
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <h2 className="font-headline-md text-on-surface">Active Sensor Nodes in Unit 4B</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">videocam</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-bold text-on-surface">Living Room Optical Sensor #01</span>
                  <span className="text-xs text-on-surface-variant">SafeVision Pro AI PTZ-400 • 1080p 30fps</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold text-xs">
                Online (140ms)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">videocam</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-bold text-on-surface">Bedroom Sensor #02</span>
                  <span className="text-xs text-on-surface-variant">Fixed 120° Angle • Night Vision Enabled</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold text-xs">
                Online (112ms)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">sensor_occupied</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-bold text-on-surface">Hallway Night Motion Sensor</span>
                  <span className="text-xs text-on-surface-variant">Passive Infrared & Dual Beam Radar</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold text-xs">
                Armed
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-[24px]">bed</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-bold text-on-surface">Bed Sleep Pressure Matrix</span>
                  <span className="text-xs text-on-surface-variant">64-point piezoelectric sensor pad</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold text-xs">
                Armed
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'medications' && (
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <h2 className="font-headline-md text-on-surface">Daily Medication & Dosage Schedule</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">medication</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-semibold text-on-surface">Lisinopril 10mg (Blood Pressure)</span>
                  <span className="text-xs text-on-surface-variant">Morning with Breakfast • 8:00 AM</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-tertiary bg-tertiary-fixed/30 px-2.5 py-1 rounded-full">
                ✓ Taken Today
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">medication</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-semibold text-on-surface">Calcium + Vitamin D3 (Bone Density)</span>
                  <span className="text-xs text-on-surface-variant">With Lunch • 12:00 PM</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-tertiary bg-tertiary-fixed/30 px-2.5 py-1 rounded-full">
                ✓ Taken Today
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">medication</span>
                <div className="flex flex-col">
                  <span className="font-label-md font-semibold text-on-surface">Melatonin 3mg (Sleep Regularity)</span>
                  <span className="text-xs text-on-surface-variant">Bedtime Routine • 9:00 PM</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                Scheduled 9:00 PM
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
