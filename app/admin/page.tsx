import React from 'react'
import Navbar from '@/components/Navbar'
import { getProperties, getUsersWithRoles } from './actions'
import PropertiesTable from './components/PropertiesTable'
import UserRolesTable from './components/UserRolesTable'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard | Luxe Estate',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch properties and users
  const [properties, users] = await Promise.all([
    getProperties(),
    getUsersWithRoles(),
  ])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#070b14] py-20 px-4 sm:px-6 lg:px-8 bg-[url('/img/grid-pattern.svg')] bg-opacity-20 z-0">
        {/* Dynamic glow effect */}
      <div className="fixed top-20 right-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[150px] -z-10 pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px] -z-10 pointer-events-none mix-blend-screen" />

      <main className="max-w-7xl mx-auto space-y-16">
        <header className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage properties and users across the Luxe Estate platform.
          </p>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-sm inline-block"></span>
              User Roles Management
            </h2>
          </div>
          <UserRolesTable users={users || []} />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-sm inline-block"></span>
              Properties Overview
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 bg-white/5 py-1 px-3 rounded-full border border-white/10 hidden sm:inline-block">
                Total: {properties?.length || 0}
              </span>
              <Link 
                href="/admin/properties/new" 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20"
              >
                + Añadir Propiedad
              </Link>
            </div>
          </div>
          <PropertiesTable properties={properties || []} />
        </section>
      </main>
    </div>
    </>
  )
}
