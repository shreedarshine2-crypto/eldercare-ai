export type NavPage = 
  | 'dashboard' 
  | 'live-monitoring' 
  | 'abnormal-alerts' 
  | 'alert-history' 
  | 'elderly-profile' 
  | 'settings';

export interface WardProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  unit: string;
  residence: string;
  image: string;
  status: 'safe' | 'monitoring' | 'emergency';
  statusText: string;
  primaryRisk: string;
  primaryCaregiver: string;
  caregiverPhone: string;
  attendingPhysician: string;
  physicianPhone: string;
  emergencyDispatch: string;
  dispatchPhone: string;
  mobilityScore: number;
  fallRiskPercent: number;
  continuousRestMins: number;
  routineAdherencePercent: number;
}

export interface CaregiverProfile {
  name: string;
  role: string;
  facility: string;
  avatar: string;
  phone: string;
}

export interface AlertIncident {
  id: string;
  code: string;
  type: 'fall' | 'inactivity' | 'movement' | 'camera';
  title: string;
  location: string;
  cameraName: string;
  timestamp: string;
  date: string;
  duration: string;
  status: 'active' | 'acknowledged' | 'false_positive' | 'resolved';
  urgency: 'critical' | 'high' | 'medium' | 'low';
  aiRisk: number;
  posturalDeviation: string;
  accelerationG: string;
  videoThumbnail: string;
  triggerFrameImage?: string;
  liveReconnectImage?: string;
  wireframeAnalysisImage?: string;
  careNotes: string;
  caregiverAction: string;
  resolutionNote?: string;
  resolutionCategory?: string;
  timeline: Array<{
    time: string;
    source: string;
    description: string;
    color: 'error' | 'secondary' | 'tertiary';
  }>;
}

export interface TelemetryState {
  motionIntensity: number;
  floorProximityMeters: number;
  staticInactivitySeconds: number;
  ambientTempF: number;
  ambientLight: string;
  ambientDb: number;
  cameraUptime: string;
  latencyMs: number;
  fps: number;
  bitrate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'critical' | 'warning' | 'info' | 'success';
  pageLink?: NavPage;
}
