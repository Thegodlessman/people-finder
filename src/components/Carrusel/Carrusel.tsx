import React, { useEffect, useState } from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSpinner, IonItem } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from "react-router-dom";
import 'swiper/css';
import axios from "axios";
import './Carrusel.css';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

interface MovieCarouselProps {
    category: string;
}

// Mapeo de títulos personalizados para las categorías
const categoryTitles: Record<string, string> = {
    popular: "Las más populares",
    top_rated: "Mejor valoradas",
    upcoming: "Próximamente",
    action: "Películas de Acción",
    comedy: "Películas de Comedia",
    horror: "Películas de Terror",
    // Agrega más categorías según sea necesario
};

const MovieCarousel: React.FC<MovieCarouselProps> = ({ category }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api-notepad-production.up.railway.app/movies/category/${category}`);
                setMovies(response.data.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [category]);

    // Obtener el título personalizado o usar el nombre crudo de la categoría si no se encuentra
    const displayTitle = categoryTitles[category] || category;

    return (
        <div>
            <IonItem className="category-title" style={{ color: 'white' }}>{displayTitle}</IonItem>
            {loading ? (
                <IonSpinner />
            ) : (
                <Swiper slidesPerView={2} spaceBetween={10} centeredSlides autoplay={{ delay: 3000 }}>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <IonCard
                                className="card"
                                onClick={() => history.push(`/movie/${movie.id}`)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ width: '100%', borderRadius: '8px 8px 0 0' }}
                                />
                                <IonCardHeader>
                                    <IonCardSubtitle>{new Date(movie.release_date).getFullYear()}</IonCardSubtitle>
                                    <IonCardTitle className="card-title">{movie.title}</IonCardTitle>

                                </IonCardHeader>
                            </IonCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default MovieCarousel;
