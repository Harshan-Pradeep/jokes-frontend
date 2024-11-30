import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Jokes App</h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore, moderate, and submit jokes with ease!
        </p>
      </header>
      
      <main className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Random Jokes */}
        <Link href="/random-jokes">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Random Jokes</h2>
            <p className="text-gray-600 mt-2">
              Get a random joke from various categories.
            </p>
          </div>
        </Link>

        {/* Moderator Jokes */}
        <Link href="/moderator-jokes">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Moderator Jokes</h2>
            <p className="text-gray-600 mt-2">
              Login to moderate submitted jokes.
            </p>
          </div>
        </Link>

        {/* Submit Jokes */}
        <Link href="/submit-jokes">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Submit Jokes</h2>
            <p className="text-gray-600 mt-2">
              Submit your jokes to be featured.
            </p>
          </div>
        </Link>
      </main>

      <footer className="mt-16 text-gray-500">
        Built with ❤️ using <a href="https://nextjs.org" className="text-blue-500 hover:underline">Next.js</a>
      </footer>
    </div>
  );
}
