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
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Random Jokes</h1>
                <RandomJokesForm setJoke={setJoke} />
                {joke && <RandomJokesDisplay joke={joke} />}
            </div>
        </>
    );
}