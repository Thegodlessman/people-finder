import React, { useState, useEffect } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonSpinner,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
} from "@ionic/react";
import MovieList from "../../components/MoviesList/MoviesList";
import axios from "axios";

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [releaseYear, setReleaseYear] = useState<string>("");
    const [voteAverage, setVoteAverage] = useState<string>("");
    const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const params: any = {};

            if (searchTerm) params.query = searchTerm;
            if (genre) params.genre = genre;
            if (releaseYear) params.release_year = releaseYear;
            if (voteAverage) params.vote_average = voteAverage;

            const response = await axios.get(`https://api-notepad-production.up.railway.app/movies/search`, { params });
            setMovies(response.data || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Buscar Películas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar
                    value={searchTerm}
                    onIonInput={(e) => setSearchTerm(e.detail.value!)}
                    debounce={500}
                    placeholder="Buscar por título"
                />

                <IonButton expand="block" onClick={() => setAdvancedSearch(!advancedSearch)}>
                    {advancedSearch ? "Ocultar Filtros Avanzados" : "Mostrar Filtros Avanzados"}
                </IonButton>

                {advancedSearch && (
                    <div>
                        <IonItem>
                            <IonLabel>Género</IonLabel>
                            <IonSelect value={genre} onIonChange={(e) => setGenre(e.detail.value)}>
                                <IonSelectOption value="">Sin filtro</IonSelectOption>
                                <IonSelectOption value="28">Acción</IonSelectOption>
                                <IonSelectOption value="35">Comedia</IonSelectOption>
                                <IonSelectOption value="18">Drama</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Año de Estreno</IonLabel>
                            <IonSelect value={releaseYear} onIonChange={(e) => setReleaseYear(e.detail.value)}>
                                <IonSelectOption value="">Sin filtro</IonSelectOption>
                                {Array.from({ length: 30 }, (_, i) => (
                                    <IonSelectOption key={i} value={(2024 - i).toString()}>
                                        {2024 - i}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Valoración Mínima</IonLabel>
                            <IonSelect value={voteAverage} onIonChange={(e) => setVoteAverage(e.detail.value)}>
                                <IonSelectOption value="">Sin filtro</IonSelectOption>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <IonSelectOption key={i} value={(i + 1).toString()}>{i + 1}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                    </div>
                )}

                <IonButton expand="block" onClick={fetchMovies}>
                    Buscar
                </IonButton>

                {loading ? <IonSpinner /> : <MovieList movies={movies} />}
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
