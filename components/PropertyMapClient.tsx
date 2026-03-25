"use client";

import dynamic from "next/dynamic";

// This client component handles the dynamic import of Leaflet (no SSR)
// per best-practices.md: "Componentes pesados (Mapas): Usar next/dynamic({ ssr: false })"
const PropertyMapLeaflet = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[220px] bg-slate-100 rounded-lg flex items-center justify-center">
      <span className="text-nordic-dark/40 text-sm">Loading map...</span>
    </div>
  ),
});

interface PropertyMapClientProps {
  latitude: number;
  longitude: number;
  title: string;
  location: string;
}

export default function PropertyMapClient(props: PropertyMapClientProps) {
  return <PropertyMapLeaflet {...props} />;
}
