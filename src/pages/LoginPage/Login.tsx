import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'; // Importa useHistory

const Login: React.FC = () => {
    const [loginValue, setLoginValue] = useState(''); 
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://api-notepad-production.up.railway.app/login', {
                loginValue, 
                password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success('Inicio de sesión exitoso', {
                position: "bottom-center"
            });

            setTimeout(() => {
                history.push('/home'); // Redirige a la página de login
            }, 3000); // 3000 ms = 3 segundos

        } catch (error: any) {
            toast.error('Error al iniciar sesión', {
                position: "bottom-center"
            });
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="container">
                <div className="inputs-container">
                    <IonItem>
                        <IonInput 
                            placeholder="Usuario o Email"
                            value={loginValue}
                            onIonChange={(e) => setLoginValue(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput 
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                        />
                    </IonItem>
                    
                </div>
                <IonButton expand="block" onClick={handleLogin}>Iniciar sesión</IonButton>
                <ToastContainer />
            </IonContent>
        </IonPage>
    );
};

export default Login;
