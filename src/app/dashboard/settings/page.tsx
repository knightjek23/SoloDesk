'use client'

import { useState } from 'react'
import { Upload, Plus } from 'lucide-react'

const glassPanel = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const headingStyle = { fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E' } as const

const primaryBtn = {
  background: '#2462EB',
  color: '#fff',
  borderWidth: '1px 3px 3px 1px',
  borderColor: '#000',
  borderStyle: 'solid' as const,
  borderRadius: '4px',
} as const

const secondaryBtn = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  border: '1px solid #000',
  borderRadius: '4px',
  color: '#2C313E',
} as const

const inputStyle = { border: '1px solid rgba(0,0,0,0.15)' } as const

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
        <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Settings</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Manage your account and business settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-black/5 mt-8 mb-8">
        {['profile', 'branding', 'billing', 'integrations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-6 py-3 font-medium border-b-2 transition-colors capitalize"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderColor: activeTab === tab ? '#2462EB' : 'transparent',
              color: activeTab === tab ? '#2462EB' : '#6E727B',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="p-8 max-w-2xl" style={glassPanel}>
          <h2 style={{ ...headingStyle, fontSize: '20px' }} className="mb-6">Profile Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Business Name</label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 font-medium transition-colors" style={secondaryBtn}>
                Cancel
              </button>
              <button className="px-6 py-2 font-medium transition-colors" style={primaryBtn}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div className="p-8 max-w-2xl" style={glassPanel}>
          <h2 style={{ ...headingStyle, fontSize: '20px' }} className="mb-6">Branding Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4" style={{ color: '#000' }}>Logo</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors" style={{ borderColor: 'rgba(0,0,0,0.15)' }}>
                <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: '#ADB1B8' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#2C313E' }}>Click to upload your logo</p>
                <p style={{ fontSize: '12px', color: '#ADB1B8' }}>PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Primary Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Invoice Header Text</label>
              <textarea
                value={branding.invoiceHeader}
                onChange={(e) => setBranding({ ...branding, invoiceHeader: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 font-medium transition-colors" style={secondaryBtn}>
                Cancel
              </button>
              <button className="px-6 py-2 font-medium transition-colors" style={primaryBtn}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="p-8 max-w-2xl" style={glassPanel}>
            <h2 style={{ ...headingStyle, fontSize: '20px' }} className="mb-6">Current Plan</h2>

            <div className="pl-6 py-4 mb-6" style={{ borderLeft: '4px solid #2462EB' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold" style={{ color: '#2C313E' }}>Solo Plan</p>
                  <p className="text-sm mt-1" style={{ color: '#6E727B' }}>$29/month</p>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: '#6E727B' }}>Next billing date</p>
                  <p className="font-medium" style={{ color: '#2C313E' }}>May 8, 2024</p>
                </div>
              </div>
            </div>

            <button className="px-6 py-2 font-medium transition-colors" style={secondaryBtn}>
              Change Plan
            </button>
          </div>

          <div className="p-8 max-w-2xl" style={glassPanel}>
            <h2 style={{ ...headingStyle, fontSize: '20px' }} className="mb-6">Usage This Month</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: '#6E727B' }}>Invoices sent</p>
                <p className="font-medium" style={{ color: '#2C313E' }}>6 / Unlimited</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: '#6E727B' }}>Active clients</p>
                <p className="font-medium" style={{ color: '#2C313E' }}>5 / Unlimited</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: '#6E727B' }}>Active projects</p>
                <p className="font-medium" style={{ color: '#2C313E' }}>8 / Unlimited</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="p-8 max-w-2xl" style={glassPanel}>
          <h2 style={{ ...headingStyle, fontSize: '20px' }} className="mb-6">Connected Services</h2>

          <div className="space-y-4">
            {['Stripe', 'Google Calendar', 'Zapier'].map((service) => (
              <div
                key={service}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{
                  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <div>
                  <p className="font-medium" style={{ color: '#2C313E' }}>{service}</p>
                  <p className="text-sm mt-1" style={{ color: '#6E727B' }}>
                    {service === 'Stripe' && 'Accept online payments and manage transactions'}
                    {service === 'Google Calendar' && 'Sync your calendar and schedule'}
                    {service === 'Zapier' && 'Automate workflows between apps'}
                  </p>
                </div>
                <button className="px-4 py-2 font-medium transition-colors text-sm" style={secondaryBtn}>
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
