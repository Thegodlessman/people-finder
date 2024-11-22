import React, { useState, useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSpinner, IonSelect, IonSelectOption, IonButton } from "@ionic/react";
import MovieList from "../../components/MoviesList/MoviesList";
import axios from "axios";

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [releaseYear, setReleaseYear] = useState<string>("");
    const [voteAverage, setVoteAverage] = useState<string>("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (searchTerm) params.append('query', searchTerm);
            if (genre) params.append('genre', genre);
            if (releaseYear) params.append('release_year', releaseYear.toString());
            if (voteAverage) params.append('vote_average', voteAverage.toString());

            const response = await axios.get(
                `https://api-notepad-production.up.railway.app/movies/search?${params.toString()}`
            );
            setMovies(response.data.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [searchTerm, genre, releaseYear, voteAverage]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="text-align">Buscar Películas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar
                    value={searchTerm}
                    onIonInput={(e) => setSearchTerm(e.detail.value!)}
                    debounce={500}
                    placeholder="Buscar por título"
                />

                <IonSelect placeholder="Seleccionar género" value={genre} onIonChange={(e) => setGenre(e.detail.value)}>
                    <IonSelectOption value="28">Acción</IonSelectOption>
                    <IonSelectOption value="35">Comedia</IonSelectOption>
                    <IonSelectOption value="18">Drama</IonSelectOption>
                    {/* Agregar más opciones según tus necesidades */}
                </IonSelect>

                <IonSelect placeholder="Año de estreno" value={releaseYear} onIonChange={(e) => setReleaseYear(e.detail.value)}>
                    {Array.from({ length: 30 }, (_, i) => (
                        <IonSelectOption key={i} value={(2024 - i).toString()}>{2024 - i}</IonSelectOption>
                    ))}
                </IonSelect>

                <IonSelect placeholder="Valoración mínima" value={voteAverage} onIonChange={(e) => setVoteAverage(e.detail.value)}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <IonSelectOption key={i} value={(i + 1).toString()}>{i + 1}</IonSelectOption>
                    ))}
                </IonSelect>

                <IonButton expand="block" onClick={fetchMovies}>
                    Buscar
                </IonButton>

                {loading ? <IonSpinner /> : <MovieList movies={movies} />}
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
