'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProperties() {
  const supabase = await createClient()

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties', error)
    return []
  }

  return properties
}

export async function getUsersWithRoles() {
  const supabase = await createClient()

  const { data: users, error } = await supabase.rpc('get_users_with_roles')

  if (error) {
    console.error('Error fetching users with roles', error)
    return []
  }

  return users
}

export async function updateUserRole(userId: string, newRole: string) {
  const supabase = await createClient()

  const { error } = await supabase.rpc('update_user_role', {
    target_user_id: userId,
    new_role: newRole,
  })

  if (error) {
    console.error('Error updating user role', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}
