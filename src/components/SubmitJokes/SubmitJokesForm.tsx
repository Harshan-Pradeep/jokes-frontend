'use client';

import { useFetchJokeTypes } from '@/app/hooks/useFetchJokeTypes';
import { submitJoke } from '@/app/services/jokeService';
import { JokeType } from '@/app/types/jokeTypes';
import { useEffect, useState } from 'react';


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
        <form onSubmit={handleSubmitJoke} className="p-4">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Joke Type:</label>
                <select
                    className="border p-2 rounded w-full"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    required
                >
                    <option value="">Select a Type</option>
                    {jokeTypes.map((type: JokeType) => (
                        <option key={type.id} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Joke Content:</label>
                <textarea
                    className="border p-2 rounded w-full"
                    value={jokeContent}
                    onChange={(e) => setJokeContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Submit Joke
            </button>
        </form>
    );
}