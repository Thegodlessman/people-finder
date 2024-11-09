import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonRouterLink, IonInput, IonButton, IonText } from '@ionic/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Register.css'; // Asegúrate de que el archivo Register.css contiene el CSS que adaptamos


const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Verificación de confirmación de contraseña
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden', { position: "bottom-center" });
            return;
        }

        try {
            const response = await axios.post(`https://api-notepad-production.up.railway.app/register`, {
                name,
                lastName,
                username,
                email,
                password
            });
            console.log("Usuario registrado:", response.data);
            toast.success("Usuario registrado con éxito");
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.msg, {
                    position: "bottom-center"
                });
            } else {
                toast.error('Error al registrar usuario', {
                    position: "bottom-center"
                });
            }
            console.error("Error en registro:", error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>¡Bienvenido a <a className='logo-title' href="/">DePelis</a>!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="container"> {/* Añadimos la clase container */}
                <IonText className="register-title">
                    <h2>¡Regístrate!</h2>
                </IonText>
                <div className='inputs-container'>
                    <div className="input-group">
                        <IonInput 
                            placeholder="Ingrese su nombre" 
                            className="input-group__input"
                            value={name} 
                            onIonChange={(e) => setName(e.detail.value!)} 
                        />
                    </div>
                    <div className="input-group">
                        <IonInput 
                            placeholder="Ingrese su apellido" 
                            className="input-group__input"
                            value={lastName} 
                            onIonChange={(e) => setLastName(e.detail.value!)} 
                        />
                    </div>
                    <div className="input-group">
                        <IonInput 
                            placeholder="Ingrese un nombre de usuario" 
                            className="input-group__input"
                            value={username} 
                            onIonChange={(e) => setUsername(e.detail.value!)} 
                        />
                    </div>
                    <div className="input-group">
                        <IonInput 
                            placeholder="Ingrese su correo electrónico" 
                            className="input-group__input"
                            value={email} 
                            onIonChange={(e) => setEmail(e.detail.value!)} 
                        />
                    </div>
                    <div className="input-group">
                        <IonInput 
                            placeholder="Ingrese una contraseña" 
                            type="password" 
                            className="input-group__input"
                            value={password} 
                            onIonChange={(e) => setPassword(e.detail.value!)} 
                        />
                    </div>
                    <div className="input-group">
                        <IonInput 
                            placeholder="Confirme la contraseña" 
                            type="password" 
                            className="input-group__input"
                            value={confirmPassword} 
                            onIonChange={(e) => setConfirmPassword(e.detail.value!)} 
                        />
                    </div>
                </div>
                <ToastContainer />
                <div className='button-container'>
                    <IonButton expand="block" onClick={handleRegister} className="custom-button" fill='clear'>Registrar</IonButton>
                    <IonText className="ion-text-center">
                        <p className='smalltext'>
                            ¿Ya te has registrado? <IonRouterLink href="/login">Iniciar sesión</IonRouterLink>
                        </p>
                    </IonText>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
