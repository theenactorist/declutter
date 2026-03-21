import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ImageZoom } from '../components/ui/ImageZoom';
import { useItems } from '../hooks/useItems';
import { Loader2 } from 'lucide-react';
import './ItemDetailPage.css';

export function ItemDetailPage() {
    const { id } = useParams();
    const { items, loading, error } = useItems();
    const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
    const [mainImageIdx, setMainImageIdx] = useState(0);

    // Look up item 
    const item = items.find(i => i.id === id);

    // This should eventually come from env vars
    const WHATSAPP_NUMBER = '2348062261232';
    const whatsappMessage = item ? encodeURIComponent(`Hi! I'm interested in the ${item.name} (₦${Number(item.price).toLocaleString()}) from Everything Must Go ✨`) : '';
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    const renderSpecs = () => {
        if (!item.specs || Object.keys(item.specs).length === 0) return null;
        return (
            <div className="specs-grid">
                {Object.entries(item.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </div>
        );
    };

    const conditionGuide = [
        { grade: 'New', text: 'Never opened' },
        { grade: 'Open Box', text: 'Like New condition' },
        { grade: '10', text: 'Preowned equipment that looks good as new; no signs of wear' },
        { grade: '9+', text: 'Preowned equipment that shows little to no signs of wear' },
        { grade: '9', text: 'Very good condition; overall looks clean but may have minor signs of use/surface marks' },
        { grade: '8+', text: 'Shows moderate wear, scuffing or marks to finish' },
        { grade: '8', text: 'Well used-may exhibit "dings" or noticeable marks to finish' },
        { grade: '7', text: 'Shows considerable wear and above-average signs of use' }
    ];

    return (
        <div className="item-detail-page">
            <div className="container nav-bar">
                <Link to="/" className="back-link">
                    <ChevronLeft size={20} />
                    Back to Gallery
                </Link>
            </div>

            <main className="container item-main">
                {loading ? (
                    <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', gridColumn: '1 / -1', minHeight: '50vh', justifyContent: 'center' }}>
                        <Loader2 className="spinner" size={32} style={{ animation: 'spin 1s linear infinite' }} />
                        <p>Loading item details...</p>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : error ? (
                    <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                        <p style={{ color: 'var(--color-danger)' }}>Error loading item: {error}</p>
                    </div>
                ) : !item ? (
                    <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                        <h2>Item Not Found</h2>
                        <p>This item may have been removed or the link is invalid.</p>
                        <Link to="/"><Button variant="secondary" style={{ marginTop: '1rem' }}>Browse Gallery</Button></Link>
                    </div>
                ) : (
                    <>
                        {/* Left Column: Images */}
                        <section className="item-gallery">
                            {/* Main big image */}
                            <div className="main-image-container">
                                <ImageZoom
                                    src={item.images && item.images[mainImageIdx] ? item.images[mainImageIdx] : '/images/placeholder.png'}
                                    alt={item.name}
                                    className="main-image-zoom"
                                />
                                {item.status === 'sold' && (
                                    <div className="sold-overlay">
                                        <span>SOLD</span>
                                    </div>
                                )}
                            </div>
                            {/* Thumbnail strip would go here if we had >1 image */}
                            {item.images && item.images.length > 1 && (
                                <div className="thumbnail-strip">
                                    {item.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`thumbnail ${idx === mainImageIdx ? 'active' : ''}`}
                                            onClick={() => setMainImageIdx(idx)}
                                        >
                                            <img src={img} alt={`${item.name} thumbnail ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Right Column: Details */}
                        <section className="item-info">
                            <div className="info-header">
                                <div className="category-tag text-uppercase">{item.category.replace('_', ' ')}</div>
                                <h1 className="item-title">{item.name}</h1>
                                {item.quantity > 1 && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Badge variant="default" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>🔥 {item.quantity} Available</Badge>
                                    </div>
                                )}
                                <div className="price-status">
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <span className="item-price-large">₦{Number(item.price).toLocaleString()}</span>
                                        {item.quantity > 1 && <span style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', marginTop: '-0.25rem' }}>price per item</span>}
                                    </div>
                                    {item.status === 'available' && <Badge variant="success">Available</Badge>}
                                    {item.status === 'negotiation' && <Badge variant="warning">In Negotiation</Badge>}
                                    {item.status === 'sold' && <Badge variant="default">Sold</Badge>}
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>Description</h3>
                                <p className="description-text">{item.full_description}</p>
                            </div>

                            <div className="info-section">
                                <div className="condition-header">
                                    <h3>Condition</h3>
                                    <button
                                        className="condition-guide-btn"
                                        onClick={() => setIsConditionModalOpen(true)}
                                    >
                                        What does this mean?
                                    </button>
                                </div>
                                <div className="condition-badge-lg">
                                    {item.condition_grade}
                                </div>
                            </div>

                            {item.extras && item.extras.length > 0 && (
                                <div className="info-section">
                                    <h3>Included Extras</h3>
                                    <ul className="extras-list">
                                        {item.extras.map((extra, idx) => (
                                            <li key={idx}>• {extra}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {item.specs && Object.keys(item.specs).length > 0 && (
                                <div className="info-section">
                                    <h3>Specifications</h3>
                                    {renderSpecs()}
                                </div>
                            )}

                            <div className="cta-section">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        disabled={item.status === 'sold'}
                                    >
                                        <MessageCircle size={20} />
                                        {item.status === 'sold' ? 'Item No Longer Available' : 'Contact via WhatsApp'}
                                    </Button>
                                </a>
                                {!item.status === 'sold' && (
                                    <p className="cta-hint">Opens your WhatsApp to chat directly with me.</p>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>

            {/* Condition Guide Modal */}
            <Modal
                isOpen={isConditionModalOpen}
                onClose={() => setIsConditionModalOpen(false)}
                title="Condition Guide"
            >
                <div className="condition-guide-content">
                    <p>We want you to feel confident in your purchase. Here is the 10-point scale we use to describe our items honestly and accurately.</p>
                    <ul className="condition-scale-list">
                        {conditionGuide.map((g, idx) => {
                            const isCurrentGrade = item?.condition_grade && item.condition_grade.includes(g.grade);
                            return (
                                <li key={idx} className={isCurrentGrade ? 'current-grade' : ''}>
                                    <strong>{g.grade}:</strong> {g.text}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Modal>
        </div>
    );
}
