import React from 'react';
import './Card.css';

export function Card({
    children,
    className = '',
    hoverable = false,
    onClick,
    ...props
}) {
    const classes = [
        'card',
        hoverable ? 'card-hoverable' : '',
        onClick ? 'card-clickable' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick} {...props}>
            {children}
        </div>
    );
}
