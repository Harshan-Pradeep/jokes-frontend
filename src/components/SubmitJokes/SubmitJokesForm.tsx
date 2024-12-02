'use client';

import { useFetchJokeTypes } from '@/app/hooks/useFetchJokeTypes';
import { submitJoke } from '@/app/services/jokeService';
import { JokeType } from '@/app/types/jokeTypes';
import { useState } from 'react';

export default function SubmitJokesForm() {
    const [selectedType, setSelectedType] = useState('');
    const [jokeContent, setJokeContent] = useState('');
    const { jokeTypes } = useFetchJokeTypes();

    const handleSubmitJoke = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType) {
            alert('Please select a joke type from the list.');
            return;
        }

        try {
            await submitJoke({ type: selectedType, content: jokeContent });
            alert('Joke submitted successfully!');
            setJokeContent('');
            setSelectedType('');
        } catch (err) {
            console.error('Error submitting joke:', err);
            alert('Failed to submit joke. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmitJoke} className="p-8 bg-gray-900 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="mb-6">
                <label className="block text-lg font-semibold text-blue-400 mb-4">Select Joke Type:</label>
                <select
                    className="border border-gray-700 p-3 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    required
                >
                    <option value="" style={{ color: 'black' }}>Select a Type</option>
                    {jokeTypes.map((type: JokeType) => (
                        <option key={type.id} value={type.name} style={{ color: 'black' }}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-6">
                <label className="block text-lg font-semibold text-blue-400 mb-4">Joke Content:</label>
                <textarea
                    className="border border-gray-700 p-3 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={jokeContent}
                    onChange={(e) => setJokeContent(e.target.value)}
                    placeholder="Write your joke here..."
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 w-full rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Submit Joke
            </button>
        </form>
    );
}
