'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveProperty(data: any, isNew: boolean, id?: string) {
  const supabase = await createClient()

  const { category, ...restData } = data

  // Ensure price, area, year_built, beds, etc. are numbers
  const payload = {
    ...restData,
    label: category,
    price: Number(data.price) || 0,
    area_sq_m: Number(data.area_sq_m) || 0,
    year_built: Number(data.year_built) || null,
    beds: Number(data.beds) || 0,
    baths: Number(data.baths) || 0,
    garage: Number(data.garage) || 0,
  }

  if (isNew) {
    const propertyId = crypto.randomUUID()
    const baseSlug = (payload.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const slug = `${baseSlug}-${propertyId.substring(0, 8)}`
    
    const payloadWithId = { ...payload, id: propertyId, slug }
    const { data: result, error } = await supabase
      .from('properties')
      .insert([payloadWithId])
      .select()
      .single()

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
    return result
  } else {
    if (!id) throw new Error('ID is required for updates')
    const { data: result, error } = await supabase
      .from('properties')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
    return result
  }
}
