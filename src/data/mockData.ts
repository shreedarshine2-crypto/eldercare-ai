import { AlertIncident, CaregiverProfile, NotificationItem, WardProfile } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVbi1PcU27c7FiOBEfGBIfMXKJxvqOPhDtfk-mUJvQIlKT44JBuQfCx3rt_xPbbj0ElP5W5Y2pT2aZkm45psBF-iZff7sgImSBZ-HKX_6hC_Nlf_IM0UqqUoW6FBpm3EW848XF2LAIp7oumqlWkkJ2a7IXKfcgDjyANpUoWXnZgiWFhIUf0q45t0OHc2bo5xyXc7Hpy8UCsfcMjaLUuLcX5LhpZrtc38cewUKIVvajAOuCyV5VAZ0dpw',
  caregiverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAeJzlR9yJGT5DzBAx0ZE99taB7tCh0W5Dcu5uZUup5ZP89ZvTswolIDvO98MqkWLFcOaz4_Bm0y0Rr8S4Bf4KNrn5dKuYdkEJ2gTbD8N6GZfdKVUahWPR5goBRj4SZqOd5plmVOCmoydfpXh7IbqJ-JVu_drHB3ip4Z9_vzXdHnsKgJQ0UAw79sxflqSqEq1tF4R0iepXcYAnv39PcuGKlvkbPkQ5sX_cIoRgVRyMJimFXNa8N14Sug',
  arthurAvatarAlert: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhbXR3-G4DwaJAfTeV_CHod6t-MV2ptDkT04Mimo17TGm7wil_78Vhnp13tM_XlobXuRJfjzKCYBM7D-XA-ZKHP4OUCquqlfImznG_LG8Dra81MeeRgB63p8GIXbSDcyzJq7dvlJ02EcAn8JIufvx_5CqjEGm61jiGtcliffcchm05rWfAltKqRHIW9pDPVXxXcwQTbMIoj80kC_N5RYFmP5v9yu8SHnXid7JORE2IugaG0ZK9W3jEMA',
  arthurAvatarGentle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_czwfNwk9zqofIILrnMkqGISm0A3CCeLP1Wl8mxYa50P54cbogYKr_oxxxGlDby1GQl1tE59T1pSiufD-WvMtWCB5MpWhhVy1rC-Y47gmGC5hRrbHrl39A2DuQYViUzcTLEPHfo4cma2PdPwkvSoQfi9HeGGoa6nZJYlfUoFni899hnoaZESo_6EUAUhcly44rpAE-1xpPAlmxSpTlsWObeTpsCFJlaASfauOqOsIdIvpjG6YeTUhMw',
  livingRoomArmchair: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByHIr8AH6bu7dVGtOwoqVsvXP3Mqb77vWaKcq2WddpoMN8l-qUDorffrt3LYgMMqruow0T-0K6UnzD_IIrjrcFWlUOGY9Q98AENYTuylS1S_8oSXv04r4QkUZnraskXB0M5OCi7cSCg8SDu6LamQBKpGIyrEdChmw6n6RCCQZoVwbI2L6gCVn2A1UHLKwLwJXxQ5vB063Y-s4y3B-1I8dm1S77Gz62qnhlLg02kPCjEJdWZ7WZnG8Vbw',
  livingRoomStreamNorth: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2z51IvB7NEPRvYEzTyoQyG3zCJFx4cAsVZ44Q5nOjkZL-WJ1Qm8ZYg6ANK6QugZ_6wlnn5hjY37QrX62MpRnhfZe09mvTDgp5pZGzW20vr_Z9sZjIkdb26m-37bA3Wd5wbOJpBB44Ip3raf4RF4zKREeeLO97rodJx4QMPFnLVraYf3tKtEpFZ-hvwpg2gouE3xaJJnMqF-4ByGSOQzKcyZvMTnJiCWZoLTi9q-v8uCprTYdXkND1g',
  eventFreezeSnapshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs6MCzYLBul5iV4ZL1oSTwu3NAj_4wHeoEK8nbh0agF9o-MFDqHVyJJBh3-9tcPUE0rV4OKVEKKou8UI3JJ3OhZdNbGwSzneC2fhFL2JNQus0QT9vEbUeTA_p5aiKsjReB9PVkjQfShCznPDEs5uuoqshitcS6rfrnUNEH4zUqH2v8blF0RNV3yaIUDS8OKecazM1VBzBiREVvHth8Q2VFoDjZziM1oJN2tQ0o4AWlKFVF1PzH34xyZQ',
  liveFeedReconnect: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxh6cfwBBROeopZnHEjaIBNS-iekPTREBreSGjzuvZj2H-cfwCtu4j1q6FbbuKnr74nmeMYbZZuOmjZ8pgbjLUEuMpDD6o3NaVkBljzMjYnzWV6xtVn4sXnGcKT4RQmCi6eZCdNYOCn2X3PNmMIp49nFBuaufdBZeihQy4qu8U7eH8TLLvAOLhJalY6xSZE8ffQNB0nAzdyyXzLI6Iuy2muPBHLB5C7_HumR251OF97vUjFTfTyY6VWQ',
  wireframeInspection: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa6G2ieoWEESxey9cf41xQy8k-ynYnCN-Z7mEKd5aB9gdmohQDcTxc0TDMqQusO2MjS7eyY0IE7mM4_F2CH8I9gXZ6wdGod_1ZAobC80CF-rfkXpvECatbGT6hG0V61f_tqtBJFu3EgvvhWclLLJQgDzsV-_RRAGPqUgbRt0IPugt2VrqkqrPZ0xOE9fEXxCklPb8EH5N_si4XYKt6PUAYdw8zIXqYnS2Iv0TwP2IxATieemuC6WmlWg',
  bedroomRecliner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZRCOUbiA_mNktQ3SfL1WPwKwf1dfTrp4cpXjtKRFizs79aiZZsGDckdJqY5aEnxrehXK2BnZC8H459GOZF5648FJaAMgtg0ZXv2AumAQOXYhH_yy4v5EVrIKwxMsKqfmMktghYY8HPlG6uBxutw2ZqKZBK2weUn3YR0bz45a2qtUJqesIp5Q_nwzuKTFQPM-rNp6XyEjx7gCPR4pKcIwLf5B3qkw2tywmVVgyv9nMsLYVC_It8AFfuw',
  kitchenArea: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG0W4jEzD0PKu7xMB_U5WtZX3_7mb0VY1Uqxn_AtiBTvMMX8MIL0rNGGhltFWK_ztKXCCms9-9dh1oNZxRTwvR44YfcR97f9A0zzaRSGDqyBWUst2hWCcuGKPs5EeGqqWUJt9v-sCbUeA1LarcH3c_bjybQtJU_eVKoeC4T_yWoTGnR8eK0sIIwDNGU23ZvCUk7JUqNMuJN1hgVT01zGrgiz1vlAlkSPw5D-TTk11EtGvVc9epcMpCEA',
  hallwayNight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1IT5Dpk3wUqlzABhGvIN4pC6Lzk3IQ8NYs7ctxLvugxqd5uuSwkSsI_m_P92GowzPNArYdTdlKK1FEdBczwEHT9SzVn7HWEUd_PS-TokFt3kmMTB40FYkPRucEbZuTRnmr4S5DUhAmrscGxsVI5rsT5eYs5ol_49q-7GcQCYB7IUHN6oEiE7iDikYYcHBJ4cbipzq_r6Hyc6uCHULoQQKTvNoX8_N136VbhubEZ2Ukpn5QMvmUzGIgw',
  slipNearArmchair: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJki02Tyb8RjvipYcvtCDkaGhe39iUp3AC3cnew6Y5Aicnr4z4wEZCUtppFjBfnW1-N35IitkPb94PwUWPc38yMGkEyUdgj9FMkB4S4ROHQN_G0AhfNf8Cu_K-DqMSAg9KNIe1ESD83YPigwJAs0WImQkLbYa02ToaZs-cufBJB0rzrnsuR8pYvB4lIW5ddPzbncNHiaV7g-qFvSplTUqEiLjLGXJCogfH9irXTWfn8fP9G4QEVFy77w'
};

