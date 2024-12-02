export const authenticate = async (email: string, password: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODERATOR_JOKES_API}/api/v1/auth/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }
    );

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
};