'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { LoginForm } from '@/components/ModeratorJokes/LoginForm';
import { JokeCard } from '@/components/ModeratorJokes/JokeCard';
import { Pagination } from '@/components/ModeratorJokes/Pagination';
import { authenticate } from '@/app/services/authService';
import {
    fetchPendingJokes,
    approveJoke as approveJokeService,
    rejectJoke as rejectJokeService,
    updateJoke as updateJokeService,
    createJokeType
} from '@/app/services/jokeService';
import { Joke, JokeType } from '@/app/types/jokeTypes';

const ITEMS_PER_PAGE = 5;

export default function ModeratorJokesPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [totalJokes, setTotalJokes] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);
    const [error, setError] = useState('');
    const [jokeTypeName, setJokeTypeName] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (email: string, password: string) => {
        try {
            await authenticate(email, password);
            setIsAuthenticated(true);
            setError('');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
            console.log(err);
        }
    };

    const refreshJokes = async () => {
        try {
            const data = await fetchPendingJokes(currentPage, ITEMS_PER_PAGE);
            setJokes(data.data.jokes);
            setTotalJokes(data.data.total);
        } catch (error) {
            console.error('Error fetching jokes:', error);
        }
    };

    const handleJokeContentChange = (jokeId: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedJokes = jokes.map(joke =>
            joke._id === jokeId ? { ...joke, content: e.target.value } : joke
        );
        setJokes(updatedJokes);
    };

    const handleJokeTypeChange = (jokeId: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedJokes = jokes.map(joke =>
            joke._id === jokeId ? { ...joke, type: e.target.value } : joke
        );
        setJokes(updatedJokes);
    };

    const handleApprove = (joke: Joke) => async () => {
        try {
            await approveJokeService(joke);
            await refreshJokes();
        } catch (error) {
            console.error('Error approving joke:', error);
        }
    };

    const handleReject = (jokeId: string) => async () => {
        try {
            await rejectJokeService(jokeId);
            await refreshJokes();
        } catch (error) {
            console.error('Error rejecting joke:', error);
        }
    };

    const handleUpdate = (joke: Joke) => async () => {
        try {
            await updateJokeService(joke);
            await refreshJokes();
        } catch (error) {
            console.error('Error updating joke:', error);
        }
    };

    const handleCreateJokeType = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createJokeType({ name: jokeTypeName });
            setMessage('Joke type created successfully!');
            setJokeTypeName('');
            const response = await fetch(`${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/api/v1/delivery/types`);
            const data = await response.json();
            if (data?.data) setJokeTypes(data.data);
        } catch (error) {
            console.error('Error creating joke type:', error);
            setMessage('Failed to create joke type. Please try again.');
        }
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/api/v1/delivery/types`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.data) setJokeTypes(data.data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            refreshJokes();
        }
    }, [isAuthenticated, currentPage]);

    if (!isAuthenticated) {
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center h-screen bg-gray-900">
                    <LoginForm onLogin={handleLogin} error={error} />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-900 min-h-screen">
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Moderator Dashboard</h1>

                    <>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                            <h2 className="text-xl font-semibold text-blue-400 mb-4 text-center">Create New Joke Type</h2>
                            <form onSubmit={handleCreateJokeType} className="space-y-4">
                                <input
                                    type="text"
                                    value={jokeTypeName}
                                    onChange={(e) => setJokeTypeName(e.target.value)}
                                    placeholder="Joke Type Name"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Create Joke Type
                                </button>
                            </form>
                            {message && <p className="text-center text-gray-400 mt-4">{message}</p>}
                        </div>
                    </>

                    <h2 className="text-xl font-semibold text-white mb-6 text-center">Pending Jokes</h2>

                    {jokes.length > 0 ? (
                        <div>
                            {jokes.map((joke) => (
                                <JokeCard
                                    key={joke._id}
                                    joke={joke}
                                    jokeTypes={jokeTypes}
                                    onContentChange={handleJokeContentChange(joke._id)}
                                    onTypeChange={handleJokeTypeChange(joke._id)}
                                    onApprove={handleApprove(joke)}
                                    onReject={handleReject(joke._id)}
                                    onUpdate={handleUpdate(joke)}
                                />
                            ))}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(totalJokes / ITEMS_PER_PAGE)}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    ) : (
                        <p className="text-white text-center">No jokes available.</p>
                    )}
                </div>
            </div>
        </>
    );
}
