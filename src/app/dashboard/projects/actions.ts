'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function addProject(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const title = (formData.get('title') as string)?.trim()
  const client_id = (formData.get('client_id') as string)?.trim() || null
  const description = (formData.get('description') as string)?.trim() || null
  const start_date = (formData.get('start_date') as string)?.trim() || null
  const end_date = (formData.get('end_date') as string)?.trim() || null
  const budgetRaw = (formData.get('budget') as string)?.trim()
  const budget = budgetRaw ? Number(budgetRaw) : null

  if (!title) {
    redirect('/dashboard/projects?error=Title+is+required')
  }

  if (!client_id) {
    redirect('/dashboard/projects?error=Client+is+required')
  }

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    title,
    client_id,
    description,
    start_date,
    end_date,
    budget,
    status: 'active',
    progress: 0,
  })

  if (error) {
    redirect(`/dashboard/projects?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard/projects')
  redirect('/dashboard/projects')
}
