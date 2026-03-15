import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
     
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-car.jpg" 
          alt="Rental Car Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-4 pb-20 md:pb-32">

        <h1 className="text-white text-4xl md:text-6xl lg:text-[72px] font-bold mb-4 tracking-tight leading-[1.2]">
          Find your perfect rental car
        </h1>
        
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl font-light">
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link
          href="/catalog"
          className="px-12 py-4 bg-[#3470FF] text-white text-base font-semibold rounded-xl hover:bg-[#0B44ED] transition-all duration-300 transform hover:scale-105"
        >
          View Catalog
        </Link>
      </div>
    </main>
  );
}