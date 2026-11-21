import { Helmet } from "react-helmet-async";
import Footer from "./components/footer";
import Hero from "./components/hero";
import LatestListings from "./components/latest-listings";
import Navbar from "./components/navbar";
import Reviews from "./components/reviews";
import SearchBar from "./components/search-bar";
import VideoSection from "./components/video-section";
import WeekendOffers from "./components/weekend-offers";
import WhyUs from "./components/why-us";

export default function HomePage() {
  return (
    <div className="kree-home min-h-screen bg-white text-[var(--kree-ink)]">
      <Helmet>
        <html lang="fr" />
        <title>Kree — Location maisons & véhicules en Tunisie</title>
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <LatestListings />
        <WhyUs />
        <VideoSection />
        <WeekendOffers />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
