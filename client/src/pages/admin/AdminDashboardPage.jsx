import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Trash2, Edit, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useItems } from '../../hooks/useItems';
import './AdminDashboardPage.css';

export function AdminDashboardPage() {
    const { items, loading, error } = useItems();
    const [searchQuery, setSearchQuery] = useState('');

    const stats = {
        total: items.length,
        available: items.filter(i => i.status === 'available').length,
        sold: items.filter(i => i.status === 'sold').length,
        value: items.reduce((acc, curr) => acc + Number(curr.price), 0)
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'available': return <Badge variant="success">Available</Badge>;
            case 'negotiation': return <Badge variant="warning">In Negotiation</Badge>;
            case 'sold': return <Badge variant="default">Sold</Badge>;
            default: return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header-row">
                <div>
                    <h1 className="admin-page-title">Dashboard</h1>
                    <p className="admin-page-subtitle">Manage your inventory and track sales.</p>
                </div>
                <Link to="/admin/add-item">
                    <Button variant="primary">Add New Listing</Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <Card className="stat-card">
                    <span className="stat-label">Total Listings</span>
                    <span className="stat-value">{stats.total}</span>
                </Card>
                <Card className="stat-card">
                    <span className="stat-label">Active Items</span>
                    <span className="stat-value">{stats.available}</span>
                </Card>
                <Card className="stat-card">
                    <span className="stat-label">Items Sold</span>
                    <span className="stat-value">{stats.sold}</span>
                </Card>
                <Card className="stat-card">
                    <span className="stat-label">Total Inventory Value</span>
                    <span className="stat-value">₦{stats.value.toLocaleString()}</span>
                </Card>
            </div>

            {/* Main Table Area */}
            <Card className="inventory-section">
                <div className="inventory-toolbar">
                    <div className="search-wrapper admin-search">
                        <Search className="search-icon" size={18} />
                        <Input
                            placeholder="Search listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="toolbar-actions">
                        <select className="input-field" style={{ width: 'auto' }}>
                            <option value="all">All Status</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                        <select className="input-field" style={{ width: 'auto' }}>
                            <option value="all">Break actions</option>
                            <option value="delete">Delete Selected</option>
                            <option value="sold">Mark as Sold</option>
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th width="40"><input type="checkbox" /></th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading inventory...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-danger)' }}>Error loading inventory: {error}</td>
                                </tr>
                            ) : items.map(item => (
                                <tr key={item.id}>
                                    <td><input type="checkbox" /></td>
                                    <td className="font-medium">{item.name}</td>
                                    <td className="text-uppercase text-muted" style={{ fontSize: '0.75rem' }}>
                                        {item.category.replace('_', ' ')}
                                    </td>
                                    <td>₦{Number(item.price).toLocaleString()}</td>
                                    <td>{getStatusBadge(item.status)}</td>
                                    <td className="text-muted" style={{ fontSize: '0.875rem' }}>
                                        {new Date(item.updated_at).toLocaleDateString()}
                                    </td>
                                    <td align="right">
                                        <div className="action-buttons">
                                            <button className="icon-btn" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button className="icon-btn danger" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
