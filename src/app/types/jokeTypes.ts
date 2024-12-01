// types/jokeTypes.ts
export interface Joke {
    _id: string;  // Note: Changed from 'id' to '_id' to match API
    content: string;
    type: string;
    status: string;
    createdAt: string;
}

interface ApiResponse {
    statusCode: number;
    message: string;
    data: {
        jokes: Joke[];
        total: number;
    }
}

export type JokeType = {
    _id: string;
    name: string;
};