import Hero from "./components/Hero";
import BrandLogos from "./components/BrandLogos";
import FeaturedCars from "./components/FeaturedCars";
import WhyChooseUs from "./components/WhyChooseUs";
import AboutUs from "./components/AboutUs";
import FAQSection from "./components/FAQSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <div className="pt-24 md:pt-28">
          <BrandLogos />
          <FeaturedCars />
          <WhyChooseUs />
          <AboutUs />
          <FAQSection />
        </div>
      
      </main>
    </div>
  );
}
