import React, { useState } from 'react';
import { Modal } from './Modal';
import { ZoomIn, ZoomOut } from 'lucide-react';
import './ImageZoom.css';

export function ImageZoom({
    src,
    alt,
    className = '',
    aspectRatio = 'square' // square, video, clear
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [scale, setScale] = useState(1);

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setScale(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setScale(prev => Math.max(prev - 0.5, 1));
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setScale(1), 300);
    };

    return (
        <>
            <div
                className={`image-zoom-thumbnail aspect-${aspectRatio} ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <img src={src} alt={alt} />
                <div className="image-zoom-hint">
                    <span>🔍 Click to zoom</span>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                maxWidth="90vw"
            >
                <div className="image-zoom-wrapper">
                    <div className="image-zoom-controls">
                        <button onClick={handleZoomOut} className="zoom-btn" disabled={scale <= 1}>
                            <ZoomOut size={20} />
                        </button>
                        <span className="zoom-level">{Math.round(scale * 100)}%</span>
                        <button onClick={handleZoomIn} className="zoom-btn" disabled={scale >= 3}>
                            <ZoomIn size={20} />
                        </button>
                    </div>

                    <div className="image-zoom-full">
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                transform: `scale(${scale})`,
                                cursor: scale > 1 ? 'zoom-out' : 'zoom-in'
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setScale(s => s === 1 ? 2 : 1);
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