export const CURRENT_CAREGIVER: CaregiverProfile = {
  name: 'Sarah Jenkins',
  role: 'RN • Primary Caregiver',
  facility: 'Community Care Pinecrest',
  avatar: ASSETS.caregiverAvatar,
  phone: '(555) 0192'
};

export const PRIMARY_WARD: WardProfile = {
  id: 'ward-04',
  name: 'Arthur Jenkins',
  age: 78,
  location: 'Living Room Unit',
  unit: 'Unit 4B',
  residence: 'Pinecrest Residences, 742 Evergreen Terr',
  image: ASSETS.arthurAvatarAlert,
  status: 'emergency', // default matches active alert screen
  statusText: 'Living Room (Cam 01) • Possible Fall Detected',
  primaryRisk: 'Mild Postural Instability',
  primaryCaregiver: 'Sarah Jenkins (RN / Daughter)',
  caregiverPhone: '(555) 0192',
  attendingPhysician: 'Dr. Robert Vance',
  physicianPhone: '(555) 0144',
  emergencyDispatch: 'Metro Health EMS (District 4 Priority)',
  dispatchPhone: '911',
  mobilityScore: 88,
  fallRiskPercent: 2.1,
  continuousRestMins: 32,
  routineAdherencePercent: 96
};

export const INITIAL_ACTIVE_INCIDENT: AlertIncident = {
  id: 'fall-active-01',
  code: '#EV-9402',
  type: 'fall',
  title: 'Possible Fall Detected',
  location: 'Living Room (Cam 01)',
  cameraName: 'Living Room Optical Sensor #01',
  timestamp: '10:42:18 PM',
  date: 'Oct 24, 2026',
  duration: '14s',
  status: 'active',
  urgency: 'critical',
  aiRisk: 94.2,
  posturalDeviation: '78° Deviation',
  accelerationG: '0.68 G',
  videoThumbnail: ASSETS.slipNearArmchair,
  triggerFrameImage: ASSETS.eventFreezeSnapshot,
  liveReconnectImage: ASSETS.liveFeedReconnect,
  wireframeAnalysisImage: ASSETS.wireframeInspection,
  careNotes: 'Rapid descent followed by ground-level immobility observed in Living Room (Cam 01). Kinematic signature matches horizontal floor displacement.',
  caregiverAction: 'Pending verification. Automatic alert relayed to S. Jenkins.',
  timeline: [
    {
      time: '10:42:18 PM',
      source: 'Auto Edge Sensor',
      description: 'Dispatched automated visual fall warning to duty smartphone.',
      color: 'error'
    },
    {
      time: '10:42:35 PM',
      source: 'Intercom Ping Initiated',
      description: '2-way audio triggered automatically. Awaiting vocal clearance.',
      color: 'secondary'
    }
  ]
};

