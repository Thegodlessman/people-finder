import React, { useState, useEffect } from "react";
import {
    IonContent,
    IonPage,
    IonToolbar,
    IonTitle,
    IonCard,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    IonButton,
} from "@ionic/react";
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

const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>(
        "../../assets/images/default-profile.png"
    );
    const [profileName, setProfileName] = useState<string>("Nombre del Perfil");
    const [showConfig, setShowConfig] = useState(false);
    const history = useHistory();

    // Cargar nombre de perfil desde el token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar token
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
                    toast.success("Imagen de perfil actualizada correctamente");
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
        <IonPage>
            <IonToolbar style={{ padding: "7px" }}>
                <IonTitle className="text-align">Perfil</IonTitle>
            </IonToolbar>
            <IonContent>
                <div className="image-container">
                    <img src={profileImage} className="round-image" alt="Perfil" />
                </div>
                <h1 className="image-title" style={{ color: 'white' }}>{profileName}</h1>

                <IonCard>
                    <IonList>
                        <IonItem button onClick={() => setShowConfig(!showConfig)}>
                            <IonIcon aria-hidden="true" icon={cogOutline} slot="start" />
                            <IonLabel>Configuraciones</IonLabel>
                        </IonItem>
                        {showConfig && (
                            <div style={{ padding: "10px" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeProfileImage}
                                    style={{ marginBottom: "10px" }}
                                />
                                <IonButton expand="block" color="danger" onClick={handleDeleteAccount}>
                                    <IonIcon slot="start" icon={trashBinOutline} />
                                    Eliminar Cuenta
                                </IonButton>
                            </div>
                        )}
                        <IonItem button onClick={() => history.push("/info")}>
                            <IonIcon aria-hidden="true" icon={informationCircleOutline} slot="start" />
                            <IonLabel>Información</IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>

                <IonButton expand="block" color="primary" onClick={handleLogout}>
                    <IonIcon slot="start" icon={logOutOutline} />
                    Cerrar Sesión
                </IonButton>
                <ToastContainer />
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
