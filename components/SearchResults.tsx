import Link from "next/link";
import { Property } from "../lib/properties";
import PropertyCard from "./PropertyCard";

interface SearchResultsProps {
  properties: Property[];
  page: number;
  totalPages: number;
  count: number;
  searchParamsStr: string;
}

export default function SearchResults({ properties, page, totalPages, count, searchParamsStr }: SearchResultsProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <section className="mt-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">Search Results</h2>
          <p className="text-nordic-muted mt-1 text-sm">Found {count} properties matching your criteria.</p>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-nordic-muted text-lg">No properties match your current search and filters.</p>
          <p className="mt-2 text-sm text-mosque">Try adjusting your filters or search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {properties.length > 0 && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          {hasPrev ? (
            <Link
              href={`?${searchParamsStr}&page=${page - 1}`}
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
              href={`?${searchParamsStr}&page=${page + 1}`}
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
      )}
    </section>
  );
}
