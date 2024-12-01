import { Joke } from "../types/jokeTypes";


export async function fetchRandomJoke(type: string): Promise<Joke> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/api/v1/delivery/random${type ? `?type=${type}` : ''}`
    );
    const data = await response.json();
    return data.data;
}

export async function submitJoke(joke: { type: string; content: string }): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUBMIT_JOKES_API}/api/v1/jokes/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(joke),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message && Array.isArray(errorData.message)) {
            throw new Error(errorData.message.join('\n'));
        } else {
            throw new Error('Failed to submit joke. Please try again.');
        }
    }
}

export const fetchPendingJokes = async (page: number, limit: number) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/jokes/pending?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch jokes');
    }
    
    return response.json(); // This will now return the full response with data.jokes and data.total
};

export async function approveJoke(joke: Joke): Promise<void> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/update?id=${joke.id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...joke, status: 'approved' }),
        }
    );
    if (!response.ok) {
        throw new Error('Failed to approve joke');
    }
}

export async function rejectJoke(id: string): Promise<void> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/delete?id=${id}`,
        {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to reject joke');
    }
}

export async function updateJoke(joke: Joke): Promise<void> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/update?id=${joke.id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(joke),
        }
    );
    if (!response.ok) {
        throw new Error('Failed to update joke');
    }
}