import { useEffect, useState } from 'react';
import { JokeType } from '../types/jokeTypes';


export function useFetchJokeTypes() {
    const [jokeTypes, setJokeTypes] = useState<JokeType[]>([]);

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

    return { jokeTypes };
}