import React, { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonText, IonButtons, IonBackButton, IonButton } from "@ionic/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";

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

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api-notepad-production.up.railway.app/movies/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                toast.error("Error al cargar los detalles de la película", { position: "bottom-center" });
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    // Obtiene el userId desde el token
    const getUserIdFromToken = (): string | null => {
        const token = localStorage.getItem("token");
        console.log(token)
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

    // Función para guardar la película en favoritos
    const addToFavorites = async () => {
        if (!movie) return;

        const userId = getUserIdFromToken();
        if (!userId) {
            toast.error("Usuario no autenticado", { position: "bottom-center" });
            return;
        }
        
        try {
            await axios.post("https://api-notepad-production.up.railway.app/favorites", {
                userId,
                movieId,
                title: movie.title,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
                voteAverage: movie.vote_average,
                genres: movie.genres.map(genre => genre.name)
            });
            toast.success("Película guardada en favoritos", { position: "bottom-center" });
        } catch (error) {
            console.error("Error al agregar a favoritos:", error);
            toast.error("Error al agregar a favoritos", { position: "bottom-center" });
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{padding: "0.8rem"}}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Atrás" />
                    </IonButtons>
                    <IonTitle>Detalles de la Película</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                        <IonText color="medium">
                            <p>Estreno: {new Date(movie.release_date).toLocaleDateString()}</p>
                            <p>Valoración: {movie.vote_average} / 10 ({movie.vote_count} votos)</p>
                        </IonText>
                        <h3>Géneros</h3>
                        <IonText color="primary">
                            {movie.genres.map(genre => (
                                <span key={genre.id} style={{ marginRight: "8px", color: "white" }}>{genre.name}</span>
                            ))}
                        </IonText>
                        <h3>Resumen</h3>
                        <IonText>
                            <p>{movie.overview}</p>
                        </IonText>
                        <IonButton expand="block" onClick={addToFavorites}>
                            Guardar en Favoritos
                        </IonButton>
                    </div>
                ) : (
                    <IonText color="danger">
                        <p>Error al cargar los detalles de la película.</p>
                    </IonText>
                )}
                <ToastContainer />
            </IonContent>
        </IonPage>
    );
};

export default MovieDetailsPage;
