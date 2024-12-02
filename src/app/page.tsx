import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-white">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-blue-400">Jokes App</h1>
        <p className="mt-4 text-xl text-gray-400">
          Explore, moderate, and submit jokes with ease!
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-6xl w-full">
        {/* Random Jokes */}
        <Link href="/random-jokes">
          <div className="p-8 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center bg-gray-800">
            <h2 className="text-2xl font-semibold text-blue-300">Random Jokes</h2>
            <p className="text-gray-400 mt-4">
              Get a random joke from various types
            </p>
          </div>
        </Link>

        {/* Moderator Jokes */}
        <Link href="/moderator-jokes">
          <div className="p-8 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center bg-gray-800">
            <h2 className="text-2xl font-semibold text-blue-300">Moderator Jokes</h2>
            <p className="text-gray-400 mt-4">
              Login to moderate submitted jokes
            </p>
          </div>
        </Link>

        {/* Submit Jokes */}
        <Link href="/submit-jokes">
          <div className="p-8 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center bg-gray-800">
            <h2 className="text-2xl font-semibold text-blue-300">Submit Jokes</h2>
            <p className="text-gray-400 mt-4">
              Submit your jokes to be featured
            </p>
          </div>
        </Link>
      </main>
    </div>
  );
}
