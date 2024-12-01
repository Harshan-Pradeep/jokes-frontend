'use client';

import { Joke } from "@/app/types/jokeTypes";



type RandomJokesDisplayProps = {
    joke: Joke;
};

export default function RandomJokesDisplay({ joke }: RandomJokesDisplayProps) {
    return (
        <div className="mt-4 p-4 border rounded">
            <h2 className="text-lg font-bold">Joke:</h2>
            <p>{joke.content}</p>
            <p className="text-sm text-gray-500">Type: {joke.type}</p>
        </div>
    );
}