import CategoryTiles from "./_components/CategoryTiles";
import FAQ from "./_components/FAQ";
import Hero from "./_components/Hero";
import LifestyleVideo from "./_components/LifestyleVideo";
import Lookbook from "./_components/Lookbook";
import NewArrivals from "./_components/NewArrivals";
import ShopTheLook from "./_components/OutfitBuilder";
import StoreLocator from "./_components/StoreLocator";
import Sustainability from "./_components/Sustainability";
import Testimonials from "./_components/Testimonials";
import TrendingNow from "./_components/TrendingNow";

export default async function Home() {

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
            <Hero />
            <CategoryTiles />
            <NewArrivals />
            <TrendingNow />
            <LifestyleVideo />
            <ShopTheLook />
            <Lookbook />
            <Sustainability />
            <StoreLocator />
            <Testimonials />
            <FAQ />
        </div>
    );
}