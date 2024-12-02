'use client';

import { Joke, JokeType } from '@/app/types/jokeTypes';
import React from 'react';

interface JokeCardProps {
    joke: Joke;
    jokeTypes: JokeType[];
    onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onApprove: () => void;
    onReject: () => void;
    onUpdate: () => void;
}

export const JokeCard: React.FC<JokeCardProps> = ({
    joke,
    jokeTypes,
    onContentChange,
    onTypeChange,
    onApprove,
    onReject,
    onUpdate,
}) => (
    <div className="p-6 mb-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
        <textarea
            value={joke.content}
            onChange={onContentChange}
            className="border border-gray-700 p-3 w-full rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Edit joke content here..."
        />
        <select
            value={joke.type}
            onChange={onTypeChange}
            className="border border-gray-700 p-3 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
            {jokeTypes.map((type) => (
                <option key={type.id} value={type.name} style={{ color: 'black' }}>
                    {type.name}
                </option>
            ))}
        </select>

        <p className="text-sm text-gray-400 mb-4"><strong>Status:</strong> {joke.status}</p>
        <div className="flex gap-4 mt-4">
            <button
                onClick={onApprove}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Approve
            </button>
            <button
                onClick={onReject}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Reject
            </button>
            <button
                onClick={onUpdate}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Update
            </button>
        </div>
    </div>
);
