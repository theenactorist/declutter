import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { OnboardingOverlay } from '../components/OnboardingOverlay';
import { Search, Loader2 } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import './HomePage.css';

const CATEGORIES = [
    { id: 'all', label: 'All Items' },
    { id: 'giveaways', label: '🔥 Giveaways' },
    { id: 'living_room', label: 'Living Room' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'kitchen', label: 'Kitchen' }
];

const isGiveaway = (item) => {
    return (item.price_notes && item.price_notes.toLowerCase().includes('giveaway')) || Number(item.price) <= 5000;
};

export function HomePage() {
    const { items, loading, error } = useItems();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [showSold, setShowSold] = useState(false);

    // Filter logic
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.short_description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || (activeCategory === 'giveaways' ? isGiveaway(item) : item.category === activeCategory);
        const matchesStatus = showSold ? true : item.status !== 'sold';

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'available': return <Badge variant="success">Available</Badge>;
            case 'negotiation': return <Badge variant="warning">In Negotiation</Badge>;
            case 'sold': return <Badge variant="default">Sold</Badge>;
            default: return null;
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <header className="hero container">
                <h1>Everything Must Go ✨</h1>
                <p className="hero-subtitle">
                    Quality items from our home to yours. Browse, find what you love, and reach out on WhatsApp.
                </p>

                {/* Filters & Search */}
                <div className="filters-container">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <Input
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-chips">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`chip ${activeCategory === cat.id ? 'chip-active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <label className="toggle-sold">
                        <input
                            type="checkbox"
                            checked={showSold}
                            onChange={(e) => setShowSold(e.target.checked)}
                        />
                        <span>Show sold items</span>
                    </label>
                </div>
            </header>

            {/* Gallery Grid */}
            <main className="gallery-container container">
                {loading ? (
                    <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <Loader2 className="spinner" size={32} style={{ animation: 'spin 1s linear infinite' }} />
                        <p>Loading gallery items...</p>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : error ? (
                    <div className="empty-state">
                        <p style={{ color: 'var(--color-danger)' }}>Error loading items: {error}</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="empty-state">
                        <p>No items found matching your filters.</p>
                    </div>
                ) : (
                    <div className="gallery-grid">
                        {filteredItems.map(item => (
                            <Link to={`/item/${item.id}`} key={item.id} className="card-link">
                                <Card hoverable className="item-card">
                                    <div className="item-image-wrapper">
                                        <img
                                            src={item.images && item.images[0] ? item.images[0] : '/images/placeholder.png'}
                                            alt={item.name}
                                            className={`item-image ${item.status === 'sold' ? 'item-image-sold' : ''}`}
                                        />
                                        <div className="item-badges">
                                            {getStatusBadge(item.status)}
                                            {isGiveaway(item) && (
                                                <Badge variant="warning" className="giveaway-badge-grid">🔥 Giveaway</Badge>
                                            )}
                                            {item.quantity > 1 && (
                                                <Badge variant="default" className="qty-badge-grid">{item.quantity} Available</Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="item-details">
                                        <div className="item-header">
                                            <h3 className="item-name">{item.name}</h3>
                                            <span className="item-price">
                                                ₦{Number(item.price).toLocaleString()}
                                                {item.quantity > 1 && <span style={{ fontSize: '0.75rem', fontWeight: 'normal', display: 'block' }}>each</span>}
                                            </span>
                                        </div>
                                        <p className="item-desc">{item.short_description}</p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            <OnboardingOverlay />
        </div>
    );
}
