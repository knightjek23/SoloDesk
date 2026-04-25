'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function logTime(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const project_id = (formData.get('project_id') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const hoursRaw = formData.get('hours') as string
  const hourlyRateRaw = formData.get('hourly_rate') as string
  const entry_date = (formData.get('entry_date') as string)?.trim() || null

  const hours = hoursRaw ? parseFloat(hoursRaw) : null
  const hourly_rate = hourlyRateRaw ? parseFloat(hourlyRateRaw) : null

  if (!project_id) {
    redirect('/dashboard/time-tracker?error=Project+is+required')
  }

  if (!hours || hours <= 0) {
    redirect('/dashboard/time-tracker?error=Hours+must+be+greater+than+zero')
  }

  const { error } = await supabase.from('time_entries').insert({
    user_id: user.id,
    project_id,
    description,
    hours,
    hourly_rate,
    entry_date,
  })

  if (error) {
    redirect(`/dashboard/time-tracker?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard/time-tracker')
  redirect('/dashboard/time-tracker')
}

export async function deleteTimeEntry(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const id = formData.get('id') as string

  if (!id) {
    redirect('/dashboard/time-tracker?error=Missing+entry+id')
  }

  const { error } = await supabase
    .from('time_entries')
    .delete()
    .eq('id', id)

  if (error) {
    redirect(`/dashboard/time-tracker?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard/time-tracker')
  redirect('/dashboard/time-tracker')
}
