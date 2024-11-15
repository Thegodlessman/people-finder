import React, { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonText, IonButtons, IonBackButton, IonButton, IonSegment, IonSegmentContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import jwt_decode from "jwt-decode";
import './MovieDetailsPage.css'
import { IonSegmentButton, IonLabel } from "@ionic/react";

interface Movie {
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    genres: { id: number; name: string }[];
    runtime: number;
}

const MovieDetailsPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const getUserIdFromToken = (): string | null => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwt_decode(token);
                return decoded.id; // Cambia "userId" si tu token tiene un nombre de campo diferente
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
        return null;
    };

    const userId = getUserIdFromToken();

    useEffect(() => {
        

        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api-notepad-production.up.railway.app/movies/${movieId}`);
                setMovie(response.data);
                await checkIfFavorite();
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        const checkIfFavorite = async () => {
            try {
                const response = await axios.get(`https://api-notepad-production.up.railway.app/favorites/${userId}`);
                setIsFavorite(response.data.some((fav: any) => fav.movieId === movieId));
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        fetchMovieDetails();
    }, [movieId, userId]);

    const addToFavorites = async () => {
        if (!movie) return;

        try {
            await axios.post("https://api-notepad-production.up.railway.app/favorites", {
                userId,
                movieId,
                title: movie.title,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
                voteAverage: movie.vote_average,
                genres: movie.genres.map(genre => genre.name),
            });
            setIsFavorite(true);
            toast.success("Película guardada en favoritos.", { position: "bottom-center" });
        } catch (error) {
            toast.error("Error al guardar en favoritos.", { position: "bottom-center" });
        }
    };

    const removeFromFavorites = async () => {
        try {
            await axios.delete("https://api-notepad-production.up.railway.app/favorites", {
                data: { userId, movieId }
            });
            setIsFavorite(false);
            toast.success("Película eliminada de favoritos.", { position: "bottom-center" });
        } catch (error) {
            toast.error("Error al eliminar de favoritos.", { position: "bottom-center" });
        }
    };

    return (
        <IonPage>
            <IonToolbar style={{ padding: "0.8rem" }}>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/"/>
                </IonButtons>
                <IonTitle className="ion-title">Detalles</IonTitle>
            </IonToolbar>
            <IonContent>
                <ToastContainer />
                {loading ? (
                    <IonSpinner />
                ) : movie ? (
                    <div style={{ padding: "1rem" }}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                        <h2>{movie.title}</h2>
                        <IonSegment value="all">
                            <IonSegmentButton value="all">
                                <IonLabel>Info</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="favorites">
                                <IonLabel>Comentarios</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                        <IonText color="medium">
                            <p>Estreno: {new Date(movie.release_date).toLocaleDateString()}</p>
                            <p>Valoración: {movie.vote_average} / 10 ({movie.vote_count} votos)</p>
                        </IonText>
                        <h3>Géneros</h3>
                        <IonText color="primary">
                            {movie.genres.map(genre => (
                                <span key={genre.id} style={{ marginRight: "8px", color: "black" }}>{genre.name}</span>
                            ))}
                        </IonText>
                        <h3>Resumen</h3>
                        <IonText>
                            <p>{movie.overview}</p>
                        </IonText>
                        {/* Botón para agregar o quitar de favoritos */}
                        <IonButton expand="block" onClick={isFavorite ? removeFromFavorites : addToFavorites}>
                            {isFavorite ? "Quitar de Favoritos" : "Guardar en Favoritos"}
                        </IonButton>
                    </div>
                ) : (
                    <IonText color="danger">
                        <p>Error al cargar los detalles de la película.</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default MovieDetailsPage;
