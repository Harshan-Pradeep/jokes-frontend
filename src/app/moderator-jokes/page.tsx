'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

type Joke = {
    _id: string;
    content: string;
    type: string;
    status: string;
};
 
type PaginatedJokes = {
    jokes: Joke[];
    total: number;
};

type JokeType = { id: number; name: string };

export default function ModeratorJokesPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [totalJokes, setTotalJokes] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);
    const [error, setError] = useState('');

    const ITEMS_PER_PAGE = 5;

    // Authentication
    const authenticate = async (email: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setError('Invalid credentials. Please try again.');
                return;
            }

            const data = await response.json();
            setToken(data.token);
            setIsAuthenticated(true);
            setError('');
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred during login.');
        }
    };

    // Fetch joke types
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/api/v1/delivery/types`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setJokeTypes(data.data);
                } else {
                    console.error('Invalid API response:', data);
                }
            })
            .catch((err) => console.error('Error fetching joke types:', err));
    }, []);

    // Fetch Pending Jokes
    const fetchPendingJokes = async (page: number) => {
        if (!token) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/pending?page=${page}&limit=${ITEMS_PER_PAGE}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                console.error('Error fetching jokes:', await response.text());
                return;
            }

            const data: { data: PaginatedJokes } = await response.json();
            setJokes(data.data.jokes);
            setTotalJokes(data.data.total);
        } catch (err) {
            console.error('Error fetching jokes:', err);
        }
    };

    // Handle Page Change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchPendingJokes(newPage);
    };

    // Reject/Delete Joke
    const rejectJoke = async (id: string) => {
        if (!token) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/delete?id=${id}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                alert('Joke rejected successfully!');
                fetchPendingJokes(currentPage);
            } else {
                console.error('Error rejecting joke:', await response.text());
            }
        } catch (err) {
            console.error('Error rejecting joke:', err);
        }
    };

    // Approve/Update Joke
    const approveJoke = async (joke: Joke) => {
        if (!token) return;

        const updatedJoke = {
            content: joke.content,
            type: joke.type,
            status: 'approved',
            author: 'Moderator',
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/update?id=${joke._id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedJoke),
                }
            );

            if (response.ok) {
                alert('Joke approved successfully!');
                fetchPendingJokes(currentPage);
            } else {
                console.error('Error approving joke:', await response.text());
            }
        } catch (err) {
            console.error('Error approving joke:', err);
        }
    };

    // Update Joke
    const updateJoke = async (joke: Joke) => {
        if (!token) return;

        const updatedJoke = {
            content: joke.content,
            type: joke.type,
            status: joke.status, // Keep the current status
            author: 'Moderator',
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/update?id=${joke._id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedJoke),
                }
            );

            if (response.ok) {
                alert('Joke updated successfully!');
                fetchPendingJokes(currentPage);
            } else {
                console.error('Error updating joke:', await response.text());
            }
        } catch (err) {
            console.error('Error updating joke:', err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchPendingJokes(currentPage);
        }
    }, [isAuthenticated, currentPage]);

    if (!isAuthenticated) {
        return (
            <>
                <Navbar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Moderator Login</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = (e.target as any).email.value;
                            const password = (e.target as any).password.value;
                            authenticate(email, password);
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border p-2 rounded w-full"
                            required
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            Login
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Moderator Dashboard</h1>
                <h2 className="text-lg font-medium mb-4">Pending Jokes</h2>

                {jokes.length > 0 ? (
                    <div>
                        {jokes.map((joke) => (
                            <div key={joke._id} className="border p-4 mb-4 rounded">
                                <textarea
                                    value={joke.content}
                                    onChange={(e) => setJokes((prev) =>
                                        prev.map((j) => (j._id === joke._id ? { ...j, content: e.target.value } : j))
                                    )}
                                    className="border p-2 w-full rounded"
                                />
                                <select
                                    value={joke.type}
                                    onChange={(e) => setJokes((prev) =>
                                        prev.map((j) => (j._id === joke._id ? { ...j, type: e.target.value } : j))
                                    )}
                                    className="border p-2 rounded w-full mt-2"
                                >
                                    {jokeTypes.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>

                                <p><strong>Status:</strong> {joke.status}</p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => approveJoke(joke)}
                                        className="bg-green-500 p-2 text-white rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => rejectJoke(joke._id)}
                                        className="bg-red-500 p-2 text-white rounded"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => updateJoke(joke)}
                                        className="bg-yellow-500 p-2 text-white rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {Math.ceil(totalJokes / ITEMS_PER_PAGE)}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(totalJokes / ITEMS_PER_PAGE)}
                                className={`p-2 rounded ${currentPage === Math.ceil(totalJokes / ITEMS_PER_PAGE)
                                    ? 'bg-gray-300'
                                    : 'bg-blue-500 text-white'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>No jokes available.</p>
                )}
            </div>
        </>
    );
}
