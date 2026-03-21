import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';

// Lazy loading pages for better performance could be added later
import { HomePage } from './pages/HomePage';
import { ItemDetailPage } from './pages/ItemDetailPage';

import { AdminLayout } from './layouts/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminItemFormPage } from './pages/admin/AdminItemFormPage';
import { useAuth } from './hooks/useItems';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="add-item" element={<AdminItemFormPage />} />
          <Route path="edit-item/:id" element={<AdminItemFormPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
