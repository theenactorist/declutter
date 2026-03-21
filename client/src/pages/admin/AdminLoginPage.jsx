import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useItems';
import { useNavigate, useLocation } from 'react-router-dom';

export function AdminLoginPage() {
    const [email, setEmail] = useState('loveisconsistent@gmail.com');
    const [password, setPassword] = useState('uranusmiltonAI01.');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // The intended destination or default to dashboard
    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--color-background)',
            padding: 'var(--spacing-md)'
        }}>
            <Card style={{ width: '100%', maxWidth: '400px', padding: 'var(--spacing-2xl)' }}>
                <h1 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem', textAlign: 'center' }}>
                    Admin Login
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                    Sign in to manage your inventory.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {error && (
                        <div style={{ color: 'var(--color-danger)', fontSize: '0.875rem', textAlign: 'center', backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>
                            {error}
                        </div>
                    )}
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@example.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />
                    <Button type="submit" variant="primary" fullWidth size="lg" style={{ marginTop: 'var(--spacing-sm)' }} disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
