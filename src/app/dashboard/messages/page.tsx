'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { mockConversations } from '@/lib/mock-data'

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Stay connected with your clients</p>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Conversations List */}
        <div className="w-80 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Conversations</h2>
          </div>

          <div className="overflow-y-auto flex-1">
            {mockConversations.map((conversation, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                  selectedIndex === idx ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-800">
                      {getInitials(conversation.clientName)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-medium text-gray-900 truncate">
                        {conversation.clientName}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{conversation.clientCompany}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-800">
                  {getInitials(selectedConversation.clientName)}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-900">{selectedConversation.clientName}</p>
                <p className="text-xs text-gray-600">{selectedConversation.clientCompany}</p>
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
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.body}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
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
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
