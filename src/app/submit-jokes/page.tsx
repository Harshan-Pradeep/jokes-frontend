'use client';

import Navbar from '@/components/Navbar';
import SubmitJokesForm from '@/components/SubmitJokes/SubmitJokesForm';

export default function SubmitJokesPage() {
    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-900 min-h-screen">
                <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Submit a Joke</h1>
                    <SubmitJokesForm />
                </div>
            </div>
        </>
    );
}
