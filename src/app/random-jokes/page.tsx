'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

type JokeType = { id: number; name: string };
type Joke = { id: number; type: string; content: string };

export default function RandomJokesPage() {
    const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [joke, setJoke] = useState<Joke | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/types`)
            .then((res) => res.json())
            .then((data) => {
                // Extract the `data` field from the response
                if (data && data.data) {
                    setJokeTypes(data.data);
                } else {
                    console.error('Invalid API response:', data);
                }
            })
            .catch((err) => console.error('Error fetching joke types:', err));
    }, []);

    const fetchRandomJoke = () => {
        fetch(
            `${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/random${selectedType ? `?type=${selectedType}` : ''
            }`
        )
            .then((res) => res.json())
            .then((data) => setJoke(data.data))
            .catch((err) => console.error('Error fetching random joke:', err));
    };
    console.log("fetchRandomJoke", joke)
    return (
        <>
            <Navbar />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Random Jokes</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Joke Type:</label>
                    <select
                        className="border p-2 rounded w-full"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        {jokeTypes.map((type) => (
                            <option key={type.id} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={fetchRandomJoke}
                >
                    Get Random Joke
                </button>
                {joke && (
                    <div className="mt-4 p-4 border rounded">
                        <h2 className="text-lg font-bold">Joke:</h2>
                        <p>{joke.content}</p>
                        <p className="text-sm text-gray-500">Type: {joke.type}</p>
                    </div>
                )}
            </div>
        </>

    );
}
