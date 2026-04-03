'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { saveProperty } from '../properties/actions'
import Link from 'next/link'

export default function PropertyForm({ initialData, isNew }: { initialData?: any, isNew: boolean }) {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    price: initialData?.price || '',
    type: initialData?.type || 'SALE', // Note: mapped to DB 'type' constraint (SALE/RENT)
    category: initialData?.category || 'apartment',
    status: initialData?.status || 'available',
    description: initialData?.description || '',
    location: initialData?.location || '',
    area_sq_m: initialData?.area_sq_m || '',
    year_built: initialData?.year_built || '',
    beds: initialData?.beds || 3,
    baths: initialData?.baths || 2,
    garage: initialData?.garage || 1,
    amenities: initialData?.amenities || ['Garden'],
    images: initialData?.images || [],
    is_draft: initialData?.is_draft || false,
    currency: initialData?.currency || '$'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleNumberChange = (id: string, increment: number) => {
    setFormData(prev => {
      const val = parseInt(prev[id as keyof typeof prev] as string) || 0
      return { ...prev, [id]: Math.max(0, val + increment) }
    })
  }

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => {
      const current = prev.amenities
      if (current.includes(amenity)) {
        return { ...prev, amenities: current.filter((a: string) => a !== amenity) }
      } else {
        return { ...prev, amenities: [...current, amenity] }
      }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploading(true)
    setErrorMsg('')
    
    const files = Array.from(e.target.files)
    const newImages: string[] = []

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) continue // Skip > 5MB
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file)
        
      if (error) {
        console.error('Upload Error:', error)
        setErrorMsg('Failed to upload some images.')
        continue
      }
      
      if (data) {
        const { data: publicUrlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(data.path)
        if (publicUrlData) newImages.push(publicUrlData.publicUrl)
      }
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
    setUploading(false)
  }

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: string, idx: number) => idx !== indexToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    try {
      const dataToSave = { ...formData, is_draft: isDraft }
      await saveProperty(dataToSave, isNew, initialData?.id)
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 relative z-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm text-gray-400 font-medium">
              <li><Link className="hover:text-emerald-400 transition-colors" href="/admin">Properties</Link></li>
              <li><span className="material-icons text-xs text-gray-600">chevron_right</span></li>
              <li aria-current="page" className="text-gray-200">{isNew ? 'Add New' : 'Edit Property'}</li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              {isNew ? 'Add New Property' : 'Edit Property'}
            </h1>
            <p className="text-base text-gray-400 max-w-2xl font-normal">
              Fill in the details below to {isNew ? 'create a new' : 'edit the'} listing. Fields marked with * are mandatory.
            </p>
            {errorMsg && <p className="text-red-400 mt-2">{errorMsg}</p>}
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 transition-colors font-medium text-sm"
          >
            Save Draft
          </button>
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <span className="material-icons text-sm">save</span>
            {loading ? 'Saving...' : 'Save Property'}
          </button>
        </div>
      </header>

      <form className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Basic Information */}
          <div className="bg-[#0b1424] rounded-xl shadow-lg shadow-black/20 border border-white/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <span className="material-icons text-lg">info</span>
              </div>
              <h2 className="text-xl font-bold text-white">Basic Information</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="title">
                  Property Title <span className="text-red-500">*</span>
                </label>
                <input 
                  id="title" value={formData.title} onChange={handleInputChange} required
                  className="w-full text-base px-4 py-2.5 rounded-md border border-white/10 bg-[#070b14] text-white placeholder-gray-600 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                  placeholder="e.g. Modern Penthouse with Ocean View" type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="price">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input 
                      id="price" value={formData.price} onChange={handleInputChange} required
                      className="w-full pl-7 pr-4 py-2.5 rounded-md border border-white/10 bg-[#070b14] text-white placeholder-gray-600 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base" 
                      placeholder="0.00" type="number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="type">Status</label>
                  <select 
                    id="type" value={formData.type} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-md border border-white/10 bg-[#070b14] text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base cursor-pointer"
                  >
                    <option value="SALE">For Sale</option>
                    <option value="RENT">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="category">Property Type</label>
                  <select 
                    id="category" value={formData.category} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-md border border-white/10 bg-[#070b14] text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base cursor-pointer"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#0b1424] rounded-xl shadow-lg shadow-black/20 border border-white/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <span className="material-icons text-lg">description</span>
              </div>
              <h2 className="text-xl font-bold text-white">Description</h2>
            </div>
            <div className="p-8">
              <textarea 
                id="description" value={formData.description} onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-white/10 bg-[#070b14] text-white placeholder-gray-600 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base leading-relaxed resize-y min-h-[200px]" 
                placeholder="Describe the property features, neighborhood, and unique selling points..."
              />
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-[#0b1424] rounded-xl shadow-lg shadow-black/20 border border-white/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <span className="material-icons text-lg">image</span>
                </div>
                <h2 className="text-xl font-bold text-white">Gallery</h2>
              </div>
              <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">JPG, PNG, WEBP</span>
            </div>
            
            <div className="p-8">
              <div className="relative border-2 border-dashed border-white/10 rounded-xl bg-white/[0.01] p-10 text-center hover:bg-white/[0.03] hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <input 
                  type="file" multiple accept="image/*"
                  ref={fileInputRef} onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 bg-[#070b14] rounded-full flex items-center justify-center shadow-sm text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-2xl">{uploading ? 'hourglass_empty' : 'cloud_upload'}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-white">{uploading ? 'Uploading...' : 'Click or drag images here'}</p>
                    <p className="text-xs text-gray-500">Max file size 5MB per image</p>
                  </div>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {formData.images.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden relative group shadow-sm">
                      <img src={img} alt={`Property image ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                        <button 
                          type="button" onClick={() => removeImage(idx)}
                          className="w-8 h-8 rounded-full bg-black/50 text-red-400 hover:bg-black/80 flex items-center justify-center transition-colors"
                        >
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </div>
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all group"
                  >
                    <span className="material-icons group-hover:scale-110 transition-transform">add</span>
                    <span className="text-xs mt-1 font-medium">Add More</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Location */}
          <div className="bg-[#0b1424] rounded-xl shadow-lg shadow-black/20 border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <span className="material-icons text-lg">place</span>
              </div>
              <h2 className="text-lg font-bold text-white">Location</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="location">Address</label>
                <input 
                  id="location" value={formData.location} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border border-white/10 bg-[#070b14] text-white placeholder-gray-600 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" 
                  placeholder="Street Address, City, Zip" type="text"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-[#0b1424] rounded-xl shadow-lg shadow-black/20 border border-white/5 overflow-hidden sticky top-24">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <span className="material-icons text-lg">straighten</span>
              </div>
              <h2 className="text-lg font-bold text-white">Details</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-xs text-gray-500 font-medium mb-1 block" htmlFor="area_sq_m">Area (m²)</label>
                  <input 
                    id="area_sq_m" value={formData.area_sq_m} onChange={handleInputChange}
                    className="w-full text-left px-3 py-2 rounded-md border border-white/10 bg-[#070b14] text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" 
                    placeholder="0" type="number"
                  />
                </div>
                <div className="group">
                  <label className="text-xs text-gray-500 font-medium mb-1 block" htmlFor="year_built">Year Built</label>
                  <input 
                    id="year_built" value={formData.year_built} onChange={handleInputChange}
                    className="w-full text-left px-3 py-2 rounded-md border border-white/10 bg-[#070b14] text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" 
                    placeholder="YYYY" type="number"
                  />
                </div>
              </div>
              
              <hr className="border-white/5" />
              
              <div className="space-y-4">
                {[
                  { id: 'beds', label: 'Bedrooms', icon: 'bed' },
                  { id: 'baths', label: 'Bathrooms', icon: 'shower' },
                  { id: 'garage', label: 'Parking', icon: 'directions_car' }
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                       <span className="material-icons text-gray-500 text-sm">{item.icon}</span> {item.label}
                    </label>
                    <div className="flex items-center border border-white/10 rounded-md overflow-hidden bg-[#070b14]">
                      <button 
                        type="button" onClick={() => handleNumberChange(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-gray-400 transition-colors border-r border-white/10"
                      >-</button>
                      <input 
                        className="w-10 text-center border-none bg-transparent text-white p-0 focus:ring-0 text-sm font-medium" 
                        readOnly type="text" value={formData[item.id as keyof typeof formData]} 
                      />
                      <button 
                        type="button" onClick={() => handleNumberChange(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-gray-400 transition-colors border-l border-white/10"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <hr className="border-white/5" />
              
              <div>
                <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Amenities</h3>
                <div className="space-y-2">
                  {['Swimming Pool', 'Garden', 'Air Conditioning', 'Smart Home', 'Balcony', 'Gym'].map(amenity => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="w-4 h-4 text-emerald-500 border-white/20 bg-[#070b14] rounded focus:ring-emerald-500 focus:ring-offset-[#0b1424]" 
                      />
                      <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Submit FAB */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#070b14] border-t border-white/10 shadow-xl md:hidden z-40 flex gap-3">
          <button 
            type="button" onClick={() => router.push('/admin')}
            className="flex-1 py-3 rounded-lg border border-white/10 bg-white/5 text-white font-medium text-sm"
          >
            Cancel
          </button>
          <button 
            type="button" onClick={(e) => handleSubmit(e, false)} disabled={loading}
            className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex justify-center items-center gap-2 shadow-lg shadow-emerald-500/20 text-sm"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </main>
  )
}
