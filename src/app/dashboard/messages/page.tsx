'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { mockConversations } from '@/lib/mock-data'

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

export default function MessagesPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [newMessage, setNewMessage] = useState('')
  const selectedConversation = mockConversations[selectedIndex]

  const handleSend = () => {
    if (newMessage.trim()) {
      setNewMessage('')
    }
  }

  return (
    <div className="p-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Messages</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Stay connected with your clients</p>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Conversations List */}
        <div className="w-80 overflow-hidden flex flex-col" style={glassPanel}>
          <div className="px-6 py-4 border-b border-black/5">
            <h2 style={{ ...headingStyle, fontSize: '16px' }}>Conversations</h2>
          </div>

          <div className="overflow-y-auto flex-1">
            {mockConversations.map((conversation, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className="w-full px-6 py-4 border-b border-black/5 text-left transition-colors"
                style={{
                  background: selectedIndex === idx ? 'rgba(255,255,255,0.4)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (selectedIndex !== idx) e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={(e) => {
                  if (selectedIndex !== idx) e.currentTarget.style.background = 'transparent'
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-800">
                      {getInitials(conversation.clientName)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-medium truncate" style={{ color: '#2C313E' }}>
                        {conversation.clientName}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="w-5 h-5 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2462EB' }}>
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: '#ADB1B8' }} className="mb-1">{conversation.clientCompany}</p>
                    <p className="text-sm truncate" style={{ color: '#6E727B' }}>{conversation.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col" style={glassPanel}>
          {/* Header */}
          <div
            className="px-6 py-4 border-b border-black/5"
            style={{
              background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-800">
                  {getInitials(selectedConversation.clientName)}
                </span>
              </div>
              <div>
                <p className="font-bold" style={{ color: '#2C313E' }}>{selectedConversation.clientName}</p>
                <p style={{ fontSize: '12px', color: '#6E727B' }}>{selectedConversation.clientCompany}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                  style={message.sender !== 'user' ? { background: 'rgba(255,255,255,0.6)', color: '#2C313E' } : undefined}
                >
                  <p className="text-sm">{message.body}</p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: message.sender === 'user' ? 'rgba(191,219,254,1)' : '#ADB1B8' }}
                  >
                    {new Date(message.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            className="px-6 py-4 border-t border-black/5"
            style={{
              background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend()
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 transition-colors flex items-center gap-2"
                style={primaryBtn}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
