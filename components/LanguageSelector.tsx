"use client";

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSelector({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = languages.find(l => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    Cookies.set('NEXT_LOCALE', code, { expires: 365, path: '/' });
    setIsOpen(false);
    router.refresh(); // Refresh to trigger a server re-render with the new cookie
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-nordic-dark hover:text-mosque transition-colors py-1 px-2 rounded-md hover:bg-gray-100"
      >
        <span className="text-lg leading-none">{selectedLang.flag}</span>
        <span className="text-sm font-medium uppercase">{selectedLang.code}</span>
        <span className="material-icons text-[1rem]">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-nordic-dark/10 overflow-hidden z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                  currentLang === lang.code 
                    ? 'bg-mosque/10 text-mosque font-medium' 
                    : 'text-nordic-dark hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