export const INITIAL_HISTORICAL_INCIDENTS: AlertIncident[] = [
  INITIAL_ACTIVE_INCIDENT,
  {
    id: 'inactivity-24',
    code: '#EV-9388',
    type: 'inactivity',
    title: 'Prolonged Inactivity Detected',
    location: 'Bedroom Recliner',
    cameraName: 'Bedroom Cam #02',
    timestamp: '02:15:00 PM',
    date: 'Oct 24, 2026',
    duration: '95 mins',
    status: 'resolved',
    urgency: 'medium',
    aiRisk: 42,
    posturalDeviation: '12° Deviation',
    accelerationG: '0.04 G',
    videoThumbnail: ASSETS.bedroomRecliner,
    triggerFrameImage: ASSETS.bedroomRecliner,
    careNotes: 'Handled by Sarah Jenkins via Voice Intercom ("Resting safely"). Normal circadian pattern match.',
    caregiverAction: 'Voice check verified resting safely.',
    resolutionCategory: 'Assisted by Caregiver / Routine Nap',
    resolutionNote: 'Arthur was taking his scheduled afternoon nap. Responded clearly on intercom.',
    timeline: [
      {
        time: '02:15:00 PM',
        source: 'Motion Threshold Engine',
        description: 'No gross body postural shift registered for 90 minutes.',
        color: 'secondary'
      },
      {
        time: '02:15:48 PM',
        source: 'Voice Intercom Handled',
        description: 'Sarah spoke over speaker; Arthur answered in good spirits.',
        color: 'tertiary'
      }
    ]
  },
  {
    id: 'collapse-22',
    code: '#EV-9310',
    type: 'movement',
    title: 'Sudden Collapse-like Movement',
    location: 'Kitchen Area',
    cameraName: 'Kitchen Cam #01',
    timestamp: '08:14:10 PM',
    date: 'Oct 22, 2026',
    duration: '8s',
    status: 'false_positive',
    urgency: 'low',
    aiRisk: 61,
    posturalDeviation: '45° Pitch',
    accelerationG: '0.52 G',
    videoThumbnail: ASSETS.kitchenArea,
    triggerFrameImage: ASSETS.kitchenArea,
    careNotes: 'Dropped kitchen towel, bent down to pick it up.',
    caregiverAction: 'Model retraining tag submitted for floor retrieval motion.',
    resolutionCategory: 'Optical Sensor Glitch / Object Movement Misclassification',
    resolutionNote: 'Arthur bent down to retrieve a dish towel. Stood back up immediately with stable gait.',
    timeline: [
      {
        time: '08:14:10 PM',
        source: 'Optical Deceleration Vector',
        description: 'Rapid head descent toward floor plane.',
        color: 'secondary'
      },
      {
        time: '08:14:18 PM',
        source: 'Gait Re-stabilized',
        description: 'Subject resumed upright standing pose at counter.',
        color: 'tertiary'
      }
    ]
  },
  {
    id: 'night-inactivity-20',
    code: '#EV-9244',
    type: 'inactivity',
    title: 'Abnormal Night Inactivity',
    location: 'Hallway Central',
    cameraName: 'Hallway Optical Sensor',
    timestamp: '03:30:22 AM',
    date: 'Oct 20, 2026',
    duration: '20 mins',
    status: 'resolved',
    urgency: 'medium',
    aiRisk: 55,
    posturalDeviation: '8° Deviation',
    accelerationG: '0.02 G',
    videoThumbnail: ASSETS.hallwayNight,
    triggerFrameImage: ASSETS.hallwayNight,
    careNotes: 'Arthur paused to drink water by the kitchen entryway dispenser. Night pathing validated.',
    caregiverAction: 'Night pathing verified, safe return to bed confirmed.',
    resolutionCategory: 'Intentional Rest / Hydration',
    resolutionNote: 'Subject walked smoothly to get a glass of water and sat momentarily on hallway bench before returning to bed.',
    timeline: [
      {
        time: '03:30:22 AM',
        source: 'Night Motion Sensor',
        description: 'Hallway ambient night sensor detected standing stop.',
        color: 'secondary'
      },
      {
        time: '03:34:10 AM',
        source: 'Bed Pressure Grid',
        description: 'Subject re-entered bed with nominal pressure distribution.',
        color: 'tertiary'
      }
    ]
  },
  {
    id: 'camera-recon-18',
    code: '#EV-9182',
    type: 'camera',
    title: 'Camera Disconnect / Reconnected',
    location: 'Living Room Cam 01',
    cameraName: 'Mesh Node 02',
    timestamp: '11:05:40 AM',
    date: 'Oct 18, 2026',
    duration: '22ms',
    status: 'resolved',
    urgency: 'low',
    aiRisk: 5,
    posturalDeviation: '0°',
    accelerationG: '0.0 G',
    videoThumbnail: ASSETS.livingRoomStreamNorth,
    careNotes: 'Wi-Fi momentary switchover between 5GHz access points. Zero telemetry packets lost.',
    caregiverAction: 'Diagnostic code #NW-4012 auto-cleared.',
    resolutionCategory: 'Auto-healed Network Failover',
    resolutionNote: 'Seamless reconnect via secondary mesh AP. All video buffers flushed without packet loss.',
    timeline: [
      {
        time: '11:05:40 AM',
        source: 'Network Daemon',
        description: 'Mesh Node 02 AP handoff triggered.',
        color: 'secondary'
      },
      {
        time: '11:05:40 AM',
        source: 'WebRTC Reconnect',
        description: 'Handshake restored within 22 milliseconds.',
        color: 'tertiary'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Possible Fall Detected',
    message: 'Rapid descent observed in Living Room (Cam 01). Immediate visual review requested.',
    timestamp: 'Just now',
    read: false,
    type: 'critical',
    pageLink: 'abnormal-alerts'
  },
  {
    id: 'n-2',
    title: 'Routine Adherence High',
    message: 'Arthur completed morning walk and lunch on schedule (96% adherence).',
    timestamp: '3 hours ago',
    read: true,
    type: 'success',
    pageLink: 'dashboard'
  },
  {
    id: 'n-3',
    title: 'Mesh Node 02 Optimized',
    message: 'Edge AI camera link switched to 5GHz with 22ms latency.',
    timestamp: 'Yesterday',
    read: true,
    type: 'info',
    pageLink: 'live-monitoring'
  }
];
