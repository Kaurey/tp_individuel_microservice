import React, { useEffect, useState } from 'react';
import { fetchPublications, createPublication, deletePublication, updatePublication } from '../services/api';
import { toast } from 'react-toastify'; // Import react-toastify

function PublicationsPage() {
    const [publications, setPublications] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null); // ID de la publication en cours de modification
    const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté

    useEffect(() => {
        const loadPublications = async () => {
            try {
                const response = await fetchPublications();
                // Trier les publications par date décroissante
                const sortedPublications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPublications(sortedPublications);
            } catch (error) {
                toast.error('Erreur lors du chargement des publications');
            }
        };
        loadPublications();
    }, []);

    const handleAddPublication = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Vous devez être connecté pour ajouter une publication.');
            return;
        }

        try {
            const newPublication = { title, content };
            await createPublication(newPublication, token);
            toast.success('Publication ajoutée avec succès');
            setTitle('');
            setContent('');
            const response = await fetchPublications();
            // Trier les publications après ajout
            const sortedPublications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPublications(sortedPublications);
        } catch (error) {
            toast.error('Erreur lors de l\'ajout de la publication');
        }
    };

    const handleDeletePublication = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Vous devez être connecté pour supprimer une publication.');
            return;
        }

        try {
            await deletePublication(id, token);
            toast.success('Publication supprimée avec succès');
            const response = await fetchPublications();
            // Trier les publications après suppression
            const sortedPublications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPublications(sortedPublications);
        } catch (error) {
            toast.error('Erreur lors de la suppression de la publication');
        }
    };

    const handleEditPublication = (pub) => {
        setEditingId(pub._id);
        setTitle(pub.title);
        setContent(pub.content);
    };

    const handleUpdatePublication = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Vous devez être connecté pour modifier une publication.');
            return;
        }

        try {
            const updatedPublication = { title, content };
            await updatePublication(editingId, updatedPublication, token);
            toast.success('Publication modifiée avec succès');
            setEditingId(null);
            setTitle('');
            setContent('');
            const response = await fetchPublications();
            // Trier les publications après modification
            const sortedPublications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPublications(sortedPublications);
        } catch (error) {
            toast.error('Erreur lors de la modification de la publication');
        }
    };

    return (
        <div>
            <h1>Publications</h1>
            {isAuthenticated && (
                <form onSubmit={editingId ? handleUpdatePublication : handleAddPublication}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Contenu"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">{editingId ? 'Modifier' : 'Ajouter'} une publication</button>
                </form>
            )}
            {publications.length === 0 ? (
                <p className="no-publications-message">Aucune publication disponible pour le moment.</p>
            ) : (
                <ul>
                    {publications.map((pub) => (
                        <li key={pub._id}>
                            <h2>{pub.title}</h2>
                            <p>{pub.content}</p>
                            {isAuthenticated && (
                                <>
                                    <button onClick={() => handleEditPublication(pub)}>Modifier</button>
                                    <button onClick={() => handleDeletePublication(pub._id)}>Supprimer</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PublicationsPage;
