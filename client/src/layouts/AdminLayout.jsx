import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Store } from 'lucide-react';
import { useAuth } from '../hooks/useItems';
import './AdminLayout.css';

export function AdminLayout({ children }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Admin Panel ✨</h2>
                </div>

                <nav className="admin-nav">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/add-item"
                        className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <PlusCircle size={20} />
                        Add Listing
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <a href="/" className="admin-nav-item">
                        <Store size={20} />
                        Back to Store
                    </a>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="admin-main-wrapper">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        {/* Mobile menu toggle could go here */}
                    </div>
                    <div className="topbar-right">
                        <span className="admin-user-name">Seller Admin</span>
                        <button onClick={handleLogout} className="logout-btn" title="Log out">
                            <LogOut size={18} />
                            <span className="sr-only">Logout</span>
                        </button>
                    </div>
                </header>

                <main className="admin-content">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
}
