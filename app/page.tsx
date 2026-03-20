import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedCollections from "../components/FeaturedCollections";
import NewInMarket from "../components/NewInMarket";
import {
  getNewInMarketProperties,
  getFeaturedProperties,
} from "../lib/properties";

const PAGE_SIZE = 6;

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? 1));

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
