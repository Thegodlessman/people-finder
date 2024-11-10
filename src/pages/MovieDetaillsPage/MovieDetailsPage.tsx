import React, { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonText, IonButtons, IonBackButton } from "@ionic/react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    const { movieId } = useParams<{ movieId: string }>(); // Obtiene el ID de la película desde la URL
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
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

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
                            {/* <p>Duración: {movie.runtime} min</p> */}
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
