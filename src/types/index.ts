export type ProjectStatus = 'draft' | 'active' | 'in_progress' | 'review' | 'completed' | 'archived'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue'
export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'declined'
export type ContractStatus = 'draft' | 'sent' | 'signed'
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type MessageSender = 'user' | 'client'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  address: string
  notes: string
  createdAt: string
  activeProjects: number
  totalBilled: number
}

export interface Project {
  id: string
  clientId: string
  clientName: string
  title: string
  description: string
  status: ProjectStatus
  startDate: string
  endDate: string
  budget: number
  hoursLogged: number
  progress: number
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  dueDate: string
  createdAt: string
}

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  rate: number
  total: number
}

export interface Invoice {
  id: string
  clientId: string
  clientName: string
  projectId: string
  projectTitle: string
  invoiceNumber: string
  status: InvoiceStatus
  lineItems: InvoiceLineItem[]
  subtotal: number
  tax: number
  total: number
  dueDate: string
  paidAt?: string
  notes: string
  createdAt: string
}

export interface ProposalLineItem {
  id: string
  description: string
  quantity: number
  rate: number
  total: number
}

export interface Proposal {
  id: string
  clientId: string
  clientName: string
  title: string
  status: ProposalStatus
  lineItems: ProposalLineItem[]
  total: number
  intro: string
  terms: string
  sentAt?: string
  createdAt: string
}

export interface Contract {
  id: string
  clientId: string
  clientName: string
  projectId?: string
  title: string
  status: ContractStatus
  content: string
  signedAt?: string
  createdAt: string
}

export interface TimeEntry {
  id: string
  projectId: string
  projectTitle: string
  clientName: string
  description: string
  hours: number
  hourlyRate: number
  date: string
  createdAt: string
}

export interface Expense {
  id: string
  projectId?: string
  description: string
  amount: number
  category: string
  date: string
  createdAt: string
}

export interface Message {
  id: string
  clientId: string
  sender: MessageSender
  body: string
  readAt?: string
  createdAt: string
}

export interface Conversation {
  clientId: string
  clientName: string
  clientCompany: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  messages: Message[]
}
