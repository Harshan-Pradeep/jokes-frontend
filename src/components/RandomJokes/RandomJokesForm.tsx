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
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Joke Type:</label>
            <select
                className="border p-2 rounded w-full"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">All Types</option>
                {jokeTypes.map((type: JokeType) => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
            <button
                className="bg-blue-500 text-white p-2 rounded mt-4"
                onClick={handleFetchJoke}
            >
                Get Random Joke
            </button>
        </div>
    );
}