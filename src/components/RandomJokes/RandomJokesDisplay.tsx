'use client';

import { Joke } from "@/app/types/jokeTypes";

type RandomJokesDisplayProps = {
    joke: Joke;
};

export default function RandomJokesDisplay({ joke }: RandomJokesDisplayProps) {
    return (
        <div className="mt-6 p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Here&apos;s Your Joke:</h2>
            <p className="text-lg text-white mb-2">{joke.content}</p>
            <p className="text-sm text-gray-400">Type: {joke.type}</p>
            <p className="text-sm text-gray-400">Author: {joke.author}</p>
        </div>
    );
}
