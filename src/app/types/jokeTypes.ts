export interface Joke {
    _id: string;
    content: string;
    type: string;
    status: string;
    author: string;
    createdAt: string;
    __v: number;
}

export interface UpdateJoke {
    _id: string;
    content: string;
    type: string;
    status: string;
}


export type JokeType = {
    id: string;
    name: string;
};