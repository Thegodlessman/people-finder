// src/pages/RegisterInfoPage.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const RegisterInfoPage: React.FC = () => {
    const history = useHistory();

    const handleRedirectToRegister = () => {
        history.push('/register'); // Redirige al formulario de registro
    };

    const handleRedirectToLogin = () => {
        history.push('/login')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Información</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonText style={{marginBottom: 10}} color="medium">
                    <h2>No tienes los permisos necesarios</h2>
                    <p>Para acceder a esta sección, por favor regístrate o inicia sesión primero.</p>
                </IonText>
                <IonButton expand="block" style={{marginBottom: 15}} onClick={handleRedirectToRegister}>
                    Registrarse
                </IonButton>
                <IonButton expand="block" onClick={handleRedirectToLogin}>
                    Iniciar Sesión
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default RegisterInfoPage;
