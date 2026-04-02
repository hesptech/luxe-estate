'use client'

import React from 'react'

type Property = {
  id: string
  title: string
  location: string
  price: number
  currency: string
  type: string
  created_at: string
}

export default function PropertiesTable({ properties }: { properties: Property[] }) {
  return (
    <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl border border-white/10 mt-6 lg:col-span-2 shadow-2xl">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-white/5 text-gray-400 uppercase text-xs uppercase border-b border-white/10">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Title</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Location</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Type</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Price</th>
            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Added</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {properties.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No properties found.
              </td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr key={property.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{property.title}</td>
                <td className="px-6 py-4">{property.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${property.type === 'SALE' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {property.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-200">
                  {property.currency}{property.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(property.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
