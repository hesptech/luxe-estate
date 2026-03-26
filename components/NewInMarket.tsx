import Link from "next/link";
import { cookies } from 'next/headers';
import { Property } from "../lib/properties";
import PropertyCard from "./PropertyCard";
import { getDictionary, getLocaleFromCookie } from "../i18n/getDictionary";

interface NewInMarketProps {
  properties: Property[];
  page: number;
  totalPages: number;
}

export default async function NewInMarket({ properties, page, totalPages }: NewInMarketProps) {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.get('NEXT_LOCALE')?.value);
  const dict = await getDictionary(locale);
  const { title, subtitle, filters, pagination } = dict.newInMarket;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">{title}</h2>
          <p className="text-nordic-muted mt-1 text-sm">{subtitle}</p>
        </div>
        <div className="hidden md:flex bg-white p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">{filters.all}</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">{filters.buy}</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">{filters.rent}</button>
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
            {pagination.previous}
          </Link>
        ) : (
          <span className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg cursor-not-allowed">
            <span className="material-icons text-sm">arrow_back</span>
            {pagination.previous}
          </span>
        )}

        <span className="text-sm text-nordic-muted font-medium">
          {pagination.pageOf.replace('{page}', page.toString()).replace('{totalPages}', totalPages.toString())}
        </span>

        {hasNext ? (
          <Link
            href={`?page=${page + 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md"
          >
            {pagination.next}
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 px-6 py-3 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg cursor-not-allowed">
            {pagination.next}
            <span className="material-icons text-sm">arrow_forward</span>
          </span>
        )}
      </div>
    </section>
  );
}
