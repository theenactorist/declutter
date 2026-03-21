import { useState, useEffect } from 'react';
import api from '../lib/api';

export function useItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.get('/items');
            setItems(response.data);
        } catch (err) {
            console.error('API Error:', err);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return { items, loading, error, refetch: fetchItems };
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check local storage on mount
    useEffect(() => {
        const token = localStorage.getItem('declutter_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            // Save to local storage
            localStorage.setItem('declutter_token', token);
            setIsAuthenticated(true);

            return { success: true, user };
        } catch (err) {
            console.error('Login Error:', err);
            return {
                success: false,
                error: err.response?.data?.error || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('declutter_token');
        setIsAuthenticated(false);
        return { success: true };
    };

    return { isAuthenticated, login, logout };
}
