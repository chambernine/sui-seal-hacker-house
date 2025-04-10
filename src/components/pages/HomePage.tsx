import { HeroSection } from "../sections/HeroSection";
import { LandingPage } from "../LandingPage";

export function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured NFTs</h2>
        <LandingPage />
      </section>
    </div>
  );
}
