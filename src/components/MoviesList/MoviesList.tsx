import React from 'react';
import { useHistory } from "react-router-dom";
import { IonList, IonItem, IonLabel, IonImg, IonThumbnail } from '@ionic/react';
import './MovieList.css';

interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    [key: string]: any;
}

interface MovieListProps {
    movies?: Movie[]; // Ahora es opcional
}

const MovieList: React.FC<MovieListProps> = ({ movies = [] }) => { // Valor por defecto para evitar errores
    const history = useHistory();

    if (!movies || movies.length === 0) {
        return <p>No se encontraron películas.</p>;
    }

    return (
        <IonList>
            {movies.map((movie) => {
                const imageUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';

                return (
                    <IonItem
                        key={movie.id} // Usamos `movie.id` como clave única
                        className='movies-list-item'
                        onClick={() => history.push(`/movie/${movie.id}`)}
                    >
                        <IonThumbnail slot="start">
                            <IonImg src={imageUrl} alt={`Poster de ${movie.title}`} />
                        </IonThumbnail>
                        <IonLabel>
                            <h2>{movie.title}</h2>
                        </IonLabel>
                    </IonItem>
                );
            })}
        </IonList>
    );
};

export default MovieList;
