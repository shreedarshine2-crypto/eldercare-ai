import React, { useState } from 'react';
import { AlertIncident, WardProfile } from '../types';

interface AlertHistoryViewProps {
  incidents: AlertIncident[];
  ward: WardProfile;
  onUpdateIncident: (incident: AlertIncident) => void;
  onAddToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AlertHistoryView: React.FC<AlertHistoryViewProps> = ({
  incidents,
  ward,
  onUpdateIncident,
  onAddToast
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'today' | 'week' | 'month' | 'unresolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<AlertIncident>(incidents[0]);
  const [inspectionNote, setInspectionNote] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Filter incidents
  const filteredIncidents = incidents.filter((inc) => {
    // Type filter
    if (selectedEventType !== 'all' && inc.type !== selectedEventType) return false;

    // Tab filter
    if (activeFilterTab === 'unresolved' && inc.status === 'resolved') return false;
    if (activeFilterTab === 'today' && !inc.timestamp.includes('PM') && !inc.date.includes('24')) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = inc.title.toLowerCase().includes(q);
      const matchLoc = inc.location.toLowerCase().includes(q);
      const matchNotes = inc.careNotes.toLowerCase().includes(q);
      const matchCode = inc.code.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchNotes && !matchCode) return false;
    }
    return true;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onAddToast('Incident Report Exported', 'Telemetry PDF & CSV audit logs downloaded successfully.', 'success');
    }, 1200);
  };

  const handleSaveResolution = (asFalse: boolean) => {
    if (!selectedIncident) return;
    const updated: AlertIncident = {
      ...selectedIncident,
      status: asFalse ? 'false_positive' : 'resolved',
      resolutionNote: inspectionNote || (asFalse ? 'Flagged as false detection by caregiver review' : 'Resolved and verified normal'),
      resolutionCategory: asFalse ? 'Caregiver Flagged False Alarm' : 'Caregiver Verified Safe'
    };
    onUpdateIncident(updated);
    setSelectedIncident(updated);
    setInspectionNote('');
    onAddToast(
      asFalse ? 'Marked as False Alarm' : 'Incident Resolved',
      `Incident ${selectedIncident.code} updated in medical log.`,
      'success'
    );
  };

  return (
    <div className="flex flex-col w-full pb-margin select-none">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm text-primary">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
            <span className="font-label-md text-label-md tracking-wider uppercase font-semibold">
              Continuous Telemetry Audit
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Alert & Detection Event History
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Historical log of safety events, inactivity triggers, and system notifications for {ward.name}.
          </p>
        </div>

        {/* Quick Export Utility */}
        <div className="flex items-center gap-space-sm self-start md:self-auto">
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container text-on-surface px-space-md py-space-sm rounded-xl font-label-lg text-label-lg shadow-sm border border-outline-variant/30 transition-all duration-200"
          >
            <span className={`material-symbols-outlined text-primary text-[18px] ${isExporting ? 'animate-spin' : ''}`}>
              {isExporting ? 'progress_activity' : 'file_download'}
            </span>
            <span>{isExporting ? 'Generating Report...' : 'Export Incident PDF / CSV'}</span>
          </button>
          <button
            type="button"
            onClick={() => onAddToast('Logs Refreshed', 'Telemetry data is synchronized with on-prem gateway.', 'info')}
            className="flex items-center justify-center p-space-sm bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant rounded-xl shadow-sm border border-outline-variant/30 transition-all"
            title="Refresh Log"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        {/* Stat 1 */}
        <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Total Events (30 Days)</span>
            <span className="p-1.5 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface leading-none tabular-nums font-mono">18</span>
            <span className="font-label-sm text-label-sm text-tertiary flex items-center font-medium">
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span> 14% vs prev mo
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs">
            Automated edge logs aggregated
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Possible Falls</span>
            <span className="p-1.5 rounded-lg bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">personal_injury</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface leading-none tabular-nums font-mono">1</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">/ 30 days</span>
          </div>
          <div className="flex items-center gap-space-xs mt-space-xs text-primary font-label-sm text-label-sm font-medium">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Resolved: verified slip without injury</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Prolonged Inactivity</span>
            <span className="p-1.5 rounded-lg bg-surface-container-high text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">bed</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface leading-none tabular-nums font-mono">12</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">occurrences</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs truncate">
            Typical afternoon naps, all acknowledged
          </span>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Average Response Time</span>
            <span className="p-1.5 rounded-lg bg-primary-fixed/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-display-lg text-primary leading-none tabular-nums font-mono">
              42<span className="font-headline-sm text-headline-sm ml-0.5">s</span>
            </span>
            <span className="font-label-sm text-label-sm text-tertiary flex items-center font-semibold">
              <span className="material-symbols-outlined text-[14px]">bolt</span> Ultra fast
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs">
            Intercom or physical verification SLA
          </span>
        </div>
      </div>

      {/* Main Filter Controls Bar */}
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/30 mb-space-lg">
        {/* Filter Tabs Row */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm">
          <div className="flex items-center gap-space-xs overflow-x-auto w-full sm:w-auto pb-space-xs sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveFilterTab('all')}
              className={`px-space-md py-1.5 rounded-xl font-label-md text-label-md transition-colors whitespace-nowrap ${
                activeFilterTab === 'all'
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              All Events ({incidents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterTab('today')}
              className={`px-space-md py-1.5 rounded-xl font-label-md text-label-md transition-colors whitespace-nowrap ${
                activeFilterTab === 'today'
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              Today (1)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterTab('week')}
              className={`px-space-md py-1.5 rounded-xl font-label-md text-label-md transition-colors whitespace-nowrap ${
                activeFilterTab === 'week'
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              This Week (6)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterTab('month')}
              className={`px-space-md py-1.5 rounded-xl font-label-md text-label-md transition-colors whitespace-nowrap ${
                activeFilterTab === 'month'
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              This Month (18)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilterTab('unresolved')}
              className={`px-space-md py-1.5 rounded-xl font-label-md text-label-md transition-colors whitespace-nowrap ${
                activeFilterTab === 'unresolved'
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              Unresolved ({incidents.filter((i) => i.status === 'active').length})
            </button>
          </div>

          {/* Quick Status Indicator */}
          <div className="flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm bg-surface-container-low px-space-md py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>Sensor Stream Health 99.8%</span>
          </div>
        </div>

        {/* Inputs & Selectors Cluster */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
          {/* Search */}
          <div className="relative md:col-span-5">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, location, or notes..."
              className="w-full bg-surface-container-low focus:bg-surface text-on-surface placeholder:text-on-surface-variant rounded-xl pl-9 pr-space-md py-2 font-body-sm text-body-sm outline-none border border-transparent focus:border-primary transition-all"
            />
          </div>

          {/* Event Type Dropdown */}
          <div className="relative md:col-span-4">
            <div className="flex items-center bg-surface-container-low rounded-xl px-space-md py-2 text-on-surface border border-transparent focus-within:border-primary">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">filter_alt</span>
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full bg-transparent font-body-sm text-body-sm text-on-surface outline-none cursor-pointer"
              >
                <option value="all">All Event Types</option>
                <option value="fall">Possible Fall Detected</option>
                <option value="inactivity">Prolonged Inactivity Detected</option>
                <option value="movement">Sudden Rapid Movement</option>
                <option value="camera">Camera Disconnect / Reconnect</option>
              </select>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between bg-surface-container-low rounded-xl px-space-md py-2 text-on-surface font-label-md text-label-md cursor-pointer hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_today</span>
                <span>Oct 01, 2026 - Oct 24, 2026</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_drop_down</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid: Left Event Table / Cards + Right Inspection Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Master Event Feed List */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">Incident Stream</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Showing {filteredIncidents.length} chronological detections
            </span>
          </div>

          {filteredIncidents.length === 0 ? (
            <div className="p-8 rounded-2xl bg-surface-container-lowest text-center text-on-surface-variant border border-outline-variant/30">
              No matching detection records found. Try adjusting filters or search query.
            </div>
          ) : (
            filteredIncidents.map((incident) => {
              const isSelected = selectedIncident?.id === incident.id;
              return (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className={`group relative flex flex-col sm:flex-row gap-space-md p-space-md rounded-2xl bg-surface-container-lowest transition-all cursor-pointer border ${
                    isSelected 
                      ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                      : 'border-outline-variant/30 shadow-sm hover:shadow-md hover:border-primary/40'
                  }`}
                >
                  {/* Event Visual Snippet */}
                  <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-surface-container shrink-0">
                    <img
                      alt={incident.title}
                      className="w-full h-full object-cover"
                      src={incident.videoThumbnail}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end justify-between p-2">
                      <span className="font-label-sm text-label-sm text-on-primary font-mono bg-inverse-surface/70 px-1.5 py-0.5 rounded">
                        {incident.timestamp.split(' ')[0]} {incident.timestamp.split(' ')[1]}
                      </span>
                      <span className="flex items-center text-on-primary font-label-sm text-label-sm">
                        {incident.urgency === 'critical' ? (
                          <span className="material-symbols-outlined text-[16px] text-error">warning</span>
                        ) : incident.status === 'resolved' ? (
                          <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                        )}
                      </span>
                    </div>

                    {/* AI Risk Tag */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded font-label-sm text-label-sm font-semibold shadow-sm">
                      <span className={`w-2 h-2 rounded-full ${
                        incident.aiRisk > 80 ? 'bg-error animate-pulse' :
                        incident.aiRisk > 40 ? 'bg-secondary' : 'bg-tertiary'
                      }`}></span>
                      <span className={incident.aiRisk > 80 ? 'text-error' : 'text-on-surface'}>
                        AI Risk: {Math.round(incident.aiRisk)}%
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-space-xs mb-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                          {incident.date} • {incident.timestamp}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                          incident.status === 'active' 
                            ? 'bg-error-container text-on-error-container animate-pulse' 
                            : incident.status === 'false_positive'
                            ? 'bg-surface-container-high text-on-surface-variant'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                        }`}>
                          {incident.status === 'active' ? 'Active Review' :
                           incident.status === 'false_positive' ? 'False Detection' : 'Acknowledged & Resolved'}
                        </span>
                      </div>

                      <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                        {incident.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-secondary">videocam</span>{' '}
                          {incident.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">timer</span>{' '}
                          Duration: {incident.duration}
                        </span>
                      </div>

                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-1">
                        {incident.careNotes}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-surface-container-high/60">
                      <span className={`font-label-sm text-label-sm font-medium flex items-center gap-1 ${
                        incident.urgency === 'critical' ? 'text-error' : 'text-tertiary'
                      }`}>
                        <span className="material-symbols-outlined text-[16px]">
                          {incident.urgency === 'critical' ? 'priority_high' : 'verified'}
                        </span>
                        {incident.urgency === 'critical' ? 'High Urgency Check' : 'Normal pattern match'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIncident(incident);
                        }}
                        className="flex items-center gap-1 text-primary font-label-md text-label-md group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>View Analysis</span>
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/30 mt-space-xs">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing <span className="font-semibold text-on-surface">1 - 5</span> of{' '}
              <span className="font-semibold text-on-surface">28</span> events
            </span>
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Event Inspection Drawer */}
        <div className="lg:col-span-5 sticky top-24 flex flex-col gap-space-md">
          {selectedIncident ? (
            <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-lg flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/30">
              {/* Drawer Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold bg-error-container text-error">
                      Incident ID: {selectedIncident.code}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      {selectedIncident.timestamp} UTC
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
                    Detailed Event Inspection
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {selectedIncident.title} • {selectedIncident.location}
                  </span>
                </div>
              </div>

              {/* Video Player Snippet Simulation */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-inverse-surface shadow-inner group">
                <img
                  alt="Inspection wireframe playback"
                  className="w-full h-full object-cover"
                  src={selectedIncident.wireframeAnalysisImage || selectedIncident.videoThumbnail}
                />
                
                {/* Skeletal Annotation SVG overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 225">
                  <circle cx="210" cy="85" fill="none" r="9" stroke="#6bd8cb" strokeWidth="2.5"></circle>
                  <line stroke="#6bd8cb" strokeWidth="2.5" x1="210" x2="200" y1="94" y2="135"></line>
                  <line stroke="#6bd8cb" strokeWidth="2.5" x1="200" x2="175" y1="135" y2="170"></line>
                  <line stroke="#6bd8cb" strokeWidth="2.5" x1="200" x2="225" y1="135" y2="175"></line>
                  <line stroke="#6bd8cb" strokeWidth="2.5" x1="205" x2="180" y1="105" y2="125"></line>
                  <line stroke="#6bd8cb" strokeWidth="2.5" x1="205" x2="235" y1="105" y2="115"></line>
                  <rect
                    fill="rgba(186, 26, 26, 0.15)"
                    height="120"
                    rx="8"
                    stroke="#ba1a1a"
                    strokeDasharray="4 2"
                    strokeWidth="1.5"
                    width="100"
                    x="155"
                    y="70"
                  ></rect>
                  <text fill="#ba1a1a" fontFamily="Inter" fontSize="9" fontWeight="600" x="160" y="84">
                    INCLINE SPEED &gt; 1.4 m/s
                  </text>
                </svg>

                {/* Privacy Shield Tag */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-inverse-surface/85 backdrop-blur-md px-2 py-1 rounded-lg text-on-primary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px] text-primary-fixed">visibility_off</span>
                  <span>Privacy Mask Active (HIPAA Safe)</span>
                </div>

                {/* Video Playback Bar Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-inverse-surface/90 to-transparent flex flex-col gap-1.5">
                  <div className="w-full bg-surface-container-high/40 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                    <div className="bg-primary-fixed h-full w-2/3"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-error"></div>
                  </div>
                  <div className="flex items-center justify-between text-on-primary font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                        className="hover:text-primary-fixed transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isPlayingVideo ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <span className="font-mono">00:09 / 00:14</span>
                    </div>
                    <span className="text-error font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Fall Point 00:07
                    </span>
                  </div>
                </div>
              </div>

              {/* Telemetry Breakdown Bento */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm bg-surface-container rounded-xl flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Postural Angle</span>
                  <span className="font-headline-sm text-headline-sm text-error mt-0.5">
                    {selectedIncident.posturalDeviation}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Normal threshold: &lt; 35°
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-xl flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Acceleration Impact</span>
                  <span className="font-headline-sm text-headline-sm text-primary mt-0.5">
                    {selectedIncident.accelerationG}
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary">Low shock coefficient</span>
                </div>
              </div>

              {/* Caregiver Verification & Notes Log */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">assignment</span>
                  <span>Caregiver Verification Log</span>
                </span>
                <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
                  {selectedIncident.timeline?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-space-sm">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        step.color === 'error' ? 'bg-error' :
                        step.color === 'secondary' ? 'bg-secondary' : 'bg-tertiary'
                      }`} />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            {step.source}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                            {step.time}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  {selectedIncident.resolutionNote && (
                    <div className="mt-1 pt-1 border-t border-surface-container-high/60 flex items-start gap-2 text-xs text-primary font-medium">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Resolution: {selectedIncident.resolutionNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Caregiver Rapid Response Note Form */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Add Incident Resolution Note
                </label>
                <div className="relative">
                  <textarea
                    value={inspectionNote}
                    onChange={(e) => setInspectionNote(e.target.value)}
                    rows={2}
                    placeholder="e.g. Checked on Arthur, he slipped gently onto rug while reaching for glasses, no injury reported..."
                    className="w-full bg-surface-container-low focus:bg-surface text-on-surface placeholder:text-on-surface-variant p-2.5 rounded-xl font-body-sm text-body-sm outline-none border border-outline-variant/30 focus:border-primary resize-none transition-all"
                  />
                </div>
              </div>

              {/* Action CTAs */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={() => handleSaveResolution(true)}
                  className="w-full py-2.5 px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                  <span>Mark False</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveResolution(false)}
                  className="w-full py-2.5 px-space-md rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Resolve Event</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-surface-container-lowest rounded-2xl text-center text-on-surface-variant border border-outline-variant/30">
              Select an incident from the stream to view deep analysis.
            </div>
          )}

          {/* Quick Tips Card */}
          <div className="p-space-md rounded-2xl bg-surface-container-high/40 flex items-start gap-space-md border border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[24px] shrink-0">lightbulb</span>
            <div className="flex flex-col gap-0.5">
              <span className="font-label-md text-label-md font-semibold text-on-surface">Proactive AI Tip</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Arthur&apos;s balance dips slightly after 9:30 PM. Setting up a floor illumination path light between living room and bed reduces false alerts by 40%.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
