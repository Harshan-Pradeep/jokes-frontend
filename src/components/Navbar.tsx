'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold hover:underline">
          Jokes App
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/random-jokes" className="hover:underline">
            Random Jokes
          </Link>
          <Link href="/moderator-jokes" className="hover:underline">
            Moderator Jokes
          </Link>
          <Link href="/submit-jokes" className="hover:underline">
            Submit Jokes
          </Link>
        </div>
      </div>
    </nav>
  );
}
