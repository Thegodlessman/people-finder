import React, { useState, useEffect } from "react";
import {
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonIcon,
    IonCard,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonPage,
    IonMenuButton,
    IonAvatar
} from '@ionic/react';
import { chatbubblesOutline, chevronForward, imageOutline, peopleCircleOutline, peopleOutline, personOutline } from 'ionicons/icons';
import { toast, ToastContainer } from "react-toastify";
import {
    personCircleOutline,
    cogOutline,
    informationCircleOutline,
    heartOutline,
    searchOutline,
    homeOutline,
    trashBinOutline,
    logOutOutline,
} from "ionicons/icons";
import "./ProfilePage.css";
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>(
        "../../assets/images/default-profile.png"
    );
    const [profileName, setProfileName] = useState<string>("Nombre del Perfil");
    const [showChangePhoto, setShowChangePhoto] = useState(false)
    const [showConfig, setShowConfig] = useState(false);
    const history = useHistory();

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;
    // Cargar nombre de perfil desde el token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setProfileName(decodedToken.fullName || "Nombre del Perfil");
            setProfileImage(decodedToken.profileImage || profileImage); // Cargar imagen de perfil desde el token si existe
        }
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/login");
    };

    // Función para extraer el userId del token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload del token
        return decodedToken.id;  // Asegúrate de que el userId esté en el token
    };


    // Función para eliminar la cuenta
    const handleDeleteAccount = async () => {
        try {
            const response = await fetch("https://api-notepad-production.up.railway.app/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                toast.success("Cuenta eliminada exitosamente", {
                    position: "bottom-center",
                });
                handleLogout();
            } else {
                toast.error("Hubo un error al intentar borrar la cuenta", {
                    position: "bottom-center",
                });
            }
        } catch (error) {
            console.error("Error al eliminar la cuenta:", error);
        }
    };

    // Función para cambiar la imagen de perfil
    const handleChangeProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);

            // Agregar el userId al formData
            try {
                const userId = getUserIdFromToken();  // Obtener el userId del token
                formData.append('userId', userId);    // Agregar userId a los datos

                const response = await fetch("https://api-notepad-production.up.railway.app/upload", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    // Si la respuesta no es ok, lanzamos un error con el cuerpo de la respuesta
                    const errorText = await response.text(); // Leer la respuesta como texto
                    console.error('Error del servidor:', errorText);
                    toast.error("Error al subir la imagen");
                    return;
                }

                // Si la respuesta es correcta, intentamos obtener el JSON
                try {
                    const data = await response.json();
                    const newProfileImageUrl = data.profileImage;  // Asumiendo que el endpoint responde con profileImage
                    setProfileImage(newProfileImageUrl); // Actualiza la imagen de perfil
                    toast.success("Imagen de perfil actualizada correctamente", {
                        position: 'bottom-center',
                    });
                } catch (jsonError) {
                    console.error('Error al analizar la respuesta JSON:', jsonError);
                    toast.error("La respuesta del servidor no es un JSON válido.");
                }
            } catch (error) {
                console.error("Error al obtener userId o subir la imagen:", error);
                toast.error("Error al subir la imagen");
            }
        }
    };


    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">

                    <IonItem lines='none' href='/home/profile'>
                        <IonAvatar aria-hidden="true" slot="start">
                            <img alt="" src={decodedToken.profileImage} />
                        </IonAvatar>
                        <IonLabel>
                            <h3 style={{ fontSize: "18px" }}>{decodedToken.fullName}</h3>
                            <span style={{ fontSize: "15px", color: "grey" }}>@{decodedToken.username}</span>
                            <p>Ver perfil</p>
                        </IonLabel>
                        <div slot='end'>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>

                </IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton>
                                <IonIcon slot="icon-only" icon={personOutline} />
                            </IonMenuButton>
                        </IonButtons>
                        <IonTitle> <a href='/finder' className='title-app'> people finder </a></IonTitle>
                        <IonButtons slot='end'>
                            <IonButton href="/chats">
                                <IonIcon slot="icon-only" icon={chatbubblesOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="image-container">
                        <img src={profileImage} className="round-image" alt="Perfil" />
                    </div>
                    <h1 className="image-title" style={{ color: 'white', fontSize: "30px" }}>{profileName}</h1>
                    <h3 className="image-title" style={{ color: 'grey', marginBottom: "20px" }}>@{decodedToken.username}</h3>

                    <IonCard>
                        <IonList>
                            <IonItem button>
                                <IonIcon aria-hidden="true" icon={peopleOutline} slot="start" />
                                <IonLabel>Cambiar nombre</IonLabel>
                            </IonItem>

                            <IonItem button onClick={() => setShowChangePhoto(!showChangePhoto)}>
                                <IonIcon aria-hidden="true" icon={imageOutline} slot="start" />
                                <IonLabel>Cambiar foto</IonLabel>
                            </IonItem>

                            {showChangePhoto && (
                                <div style={{ padding: "10px" }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChangeProfileImage}
                                        style={{ marginBottom: "10px" }}
                                    />
                                </div>
                            )}

                            <IonItem lines="none" button>
                                <IonIcon aria-hidden="true" icon={informationCircleOutline} slot="start" />
                                <IonLabel>Informacion</IonLabel>
                            </IonItem>
                            <IonItem button onClick={() => setShowConfig(!showConfig)}>
                                <IonIcon aria-hidden="true" icon={trashBinOutline} slot="start" />
                                <IonLabel>Eliminar cuenta</IonLabel>
                            </IonItem>
                            {showConfig && (
                                <div style={{ padding: "10px" }}>
                                    <IonButton expand="block" color="danger" onClick={handleDeleteAccount}>
                                        Eliminar Cuenta
                                    </IonButton>
                                </div>
                            )}
                        </IonList>
                    </IonCard>
                    <IonButton expand="block" color="primary" onClick={handleLogout}>
                        <IonIcon slot="start" icon={logOutOutline} />
                        Cerrar Sesión
                    </IonButton>
                    <ToastContainer />
                </IonContent>
            </IonPage>
        </>
    );
};

export default ProfilePage;
