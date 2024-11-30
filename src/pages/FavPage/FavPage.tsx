import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonSpinner,
    IonText,
    IonRefresher,
    IonRefresherContent
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios';

// Interfaz para las películas favoritas
interface Movie {
    movieId: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    genres: string[];
}

const FavPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const history = useHistory();


    const getUserIdFromToken = (): string | null => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwt_decode(token);
                return decoded.id;
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
        return null;
    };

    const userId = getUserIdFromToken();
    // Cargar favoritos desde el backend al montar el componente
    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`https://api-notepad-production.up.railway.app/favorites/${userId}`);
            setFavorites(response.data);
            setError(null);
        } catch (err) {
            setError("No se pudieron cargar tus favoritos. Por favor, inténtalo más tarde.");
            console.error("Error al obtener favoritos", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRefresh = async (event: CustomEvent) => {
        await fetchFavorites();
        event.detail.complete(); // Finalizar la animación del refresco
    };

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar style={{ padding: '7px' }}>
                    <IonTitle class="ion-text-center">Guardados</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent
                        pullingIcon="chevron-down-circle-outline"
                        pullingText="Desliza hacia abajo para refrescar"
                        refreshingSpinner="circles"
                        refreshingText="Actualizando favoritos..."
                    />
                </IonRefresher>

                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '20%' }}>
                        <IonSpinner name="crescent" />
                        <IonText>Cargando tus peliculas guardadas...</IonText>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', marginTop: '20%' }}>
                        <IonText color="danger">{error}</IonText>
                    </div>
                ) : favorites.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '20%' }}>
                        <IonText>No tienes películas en guardadas.</IonText>
                    </div>
                ) : (
                    <IonGrid>
                        <IonRow>
                            {favorites.map(movie => (
                                <IonCol key={movie.movieId} size="6" sizeMd="4">
                                    <IonCard color="light" onClick={() => history.push(`/movie/${movie.movieId}`)}>
                                        <img
                                            alt={`Imagen de ${movie.title}`}
                                            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                            style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                        />
                                        <IonCardHeader>
                                            <IonCardTitle>{movie.title}</IonCardTitle>
                                            <IonCardSubtitle>Lanzamiento: {movie.releaseDate}</IonCardSubtitle>
                                            <IonCardSubtitle>Valoración: {movie.voteAverage}</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            Géneros: {movie.genres.join(", ")}
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}
            </IonContent>
        </IonPage>
    );
};

export default FavPage;
