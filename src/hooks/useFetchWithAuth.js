import { useState } from 'react';

export function useFetchWithAuth() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to execute the request
    const fetchRequest = async (url, method = 'GET', body = null, token = null) => {
        setIsLoading(true);
        setData(null);
        setError(null);

        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
            body: method !== 'GET' ? JSON.stringify(body) : null,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const responseError = await response.json();
                if(response.status === 401) {
                    throw new Error('Username or password is incorrect');
                }
                if(responseError.message === 'User already exists') {
                    throw new Error('Username already exists');
                }
                if(responseError.message === 'Email already exists') {
                    throw new Error('Email already exists');
                }
                throw new Error('Request failed');
            }

            // Not all GET requests may return JSON, so handle gracefully
            const jsonResponse = await response.json().catch(() => ({}));
            setData(jsonResponse);
        } catch (err) {
            console.log(err.message)
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchRequest, data, isLoading, error };
}
