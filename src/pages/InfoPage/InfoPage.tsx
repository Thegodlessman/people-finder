import React from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./InfoPage.css"; // Opcional para estilos personalizados

const InfoPage: React.FC = () => {
    const history = useHistory();

    // Función para volver atrás
    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start" fill="clear" onClick={handleGoBack}>
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                    <IonTitle>Información Básica</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Bienvenido a la página de información</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Caía ceniza del cielo...
                        </p>
                    </IonCardContent>
                    <IonCardContent>
                        <p>
                            Los juramentos han sido pronunciados...
                        </p>
                    </IonCardContent>
                    <IonCardContent>
                        <p>
                            ¿Cual es el paso mas importante que una persona puede dar?...El siguiente siempre es el siguiente
                        </p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default InfoPage;
