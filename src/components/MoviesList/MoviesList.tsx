// src/components/MovieList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonLabel, IonImg, IonThumbnail } from '@ionic/react';

import './MovieList.css'

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

    useEffect(() => {
        loadMovies();
    }, [page]);

    const loadMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:5757/movies`, { params: { page } });
            const newMovies = response.data.peliculas;

            // Añadir las nuevas películas a la lista existente
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);

            // Deshabilitar el infinite scroll si no hay más páginas
            if (page >= response.data.total_pages) {
                setIsInfiniteDisabled(true);
            }
        } catch (error) {
            console.error('Error al cargar las películas:', error);
        }
    };

    const loadMoreMovies = (event: CustomEvent<void>) => {
        setPage((prevPage) => prevPage + 1);
        setTimeout(() => {
            (event.target as HTMLIonInfiniteScrollElement).complete();
        }, 500);
    };

    return (
        <IonList>
            {movies.map((movie, index) => {
                // Verificar y construir la URL de la imagen
                const imageUrl = movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`// comentario
                    : 'https://via.placeholder.com/500x750?text=No+Image'; // Imagen de reserva si no hay poster_path

                return (
                    <IonItem key={index} className='movies-list-item'>
                        <IonThumbnail slot="start">
                            <IonImg src={imageUrl} alt={`Poster de ${movie.title}`} />
                        </IonThumbnail>
                        <IonLabel><h2>{movie.title}</h2></IonLabel>
                    </IonItem>
                );
            })}

            <IonInfiniteScroll
                threshold="100px"
                disabled={isInfiniteDisabled}
                onIonInfinite={(e) => loadMoreMovies(e)}
            >
                <IonInfiniteScrollContent
                    loadingSpinner="bubbles"
                    loadingText="Cargando más películas..."
                ></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonList>
    );
};

export default MovieList;
