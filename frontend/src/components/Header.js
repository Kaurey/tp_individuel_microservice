import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated, currentPath }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    // Cacher les boutons sur les pages de connexion et d'inscription
    const hideButtons = currentPath === '/login' || currentPath === '/register';

    return (
        <header>
            <Link to="/publications" style={{ textDecoration: 'none', color: 'white' }}>
                <h1>Site de publications</h1>
            </Link>
            {!hideButtons && (
                isAuthenticated ? (
                    <button onClick={handleLogout}>Se déconnecter</button>
                ) : (
                    <button onClick={() => navigate('/login')}>Se connecter</button>
                )
            )}
        </header>
    );
}

export default Header;
