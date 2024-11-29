import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // Validación de email con expresión regular
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        // Validar email
        if (!loginValue || !validateEmail(loginValue)) {
            toast.error('Por favor ingresa un email válido', {
                position: "bottom-center"
            });
            return;
        }

        // Validar contraseña
        if (!password) {
            toast.error('La contraseña es obligatoria', {
                position: "bottom-center"
            });
            return;
        }

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
                history.push('/home'); // Redirige a la página de inicio
            }, 3000);

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
                    <IonTitle class="ion-text-center">DePelis!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                    <div className="ion-header">
                        <h1 className="login-title">Iniciar Sesion</h1>
                        <label className="login-subtitle">Únase a nuestra comunidad y experimente una búsqueda perfecta de películas</label>
                    </div>
                    <div className="ion-item">
                        <IonInput
                            label='Email'
                            fill='solid'
                            labelPlacement="floating"
                            placeholder="Ingresa tu email"
                            value={loginValue}
                            onIonChange={(e) => setLoginValue(e.detail.value!)}
                        />
                    </div>
                    <div className='ion-item'>
                        <IonInput
                            label='Contraseña'
                            fill='solid'
                            labelPlacement="floating"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                        />
                    </div>
                </div>
                <IonButton color='dark' expand='block' onClick={handleLogin}>Iniciar sesión</IonButton>
                <IonText>
                    <p className='smalltext'>
                        ¿Aún no tienes cuenta? <a href="/register">Regístrate</a>
                    </p>
                </IonText>

                <ToastContainer />
            </IonContent>
        </IonPage>
    );
};

export default Login;
