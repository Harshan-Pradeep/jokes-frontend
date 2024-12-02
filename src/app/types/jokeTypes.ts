export interface Joke {
    _id: string;
    content: string;
    type: string;
    status: string;
    createdAt: string;
    __v: number;
}

export interface UpdateJoke {
    _id: string;
    content: string;
    type: string;
    status: string;
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
    id: string;
    name: string;
};