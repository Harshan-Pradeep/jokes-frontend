import { Joke, UpdateJoke } from "../types/jokeTypes";


export async function fetchRandomJoke(type: string): Promise<Joke> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELIVER_JOKES_API}/api/v1/delivery/random${type ? `?type=${type}` : ''}`
    );
    const data = await response.json();

    if (!response.ok) {
        alert(data.message);
    }

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

    const responseData = await response.json();
    if (responseData.statusCode === 200) {
        alert(responseData.message);
    }
}

export const fetchPendingJokes = async (page: number, limit: number) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/pending?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch jokes');
    }

    return response.json();
};

export async function approveJoke(joke: Joke): Promise<void> {
    const { _id, createdAt, __v, ...jokeWithoutId } = joke;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/update?id=${joke._id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...jokeWithoutId, status: 'approved' }),
        }
    );
    if (!response.ok) {
        throw new Error('Failed to approve joke');
    }

    const responseData = await response.json();
    if (responseData && responseData.message) {
        alert(responseData.message);
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

    const responseData = await response.json();
    if (responseData.statusCode === 200) {
        alert(responseData.message);
    }
}

export async function updateJoke(joke: Joke): Promise<void> {
    const { _id, createdAt, __v, ...jokeWithoutId } = joke;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/update?id=${_id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jokeWithoutId),
        }
    );
    if (!response.ok) {
        throw new Error('Failed to update joke');
    }

    const responseData = await response.json();
    if (responseData.statusCode === 200) {
        alert(responseData.message);
    }
}

export async function createJokeType(jokeType: { name: string }): Promise<void> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/moderate/types`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jokeType),
        }
    );

    if (!response.ok) {
        throw new Error('Failed to create new joke type');
    }

    const responseData = await response.json();
    if (responseData && responseData.message) {
        alert(responseData.message);
    }
}

