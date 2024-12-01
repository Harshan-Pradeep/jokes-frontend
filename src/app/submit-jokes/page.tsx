'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

type JokeType = { id: number; name: string };

export default function SubmitJokesPage() {
    const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);
    const [selectedType, setSelectedType] = useState('');
    const [jokeContent, setJokeContent] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SUBMIT_JOKES_API}/api/v1/jokes/types`)
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

    const submitJoke = (e: React.FormEvent) => {
        e.preventDefault();
        const newJoke = { type: selectedType, content: jokeContent };
    
        if (!selectedType) {
            alert('Please select a joke type from the list.');
            return;
        }
    
        fetch(`${process.env.NEXT_PUBLIC_SUBMIT_JOKES_API}/api/v1/jokes/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJoke),
        })
            .then((res) => {
                if (res.ok) {
                    alert('Joke submitted successfully!');
                    setJokeContent('');
                    setSelectedType('');
                } else {
                    // Parse the error response
                    return res.json().then(errorData => {
                        // Check if there are error messages in the response
                        if (errorData.message && Array.isArray(errorData.message)) {
                            // Join multiple error messages if there are any
                            alert(errorData.message.join('\n'));
                        } else {
                            // Fallback error message
                            alert('Failed to submit joke. Please try again.');
                        }
                    });
                }
            })
            .catch((err) => console.error('Error submitting joke:', err));
    };

    return (
        <>
            <Navbar />
            <form onSubmit={submitJoke} className="p-4">
                <h1 className="text-2xl font-bold mb-4">Submit a Joke</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Joke Type:</label>
                    <select
                        className="border p-2 rounded w-full"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        required
                    >
                        <option value="">Select a Type</option>
                        {jokeTypes.map((type) => (
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
        </>

    );
}
