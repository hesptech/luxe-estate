import React from 'react'
import Navbar from '@/components/Navbar'
import PropertyForm from '@/app/admin/components/PropertyForm'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return {
    title: resolvedParams.id === 'new' ? 'Add Property | Luxe Estate' : 'Edit Property | Luxe Estate',
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const isNew = resolvedParams.id === 'new'
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let initialData = null

  if (!isNew) {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', resolvedParams.id)
      .single()
      
    if (error || !property) {
      redirect('/admin')
    }
    initialData = property
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#070b14] py-10 px-4 sm:px-6 lg:px-8 bg-[url('/img/grid-pattern.svg')] bg-opacity-20 z-0 relative">
        <div className="fixed top-20 right-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[150px] -z-10 pointer-events-none mix-blend-screen" />
        <div className="fixed bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px] -z-10 pointer-events-none mix-blend-screen" />
        
        <PropertyForm initialData={initialData} isNew={isNew} />
      </div>
    </>
  )
}
