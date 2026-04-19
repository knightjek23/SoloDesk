'use client'

import { useState } from 'react'
import { Upload, Plus } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const [profile, setProfile] = useState({
    name: 'Josh Smith',
    email: 'josh@solodesk.com',
    businessName: 'Smith Design Studio',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94102',
  })

  const [branding, setBranding] = useState({
    primaryColor: '#2563eb',
    invoiceHeader: 'Thank you for your business!',
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and business settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mt-8 mb-8">
        {['profile', 'branding', 'billing', 'integrations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Branding Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900 mb-1">Click to upload your logo</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Header Text</label>
              <textarea
                value={branding.invoiceHeader}
                onChange={(e) => setBranding({ ...branding, invoiceHeader: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Current Plan</h2>

            <div className="border-l-4 border-blue-600 pl-6 py-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">Solo Plan</p>
                  <p className="text-sm text-gray-600 mt-1">$29/month</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Next billing date</p>
                  <p className="font-medium text-gray-900">May 8, 2024</p>
                </div>
              </div>
            </div>

            <button className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Change Plan
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Usage This Month</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Invoices sent</p>
                <p className="font-medium text-gray-900">6 / Unlimited</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Active clients</p>
                <p className="font-medium text-gray-900">5 / Unlimited</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Active projects</p>
                <p className="font-medium text-gray-900">8 / Unlimited</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Connected Services</h2>

          <div className="space-y-4">
            {['Stripe', 'Google Calendar', 'Zapier'].map((service) => (
              <div key={service} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{service}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {service === 'Stripe' && 'Accept online payments and manage transactions'}
                    {service === 'Google Calendar' && 'Sync your calendar and schedule'}
                    {service === 'Zapier' && 'Automate workflows between apps'}
                  </p>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
