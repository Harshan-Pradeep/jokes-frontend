'use client';

import Navbar from '@/components/Navbar';
import RandomJokesForm from '@/components/RandomJokes/RandomJokesForm';
import RandomJokesDisplay from '@/components/RandomJokes/RandomJokesDisplay';
import { useState } from 'react';
import { Joke } from '../types/jokeTypes';

export default function RandomJokesPage() {
    const [joke, setJoke] = useState<Joke | null>(null);

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-900 min-h-screen">
                <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Random Jokes</h1>
                    <RandomJokesForm setJoke={setJoke} />
                    {joke && (
                        <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow-md">
                            <RandomJokesDisplay joke={joke} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
