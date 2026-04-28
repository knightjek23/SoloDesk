'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function addClient(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const name = (formData.get('name') as string)?.trim()
  const company = (formData.get('company') as string)?.trim() || null
  const email = (formData.get('email') as string)?.trim() || null
  const phone = (formData.get('phone') as string)?.trim() || null

  if (!name) {
    redirect('/dashboard/clients?error=Name+is+required')
  }

  const { error } = await supabase.from('clients').insert({
    user_id: user.id,
    name,
    company,
    email,
    phone,
  })

  if (error) {
    redirect(`/dashboard/clients?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}

import type { Database } from '@/types/database'

type ClientRow = Database['public']['Tables']['clients']['Update']

export async function updateClient(
  clientId: string,
  fields: { name?: string | null; company?: string | null; email?: string | null; phone?: string | null; address?: string | null; notes?: string | null }
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Name is required — don't allow blanking it
  if ('name' in fields && (!fields.name || !fields.name.trim())) {
    return { error: 'Name is required' }
  }

  // Build a properly typed update payload
  const update: ClientRow = {}
  if ('name' in fields && fields.name) update.name = fields.name.trim()
  if ('company' in fields) update.company = fields.company?.trim() || null
  if ('email' in fields) update.email = fields.email?.trim() || null
  if ('phone' in fields) update.phone = fields.phone?.trim() || null
  if ('address' in fields) update.address = fields.address?.trim() || null
  if ('notes' in fields) update.notes = fields.notes?.trim() || null

  const { error } = await supabase
    .from('clients')
    .update(update)
    .eq('id', clientId)

  if (error) return { error: error.message }

  revalidatePath(`/dashboard/clients/${clientId}`)
  revalidatePath('/dashboard/clients')
  return { error: null }
}

export async function deleteClient(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const clientId = formData.get('id') as string
  if (!clientId) redirect('/dashboard/clients?error=Missing+client+ID')

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId)

  if (error) {
    redirect(`/dashboard/clients/${clientId}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}
