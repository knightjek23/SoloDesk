'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function addInvoice(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const invoice_number = (formData.get('invoice_number') as string)?.trim()
  const client_id = (formData.get('client_id') as string)?.trim()
  const project_id = (formData.get('project_id') as string)?.trim() || null
  const subtotal = parseFloat(formData.get('subtotal') as string) || 0
  const tax = parseFloat(formData.get('tax') as string) || 0
  const total = parseFloat(formData.get('total') as string) || subtotal + tax
  const due_date = (formData.get('due_date') as string)?.trim() || null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!invoice_number) {
    redirect('/dashboard/invoices?error=Invoice+number+is+required')
  }

  if (!client_id) {
    redirect('/dashboard/invoices?error=Client+is+required')
  }

  const { error } = await supabase.from('invoices').insert({
    user_id: user.id,
    invoice_number,
    client_id,
    project_id,
    subtotal,
    tax,
    total,
    due_date,
    notes,
    status: 'draft',
  })

  if (error) {
    redirect(`/dashboard/invoices?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
