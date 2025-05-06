import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { toast } from 'react-toastify'; // Import react-toastify

function LoginPage({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true); // Met à jour l'état global
            toast.success('Connexion réussie');
            navigate('/publications'); // Redirige vers la page des publications
        } catch (error) {
            toast.error('Erreur de connexion');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Connexion</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
            <p className="form-link">
                Pas encore inscrit ? <span onClick={() => navigate('/register')}>S'enregistrer</span>
            </p>
        </form>
    );
}

export default LoginPage;
