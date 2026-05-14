"use client";

const brands = [
  { name: "BMW", logo: "/bmw.svg" },
  { name: "Mercedes-Benz", logo: "/mercedes.svg" },
  { name: "Audi", logo: "/audi.svg" },
  { name: "Porsche", logo: "/porsche.svg" },
  { name: "Tesla", logo: "/tesla.svg" },
  { name: "Lamborghini", logo: "/lamborghini.svg" },
  { name: "Ferrari", logo: "/ferrari.svg" },
  { name: "Bentley", logo: "/bentley.svg" },
  { name: "Rolls-Royce", logo: "/rollsroyce.svg" },
  { name: "Toyota", logo: "/toyota.svg" },
  { name: "Maserati", logo: "/maserati.svg" },
];

export default function BrandLogos() {
  return (
    <section className="relative py-16 bg-background border-y border-border overflow-x-hidden">
      {/* Section header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-2">
          Trusted by <span className="text-sky-400">Premium Brands</span>
        </h2>
        <p className="text-muted-foreground text-sm">Drive the world&apos;s finest automobiles</p>
      </div>

      {/* Marquee container - seamless infinite scroll */}
      <div className="relative overflow-hidden">
        <div 
          className="flex hover:[animation-play-state:paused]"
          style={{
            width: 'max-content',
            animation: 'scroll 30s linear infinite',
          }}
        >
          {/* First set of logos */}
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 mx-8 group"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer dark:bg-transparent bg-black/10 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless infinite loop */}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 mx-8 group"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer dark:bg-transparent bg-black/10 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
          {/* Third set for extra smoothness */}
          {brands.map((brand, index) => (
            <div
              key={`brand-3-${index}`}
              className="flex-shrink-0 mx-8 group"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer dark:bg-transparent bg-black/10 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}} />
    </section>
  );
}
