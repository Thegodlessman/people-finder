import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel } from "@ionic/react";

const SearchPage: React.FC = () => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>Búsqueda de Películas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* Search bar para capturar la entrada del usuario */}
                <IonSearchbar
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                    placeholder="Buscar películas..."
                />
                
                {/* Placeholder para resultados */}
                <IonList>
                    {searchText ? (
                        <IonItem>
                            <IonLabel>Resultados para: "{searchText}"</IonLabel>
                        </IonItem>
                    ) : (
                        <IonItem>
                            <IonLabel>Introduce un término de búsqueda para comenzar.</IonLabel>
                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
