import React, { useEffect, useState } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonText,
    IonButtons,
    IonBackButton,
    IonButton,
    IonItem,
    IonLabel,
    IonTextarea,
    IonList,
    IonSegment,
    IonSegmentButton,
    IonInput,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";

import "react-toastify/dist/ReactToastify.css";
import "./MovieDetailsPage.css";

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

interface Comment {
    userId: string;
    username: string;
    comment: string;
    rating: number;
    createdAt: string;
}

const MovieDetailsPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [userComment, setUserComment] = useState<string>("");
    const [userRating, setUserRating] = useState<number>(5);
    const [existingComment, setExistingComment] = useState<Comment | null>(null);
    const [segmentValue, setSegmentValue] = useState<string>("info");

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

    const getUsernameFromToken = (): string | null => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwt_decode(token);
                return decoded.username;  // Asegúrate de que el token tenga el campo `username`
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
        return null;
    };


    const userId = getUserIdFromToken();
    const username = getUsernameFromToken();

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api-notepad-production.up.railway.app/movies/${movieId}`
            );
            setMovie(response.data);
            await checkIfFavorite();
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(
                `https://api-notepad-production.up.railway.app/comments/${movieId}`
            );
            setComments(response.data);
            const userComment = response.data.find(
                (comment: Comment) => comment.userId === userId
            );
            if (userComment) setExistingComment(userComment);
        } catch (error) {
            toast.error("Error al cargar comentarios", { position: "bottom-center" });
        }
    };

    const checkIfFavorite = async () => {
        try {
            const response = await axios.get(
                `https://api-notepad-production.up.railway.app/favorites/${userId}`
            );
            setIsFavorite(response.data.some((fav: any) => fav.movieId === movieId));
        } catch (error) {
            console.error("Error checking favorite status:", error);
        }
    };

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
                genres: movie.genres.map((genre) => genre.name),
            });
            setIsFavorite(true);
            toast.success("Película guardada.", { position: "bottom-center" });
        } catch (error) {
            toast.error("Error al guardar en favoritos.", { position: "bottom-center" });
        }
    };

    const removeFromFavorites = async () => {
        try {
            await axios.delete("https://api-notepad-production.up.railway.app/favorites", {
                data: { userId, movieId },
            });
            setIsFavorite(false);
            toast.success("Película eliminada de guardados.", { position: "bottom-center" });
        } catch (error) {
            toast.error("Error al eliminar de favoritos.", { position: "bottom-center" });
        }
    };

    const handleAddOrUpdateComment = async () => {
        if (userComment.length > 240) {
            toast.error("El comentario no debe superar los 240 caracteres");
            return;
        }
        if (userRating < 1 || userRating > 10) {
            toast.error("La valoración debe estar entre 1 y 10");
            return;
        }

        try {
            await axios.post("https://api-notepad-production.up.railway.app/comments", {
                movieId,
                userId,
                username,  // Asegúrate de enviar el username
                comment: userComment,
                rating: userRating
            });

            toast.success("Comentario añadido con éxito", { position: "bottom-center" });
            setUserComment("");
            setUserRating(5);
            fetchComments();
        } catch (error) {
            toast.error("Error al añadir comentario", { position: "bottom-center" });
        }
    };


    const handleDeleteComment = async () => {
        try {
            await axios.delete(`https://api-notepad-production.up.railway.app/comments/${movieId}/${userId}`);
            toast.success("Comentario eliminado", { position: "bottom-center" });
            setExistingComment(null);
            setUserComment("");
            setUserRating(5);
            fetchComments();
        } catch (error) {
            toast.error("Error al eliminar comentario", { position: "bottom-center" });
        }
    };

    useEffect(() => {
        fetchMovieDetails();
        fetchComments();
    }, [movieId]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Detalles</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                        <IonButton
                            expand="block"
                            color={isFavorite ? "danger" : "primary"}
                            onClick={isFavorite ? removeFromFavorites : addToFavorites}
                            style={{ marginTop: "1rem" }}
                        >
                            {isFavorite ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
                        </IonButton>
                        <IonSegment
                            value={segmentValue}
                            onIonChange={(e) => setSegmentValue(e.detail.value as string)}
                        >
                            <IonSegmentButton value="info">
                                <IonLabel>Info</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="comments">
                                <IonLabel>Comentarios</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>

                        {segmentValue === "info" && (
                            <div>
                                <h2>{movie.title}</h2>
                                <p>
                                    Estreno: {new Date(movie.release_date).toLocaleDateString()}
                                </p>
                                <p>
                                    Valoración: {movie.vote_average} / 10 ({movie.vote_count}{" "}
                                    votos)
                                </p>
                                <h3>Géneros</h3>
                                {movie.genres.map((genre) => (
                                    <span key={genre.id}>{genre.name} </span>
                                ))}
                                <h3>Resumen</h3>
                                <p>{movie.overview}</p>
                            </div>
                        )}

                        {segmentValue === "comments" && (
                            <div>
                                <h3>Deja un comentario</h3>
                                <IonItem>
                                    <IonTextarea
                                        value={userComment}
                                        onIonChange={(e) => setUserComment(e.detail.value!)}
                                        maxlength={240}
                                        placeholder="Escribe un comentario (máx 240 caracteres)"
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Valoración:</IonLabel>
                                    <IonInput
                                        type="number"
                                        value={userRating}
                                        onIonChange={(e) => setUserRating(Number(e.detail.value))}
                                        min={1}
                                        max={10}
                                    />
                                </IonItem>
                                <IonButton onClick={handleAddOrUpdateComment}>
                                    {existingComment
                                        ? "Actualizar Comentario"
                                        : "Agregar Comentario"}
                                </IonButton>
                                {existingComment && (
                                    <IonButton color="danger" onClick={handleDeleteComment}>
                                        Eliminar Comentario
                                    </IonButton>
                                )}
                                <h3>Comentarios</h3>
                                <IonList>
                                    {comments.length > 0 ? (
                                        comments.map((comment, index) => (
                                            <IonItem key={index}>
                                                <IonLabel>
                                                    <h2>{comment.username}</h2>
                                                    <h3>Valoración: {comment.rating}/10</h3>
                                                    <p>{comment.comment}</p>
                                                </IonLabel>
                                            </IonItem>
                                        ))
                                    ) : (
                                        <p>No hay comentarios disponibles</p>
                                    )}
                                </IonList>
                            </div>
                        )}
                    </div>
                ) : (
                    <IonText>Error al cargar detalles de la película.</IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default MovieDetailsPage;
