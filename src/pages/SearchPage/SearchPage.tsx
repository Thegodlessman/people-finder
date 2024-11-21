import React, { useState, useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSpinner } from "@ionic/react";
import MovieList from "../../components/MoviesList/MoviesList";
import axios from "axios";

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = searchTerm
                    ? await axios.get(`https://api-notepad-production.up.railway.app/movies/search`, {
                        params: { query: searchTerm },
                    })
                    : await axios.get("https://api-notepad-production.up.railway.app/movies");

                setMovies(response.data.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchTerm]);

    return (
        <IonPage>
                <IonToolbar>
                    <IonTitle className="text-aling">Buscar Películas</IonTitle>
                </IonToolbar>
            <IonContent>
                <IonSearchbar
                    value={searchTerm}
                    onIonInput={(e) => setSearchTerm(e.detail.value!)}
                    debounce={500}
                    placeholder="Buscar por título"
                />
                {loading ? (
                    <IonSpinner />
                ) : (
                    <MovieList/>
                )}
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
