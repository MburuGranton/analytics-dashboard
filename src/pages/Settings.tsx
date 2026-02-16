import React, { useState } from 'react';
import { Save, Bell, Mail, Shield, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  const [name, setName] = useState('Grant Mburu');
  const [email, setEmail] = useState('grant@example.com');
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    marketing: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Account and notification settings.</p>
      </div>

      {/* Profile */}
      <form onSubmit={handleSave} className="card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-primary-500" />
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Profile Information</h3>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">GM</div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:text-gray-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:text-gray-200 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          {saved && (
            <span className="text-sm text-primary-600 dark:text-primary-400 font-medium animate-pulse">
              Changes saved!
            </span>
          )}
        </div>
      </form>

      {/* Notifications */}
      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-5 h-5 text-primary-500" />
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          {[
            { key: 'email' as const, icon: Mail, label: 'Email Notifications', desc: 'Receive email updates about member activity and events' },
            { key: 'push' as const, icon: Bell, label: 'Push Notifications', desc: 'Get notified about chapter updates and new registrations' },
            { key: 'weekly' as const, icon: Globe, label: 'Weekly Digest', desc: 'Receive a weekly membership and engagement summary' },
            { key: 'marketing' as const, icon: Mail, label: 'Announcements', desc: 'Association-wide announcements and program launches' },
          ].map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggle(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 shrink-0 ${
                  notifications[key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    notifications[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
