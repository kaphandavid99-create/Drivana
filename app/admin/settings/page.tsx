"use client";

import { useState } from "react";
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Shield, 
  Bell, 
  Palette,
  Database,
  Key
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Drivana",
    siteDescription: "Find your perfect ride. Rent, buy, or sell cars with ease.",
    contactEmail: "contact@drivana.com",
    supportPhone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    maintenanceMode: false
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@drivana.com",
    smtpPassword: "••••••••",
    emailFromName: "Drivana Team",
    emailFromAddress: "noreply@drivana.com"
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: true,
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireStrongPassword: true,
    enableCaptcha: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newUserAlert: true,
    orderAlerts: true,
    systemAlerts: true,
    marketingEmails: false
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate saving settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "email", label: "Email", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell }
  ];

  return (
    <div className="space-y-8 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your website settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Settings Navigation */}
      <div className="bg-gray-800 rounded-xl p-1 border border-gray-700">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-sky-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">General Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Support Phone</label>
                <input
                  type="tel"
                  value={generalSettings.supportPhone}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportPhone: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">Site Description</label>
              <textarea
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none h-24"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Maintenance Mode</p>
                <p className="text-gray-400 text-sm">Put your website in maintenance mode</p>
              </div>
              <button
                onClick={() => setGeneralSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  generalSettings.maintenanceMode ? "bg-sky-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    generalSettings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Email Settings */}
        {activeTab === "email" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Email Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">SMTP Host</label>
                <input
                  type="text"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">SMTP Port</label>
                <input
                  type="text"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">SMTP Username</label>
                <input
                  type="text"
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">SMTP Password</label>
                <input
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">From Name</label>
                <input
                  type="text"
                  value={emailSettings.emailFromName}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, emailFromName: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">From Address</label>
                <input
                  type="email"
                  value={emailSettings.emailFromAddress}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, emailFromAddress: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 text-sm">
                <strong>Note:</strong> Test your email configuration by sending a test email to verify settings are working correctly.
              </p>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Security Configuration</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Enable Two-Factor Authentication</p>
                  <p className="text-gray-400 text-sm">Require 2FA for admin accounts</p>
                </div>
                <button
                  onClick={() => setSecuritySettings(prev => ({ ...prev, enableTwoFactor: !prev.enableTwoFactor }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    securitySettings.enableTwoFactor ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.enableTwoFactor ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Require Strong Passwords</p>
                  <p className="text-gray-400 text-sm">Enforce strong password requirements</p>
                </div>
                <button
                  onClick={() => setSecuritySettings(prev => ({ ...prev, requireStrongPassword: !prev.requireStrongPassword }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    securitySettings.requireStrongPassword ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.requireStrongPassword ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Enable CAPTCHA</p>
                  <p className="text-gray-400 text-sm">Add CAPTCHA to login forms</p>
                </div>
                <button
                  onClick={() => setSecuritySettings(prev => ({ ...prev, enableCaptcha: !prev.enableCaptcha }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    securitySettings.enableCaptcha ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.enableCaptcha ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Session Timeout (hours)</label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Min Password Length</label>
                <input
                  type="number"
                  value={securitySettings.passwordMinLength}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-gray-400 text-sm">Send notifications via email</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.emailNotifications ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Push Notifications</p>
                  <p className="text-gray-400 text-sm">Send browser push notifications</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.pushNotifications ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.pushNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">New User Alerts</p>
                  <p className="text-gray-400 text-sm">Notify when new users register</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, newUserAlert: !prev.newUserAlert }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.newUserAlert ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.newUserAlert ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Order Alerts</p>
                  <p className="text-gray-400 text-sm">Notify about new orders and bookings</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, orderAlerts: !prev.orderAlerts }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.orderAlerts ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.orderAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">System Alerts</p>
                  <p className="text-gray-400 text-sm">Notify about system issues and updates</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, systemAlerts: !prev.systemAlerts }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.systemAlerts ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.systemAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Marketing Emails</p>
                  <p className="text-gray-400 text-sm">Send promotional and marketing emails</p>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, marketingEmails: !prev.marketingEmails }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.marketingEmails ? "bg-sky-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.marketingEmails ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
