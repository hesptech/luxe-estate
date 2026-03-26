"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchFiltersModal from "./SearchFiltersModal";

interface HeroSearchProps {
  translations: {
    searchPlaceholder: string;
    searchButton: string;
  };
}

export default function HeroSearch({ translations }: HeroSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";
  const currentType = searchParams.get("type");

  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }
    
    // reset pagination on new search
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  const handleTypeSelect = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "All") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  const propertyTypes = ["All", "House", "Apartment", "Villa", "Penthouse"];

  return (
    <>
      <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">search</span>
        </div>
        <input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg" 
          placeholder={translations.searchPlaceholder}
          type="text" 
        />
        <button 
          type="submit"
          className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20"
        >
          {translations.searchButton}
        </button>
      </form>

      <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4 mt-8">
        {propertyTypes.map((type) => {
          const isActive = type === "All" ? !currentType : currentType === type;
          return (
            <button 
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 transform hover:-translate-y-0.5" 
                  : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
              }`}
            >
              {type}
            </button>
          );
        })}
        <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
        <button 
          onClick={() => setIsFiltersModalOpen(true)}
          className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors"
        >
          <span className="material-icons text-base">tune</span> Filters
        </button>
      </div>

      <SearchFiltersModal 
        isOpen={isFiltersModalOpen} 
        onClose={() => setIsFiltersModalOpen(false)} 
      />
    </>
  );
}
