'use client';

import Navbar from '@/components/Navbar';
import SubmitJokesForm from '@/components/SubmitJokes/SubmitJokesForm';

export default function SubmitJokesPage() {
    return (
        <>
            <Navbar />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Submit a Joke</h1>
                <SubmitJokesForm />
            </div>
        </>
    );
}