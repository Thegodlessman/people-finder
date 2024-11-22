import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonLabel, IonImg, IonThumbnail } from '@ionic/react';

import './MovieList.css'

interface MovieListProps {
    movies: any[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    const history = useHistory();

    return (
        <IonList>
            {movies.map((movie, index) => {
                const imageUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';

                return (
                    <IonItem key={index} className='movies-list-item' onClick={() => history.push(`/movie/${movie.id}`)} >
                        <IonThumbnail slot="start">
                            <IonImg src={imageUrl} alt={`Poster de ${movie.title}`} />
                        </IonThumbnail>
                        <IonLabel><h2>{movie.title}</h2></IonLabel>
                    </IonItem>
                );
            })}
        </IonList>
    );
};

export default MovieList;
