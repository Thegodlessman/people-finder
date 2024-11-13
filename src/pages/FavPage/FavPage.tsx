import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from "@ionic/react";
import axios from 'axios';

interface Movie {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
}

const FavPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    // Cargar favoritos desde el backend al montar el componente
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/api/favorites'); // Cambiar por la ruta correcta de tu endpoint
                setFavorites(response.data);
            } catch (error) {
                console.error("Error al obtener favoritos", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar style={{ padding: '7px' }}>
                    <IonTitle class="ion-text-center">Favoritos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        {favorites.map(movie => (
                            <IonCol key={movie.id} size="6">
                                <IonCard color="light">
                                    <img alt={movie.title} src={movie.imageUrl} />
                                    <IonCardHeader>
                                        <IonCardTitle>{movie.title}</IonCardTitle>
                                        <IonCardSubtitle>{movie.subtitle}</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>{movie.content}</IonCardContent>
                                    {/* Botón para eliminar de favoritos, opcional */}
                                    <IonButton color="danger" expand="full" >
                                        Eliminar de Favoritos
                                    </IonButton>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default FavPage;
