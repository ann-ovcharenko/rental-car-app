'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 h-20 flex items-center">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#121417]">
          Rental<span className="text-[#3470FF]">Car</span>
        </Link>
        
        <nav className="flex gap-8">
          <Link 
            href="/" 
            className={`text-base font-medium transition-colors ${
              isActive('/') ? 'text-[#3470FF]' : 'text-[#121417] hover:text-[#3470FF]'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/catalog" 
            className={`text-base font-medium transition-colors ${
              isActive('/catalog') ? 'text-[#3470FF]' : 'text-[#121417] hover:text-[#3470FF]'
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};