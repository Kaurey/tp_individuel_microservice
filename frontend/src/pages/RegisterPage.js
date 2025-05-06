import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { toast } from 'react-toastify'; // Import react-toastify

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            toast.success('Inscription réussie. Vous pouvez maintenant vous connecter.');
            navigate('/login'); // Redirige vers la page de connexion
        } catch (error) {
            toast.error('Erreur lors de l\'inscription');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h1>Inscription</h1>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">S'inscrire</button>
            <p className="form-link">
                Déjà inscrit ? <span onClick={() => navigate('/login')}>Se connecter</span>
            </p>
        </form>
    );
}

export default RegisterPage;
