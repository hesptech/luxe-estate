import Link from "next/link";
import { Property } from "../lib/properties";
import PropertyCard from "./PropertyCard";

interface NewInMarketProps {
  properties: Property[];
  page: number;
  totalPages: number;
}

export default function NewInMarket({ properties, page, totalPages }: NewInMarketProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">New in Market</h2>
          <p className="text-nordic-muted mt-1 text-sm">Fresh opportunities added this week.</p>
        </div>
        <div className="hidden md:flex bg-white p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">All</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">Buy</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">Rent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-4">
        {hasPrev ? (
          <Link
            href={`?page=${page - 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md"
          >
            <span className="material-icons text-sm">arrow_back</span>
            Previous
          </Link>
        ) : (
          <span className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg cursor-not-allowed">
            <span className="material-icons text-sm">arrow_back</span>
            Previous
          </span>
        )}

        <span className="text-sm text-nordic-muted font-medium">
          Page {page} of {totalPages}
        </span>

        {hasNext ? (
          <Link
            href={`?page=${page + 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md"
          >
            Next
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg cursor-not-allowed">
            Next
            <span className="material-icons text-sm">arrow_forward</span>
          </span>
        )}
      </div>
    </section>
  );
}
