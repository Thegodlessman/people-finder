import React, { useState } from 'react';
import axios from 'axios';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonInput, IonButton, IonText, IonRouterLink, IonLabel
} from '@ionic/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const history = useHistory();

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !lastName || !username || !email || !password || !confirmPassword) {
            toast.error('Todos los campos son obligatorios.', { position: 'bottom-center' });
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('El correo electrónico no es válido.', { position: 'bottom-center' });
            return false;
        }
        if (password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres.', { position: 'bottom-center' });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.', { position: 'bottom-center' });
            return false;
        }
        return true;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('lastName', lastName);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImage) formData.append('profileImage', profileImage);

        try {
            const response = await axios.post(
                `https://api-notepad-production.up.railway.app/register`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            toast.success('Usuario registrado con éxito.', { position: 'bottom-center' });
            setTimeout(() => history.push('/login'), 3000);
        } catch (error: any) {
            const errorMsg = error.response?.data?.msg || 'Error al registrar usuario.';
            toast.error(errorMsg, { position: 'bottom-center' });
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">DePelis!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="container">
                <h1 className="login-title">Crear cuenta</h1>
                <IonInput placeholder="Nombre" value={name} onIonChange={(e) => setName(e.detail.value!)} />
                <IonInput placeholder="Apellido" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} />
                <IonInput placeholder="Usuario" value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
                <IonInput placeholder="Correo" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                <IonInput type="password" placeholder="Contraseña" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                <IonInput type="password" placeholder="Confirmar contraseña" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
                <input type="file" onChange={handleImageChange} />
                <ToastContainer />
                <IonButton expand="block" onClick={handleRegister}>Registrar</IonButton>
                <IonText>¿Ya tienes cuenta? <IonRouterLink href="/login">Inicia sesión</IonRouterLink></IonText>
            </IonContent>
        </IonPage>
    );
};

export default Register;
