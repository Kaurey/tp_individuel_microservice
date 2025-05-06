import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PublicationsPage from './pages/PublicationsPage';
import Header from './components/Header';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const Layout = () => {
        const location = useLocation();
        return (
            <>
                <Header
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    currentPath={location.pathname}
                />
                <Routes>
                    <Route path="/" element={<Navigate to="/publications" />} /> {/* Redirige vers les publications */}
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/publications" element={<PublicationsPage />} />
                </Routes>
            </>
        );
    };

    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
