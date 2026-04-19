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
