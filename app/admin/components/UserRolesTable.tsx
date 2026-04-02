'use client'

import React, { useState } from 'react'
import { updateUserRole } from '../actions'

type User = {
  id: string
  email: string
  role: string
}

export default function UserRolesTable({ users }: { users: User[] }) {
  const [localUsers, setLocalUsers] = useState<User[]>(users)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoadingId(userId)
    const { success, error } = await updateUserRole(userId, newRole)
    if (success) {
      setLocalUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } else {
      alert(`Failed to update role: ${error}`)
    }
    setLoadingId(null)
  }

  return (
    <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl border border-white/10 mt-6 shadow-2xl">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-white/5 text-gray-400 uppercase text-xs uppercase border-b border-white/10">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Email</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">ID</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Role</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {localUsers.map((user) => (
            <tr key={user.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 font-medium text-white">{user.email}</td>
              <td className="px-6 py-4 font-mono text-xs text-gray-500">{user.id}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <select
                  disabled={loadingId === user.id}
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="bg-black/40 border border-white/20 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50 appearance-none text-center"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
