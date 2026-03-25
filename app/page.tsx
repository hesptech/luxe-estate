import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedCollections from "../components/FeaturedCollections";
import NewInMarket from "../components/NewInMarket";
import SearchResults from "../components/SearchResults";
import {
  getNewInMarketProperties,
  getFeaturedProperties,
  searchProperties,
} from "../lib/properties";

const PAGE_SIZE = 6;

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? 1));

  const query = typeof params?.query === 'string' ? params.query : undefined;
  const minPrice = typeof params?.minPrice === 'string' ? Number(params.minPrice) : undefined;
  const maxPrice = typeof params?.maxPrice === 'string' ? Number(params.maxPrice) : undefined;
  const type = typeof params?.type === 'string' ? params.type : undefined;
  const beds = typeof params?.beds === 'string' ? Number(params.beds) : undefined;
  const baths = typeof params?.baths === 'string' ? Number(params.baths) : undefined;
  const amenitiesParam = typeof params?.amenities === 'string' ? params.amenities : undefined;
  const amenities = amenitiesParam ? amenitiesParam.split(',') : undefined;

  const isSearchActive = !!(query || minPrice || maxPrice || type || beds || baths || amenities);

  if (isSearchActive) {
    const { data: searchResults, count } = await searchProperties(
      { query, minPrice, maxPrice, type, beds, baths, amenities },
      page,
      PAGE_SIZE
    );
    const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    
    // We need to pass the base search params ignoring 'page' to SearchResults for pagination
    const baseParams = new URLSearchParams();
    if (query) baseParams.set('query', query);
    if (minPrice) baseParams.set('minPrice', minPrice.toString());
    if (maxPrice) baseParams.set('maxPrice', maxPrice.toString());
    if (type) baseParams.set('type', type);
    if (beds) baseParams.set('beds', beds.toString());
    if (baths) baseParams.set('baths', baths.toString());
    if (amenitiesParam) baseParams.set('amenities', amenitiesParam);

    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <HeroSection />
          <SearchResults 
            properties={searchResults} 
            page={page} 
            totalPages={totalPages} 
            count={count} 
            searchParamsStr={baseParams.toString()} 
          />
        </main>
      </>
    );
  }

  const [{ data: newInMarket, count }, featured] = await Promise.all([
    getNewInMarketProperties(page, PAGE_SIZE),
    getFeaturedProperties(),
  ]);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSection />
        <FeaturedCollections properties={featured} />
        <NewInMarket properties={newInMarket} page={page} totalPages={totalPages} />
      </main>
    </>
  );
}
