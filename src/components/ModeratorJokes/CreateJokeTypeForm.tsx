'use client';

import { useState } from 'react';
import { createJokeType } from '@/app/services/jokeService';

export default function CreateJokeTypeForm({ onSuccess }: { onSuccess: () => void }) {
  const [jokeTypeName, setJokeTypeName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateJokeType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJokeType({ name: jokeTypeName });
      setMessage('Joke type created successfully!');
      setJokeTypeName('');
      onSuccess();
    } catch (error) {
      console.error('Error creating joke type:', error);
      setMessage('Failed to create joke type. Please try again.');
    }
  };

  return (
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
  );
}
