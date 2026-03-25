import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import PropertyMapClient from "../../../components/PropertyMapClient";
import { getPropertyBySlug, getAllPropertySlugs } from "../../../lib/properties";



interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR with revalidation tag — per best-practices.md: conjugar velocidad y datos recientes
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property not found — LuxeEstate" };

  const primaryImage = property.images?.[0] ?? property.image_url;

  return {
    title: `${property.title} — ${property.location} | LuxeEstate`,
    description: property.description ?? `${property.beds} beds, ${property.baths} baths in ${property.location}. ${property.currency}${property.price.toLocaleString()}.`,
    openGraph: {
      title: `${property.title} | LuxeEstate`,
      description: `${property.currency}${property.price.toLocaleString()} · ${property.beds} bed · ${property.baths} bath · ${property.location}`,
      images: [{ url: primaryImage, width: 1200, height: 630, alt: property.image_alt }],
    },
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const isSale = property.type === "SALE";
  const allImages = property.images?.length ? property.images : [property.image_url];
  const monthlyEstimate = isSale
    ? Math.round((property.price * 0.8) / 360)
    : property.price;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-nordic-dark/50 mb-6">
          <Link href="/" className="hover:text-mosque transition-colors">Home</Link>
          <span>/</span>
          <span className="text-nordic-dark/80 truncate">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

          {/* ─── Left column: image gallery ─── */}
          <div className="lg:col-span-8 space-y-4">

            {/* Main hero image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
              <img
                alt={property.image_alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={allImages[0]}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.label && (
                  <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {property.label}
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur text-nordic-dark text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  For {property.type}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/90 hover:bg-white rounded-full text-nordic-dark shadow transition-all">
                  <span className="material-icons text-lg">favorite_border</span>
                </button>
                <button className="p-2 bg-white/90 hover:bg-white rounded-full text-nordic-dark shadow transition-all">
                  <span className="material-icons text-lg">share</span>
                </button>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic-dark px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                <span className="material-icons text-sm">grid_view</span>
                View All Photos
              </button>
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all ${
                      idx === 0
                        ? "ring-2 ring-mosque ring-offset-2 ring-offset-background-light"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      alt={`${property.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                      src={img}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Right column: price card + map ─── */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">

              {/* Price & agent card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-mosque/5">

                {/* Price + location */}
                <div className="mb-4">
                  <h1 className="text-4xl font-light text-nordic-dark mb-2">
                    {property.currency}{property.price.toLocaleString()}
                    {!isSale && <span className="text-lg text-nordic-dark/50">/mo</span>}
                  </h1>
                  <p className="text-nordic-dark/60 font-medium flex items-center gap-1">
                    <span className="material-icons text-mosque text-sm">location_on</span>
                    {property.location}
                  </p>
                </div>

                <div className="h-px bg-slate-100 my-5"></div>

                {/* Agent */}
                <div className="flex items-center gap-4 mb-6">
                  {property.agent_image_url && (
                    <img
                      alt={property.agent_name ?? "Agent"}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                      src={property.agent_image_url}
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-nordic-dark">{property.agent_name ?? "LuxeEstate Agent"}</h3>
                    <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                      <span className="material-icons text-[14px]">star</span>
                      <span>{property.agent_title ?? "Verified Agent"}</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-sm">chat</span>
                    </button>
                    <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-sm">call</span>
                    </button>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-mosque hover:bg-mosque/90 text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group">
                    <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
                    Schedule Visit
                  </button>
                  <button className="w-full bg-transparent border border-nordic-dark/10 hover:border-mosque text-nordic-dark/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <span className="material-icons text-xl">mail_outline</span>
                    Contact Agent
                  </button>
                </div>
              </div>

              {/* Map */}
              {property.latitude && property.longitude ? (
                <div className="bg-white p-2 rounded-xl shadow-sm border border-mosque/5">
                  <div className="relative w-full" style={{ minHeight: "220px" }}>
                    <PropertyMapClient
                      latitude={property.latitude}
                      longitude={property.longitude}
                      title={property.title}
                      location={property.location}
                    />
                  </div>
                </div>
              ) : null}

            </div>
          </div>

          {/* ─── Bottom-left: details sections ─── */}
          <div className="lg:col-span-8 lg:row-start-2 space-y-6">

            {/* Property Features */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
              <h2 className="text-lg font-semibold mb-6 text-nordic-dark">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "square_foot", value: property.area_sq_m.toLocaleString(), label: "Square Meters" },
                  { icon: "bed", value: property.beds, label: "Bedrooms" },
                  { icon: "shower", value: property.baths, label: "Bathrooms" },
                  { icon: "directions_car", value: property.garage ?? 0, label: "Garage" },
                ].map(({ icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                    <span className="material-icons text-mosque text-2xl mb-2">{icon}</span>
                    <span className="text-xl font-bold text-nordic-dark">{value}</span>
                    <span className="text-xs uppercase tracking-wider text-nordic-dark/50 text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About this home */}
            {property.description && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
                <h2 className="text-lg font-semibold mb-4 text-nordic-dark">About this home</h2>
                <div className="text-nordic-dark/70 leading-relaxed">
                  <p>{property.description}</p>
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
                <h2 className="text-lg font-semibold mb-6 text-nordic-dark">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 text-nordic-dark/70">
                      <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mortgage estimate */}
            {isSale && (
              <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full text-mosque shadow-sm">
                    <span className="material-icons">calculate</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nordic-dark">Estimated Payment</h3>
                    <p className="text-sm text-nordic-dark/60">
                      Starting from{" "}
                      <strong className="text-mosque">
                        {property.currency}{monthlyEstimate.toLocaleString()}/mo
                      </strong>{" "}
                      with 20% down
                    </p>
                  </div>
                </div>
                <button className="whitespace-nowrap px-4 py-2 bg-white border border-nordic-dark/10 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic-dark">
                  Calculate Mortgage
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-nordic-dark/50">© 2025 LuxeEstate Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a className="text-nordic-dark/40 hover:text-mosque transition-colors" href="#">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
              </svg>
            </a>
            <a className="text-nordic-dark/40 hover:text-mosque transition-colors" href="#">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
