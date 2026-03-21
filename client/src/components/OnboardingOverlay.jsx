import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import './OnboardingOverlay.css';

export function OnboardingOverlay() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the onboarding
        const hasSeenOnboarding = localStorage.getItem('declutter_onboarding_seen');
        if (!hasSeenOnboarding) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('declutter_onboarding_seen', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-card">
                <h2>Welcome to the Sale! 👋</h2>
                <p>Quality items from our home to yours. Browse, find what you love, and reach out on WhatsApp.</p>

                <ul className="onboarding-tips">
                    <li><strong>Browse:</strong> Use the category tags above to find what you need.</li>
                    <li><strong>Condition:</strong> Read our strict 10-point condition scale on each item page.</li>
                    <li><strong>Buy:</strong> Click the WhatsApp button on any item to message me directly. First come, first served!</li>
                </ul>

                <Button onClick={handleDismiss} variant="primary" fullWidth size="lg">
                    Got it, let's browse
                </Button>
            </div>
        </div>
    );
}
