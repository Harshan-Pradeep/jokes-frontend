'use client';

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>;
    error: string;
}

export const LoginForm = ({ onLogin, error }: LoginFormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onLogin(
            formData.get('email') as string,
            formData.get('password') as string
        );
    };

    return (
        <div className="p-8 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Moderator Login</h1>
            {error && (
                <p className="text-red-500 text-center mb-4 bg-red-900 p-2 rounded">
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-gray-700 p-3 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-700 p-3 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 w-full rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Login
                </button>
            </form>
        </div>
    );
};
