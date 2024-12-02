'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-500 transition-all duration-300 ease-in-out">
          Jokes App
        </Link>
        <div className="flex gap-8">
          <Link href="/" className="text-lg hover:text-blue-400 transition-all duration-300 ease-in-out">
            Home
          </Link>
          <Link href="/random-jokes" className="text-lg hover:text-blue-400 transition-all duration-300 ease-in-out">
            Random Jokes
          </Link>
          <Link href="/moderator-jokes" className="text-lg hover:text-blue-400 transition-all duration-300 ease-in-out">
            Moderator Jokes
          </Link>
          <Link href="/submit-jokes" className="text-lg hover:text-blue-400 transition-all duration-300 ease-in-out">
            Submit Jokes
          </Link>
        </div>
      </div>
    </nav>
  );
}
