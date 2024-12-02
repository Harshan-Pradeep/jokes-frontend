'use client';

import { useFetchJokeTypes } from '@/app/hooks/useFetchJokeTypes';
import { fetchRandomJoke } from '@/app/services/jokeService';
import { Joke, JokeType } from '@/app/types/jokeTypes';
import { useEffect, useState } from 'react';

type RandomJokesFormProps = {
    setJoke: (joke: Joke) => void;
};

export default function RandomJokesForm({ setJoke }: RandomJokesFormProps) {
    const [selectedType, setSelectedType] = useState<string>('');
    const { jokeTypes } = useFetchJokeTypes();

    const handleFetchJoke = async () => {
        try {
            const joke = await fetchRandomJoke(selectedType);
            setJoke(joke);
        } catch (err) {
            console.error('Error fetching random joke:', err);
        }
    };

    return (
        <div className="mb-4 p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
            <label className="block text-lg font-semibold mb-4">Select Joke Type:</label>
            <select
                className="border border-gray-700 p-3 rounded-lg w-full mb-4 bg-gray-800 text-white focus:outline-none focus:border-blue-400"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="" style={{ color: 'black' }}>All Types</option>
                {jokeTypes.map((type: JokeType) => (
                    <option key={type.id} value={type.name} style={{ color: 'black' }}>
                        {type.name}
                    </option>
                ))}
            </select>
            <button
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={handleFetchJoke}
            >
                Get Random Joke
            </button>
        </div>
    );
}
