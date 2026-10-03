import React, { useState } from 'react';
import { NavPage, AlertIncident, WardProfile, NotificationItem } from './types';
import {
  PRIMARY_WARD,
  INITIAL_ACTIVE_INCIDENT,
  INITIAL_HISTORICAL_INCIDENTS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EmergencyModal } from './components/EmergencyModal';
import { NotificationPopover } from './components/NotificationPopover';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AbnormalAlertsView } from './views/AbnormalAlertsView';
import { DashboardView } from './views/DashboardView';
import { LiveMonitoringView } from './views/LiveMonitoringView';
import { AlertHistoryView } from './views/AlertHistoryView';
import { ElderlyProfileView } from './views/ElderlyProfileView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('abnormal-alerts');
  const [ward, setWard] = useState<WardProfile>(PRIMARY_WARD);
  const [activeIncident, setActiveIncident] = useState<AlertIncident | null>(INITIAL_ACTIVE_INCIDENT);
  const [incidents, setIncidents] = useState<AlertIncident[]>(INITIAL_HISTORICAL_INCIDENTS);
  const [isIntercomLive, setIsIntercomLive] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Intercom
  const handleToggleIntercom = () => {
    setIsIntercomLive((prev) => {
      const next = !prev;
      if (next) {
        addToast('Intercom Channel Open', 'Speaking directly into Living Room (Cam 01) array.', 'info');
      } else {
        addToast('Intercom Disconnected', 'Voice broadcast ended. Room microphone on standby.', 'info');
      }
      return next;
    });
  };

  // Resolve Incident
  const handleResolveIncident = (incidentId: string, category: string, note: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'resolved',
            resolutionCategory: category,
            resolutionNote: note || category
          };
        }
        return inc;
      })
    );
    setActiveIncident(null);
    setWard((prev) => ({
      ...prev,
      status: 'safe',
      statusText: 'Resting safely in Living Room'
    }));
  };

  // Trigger simulated fall
  const handleTriggerTestFall = () => {
    const testIncident: AlertIncident = {
      ...INITIAL_ACTIVE_INCIDENT,
      id: `sim-fall-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'active'
    };
    setActiveIncident(testIncident);
    setIncidents((prev) => [testIncident, ...prev]);
    setWard((prev) => ({
      ...prev,
      status: 'emergency',
      statusText: 'Living Room (Cam 01) • Possible Fall Detected'
    }));
  };

  // Notification selection
  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setIsNotificationsOpen(false);
    if (item.pageLink) {
      setCurrentPage(item.pageLink);
    }
  };

  const handleClearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked read', undefined, 'info');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        hasActiveAlert={activeIncident !== null}
      />

      {/* Main App Container (Offset by sidebar 288px) */}
      <div className="pl-72">
        {/* Fixed Top Header */}
        <Header
          ward={ward}
          onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          unreadCount={unreadCount}
          onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          onNavigateToProfile={() => setCurrentPage('elderly-profile')}
        />

        {/* Notification Popover */}
        <NotificationPopover
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onSelectNotification={handleSelectNotification}
          onClearAll={handleClearNotifications}
        />

        {/* Viewport Content */}
        <main className="relative pt-20 bg-surface min-h-screen w-full px-gutter">
          {currentPage === 'abnormal-alerts' && (
            <AbnormalAlertsView
              activeIncident={activeIncident}
              ward={ward}
              onResolveIncident={handleResolveIncident}
              onNavigate={setCurrentPage}
              onTriggerIntercom={handleToggleIntercom}
              isIntercomLive={isIntercomLive}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              onAddToast={addToast}
            />
          )}

          {currentPage === 'dashboard' && (
            <DashboardView
              ward={ward}
              onNavigate={setCurrentPage}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              onTriggerIntercom={handleToggleIntercom}
              isIntercomLive={isIntercomLive}
              onAddToast={addToast}
            />
          )}

          {currentPage === 'live-monitoring' && (
            <LiveMonitoringView
              ward={ward}
              onNavigate={setCurrentPage}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              onTriggerTestFall={handleTriggerTestFall}
              onTriggerIntercom={handleToggleIntercom}
              isIntercomLive={isIntercomLive}
              onAddToast={addToast}
            />
          )}

          {currentPage === 'alert-history' && (
            <AlertHistoryView
              incidents={incidents}
              ward={ward}
              onUpdateIncident={(updated) => {
                setIncidents((prev) =>
                  prev.map((i) => (i.id === updated.id ? updated : i))
                );
                if (activeIncident?.id === updated.id && updated.status !== 'active') {
                  setActiveIncident(null);
                  setWard((prev) => ({
                    ...prev,
                    status: 'safe',
                    statusText: 'Resting safely in Living Room'
                  }));
                }
              }}
              onAddToast={addToast}
            />
          )}

          {currentPage === 'elderly-profile' && (
            <ElderlyProfileView
              ward={ward}
              onNavigate={setCurrentPage}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              onAddToast={addToast}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              onNavigate={setCurrentPage}
              onAddToast={addToast}
            />
          )}
        </main>
      </div>

      {/* Global Emergency Escalation Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        ward={ward}
        onDispatchInitiated={(service) => {
          addToast('Emergency Dispatch Triggered', `Telemetry packet routed to ${service}. Units rolling.`, 'error');
        }}
      />

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
