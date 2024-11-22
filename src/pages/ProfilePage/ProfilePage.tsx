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

// Firebase imports
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../firebaseConfig"


const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>(
        "https://live.staticflickr.com/8258/8683827826_7345599262_b.jpg"
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
        }
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/login");
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

    // Función para cambiar la foto de perfil
    const handleChangeProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (event.target.files && event.target.files[0]) {
        //     const file = event.target.files[0];
        //     const storage = getStorage();
        //     const storageRef = ref(storage, `profile-images/${file.name}`);

        //     try {
        //         await uploadBytes(storageRef, file);
        //         const url = await getDownloadURL(storageRef);
        //         setProfileImage(url);
        //         toast.success("Imagen de perfil actualizada correctamente");
        //     } catch (error) {
        //         console.error("Error al subir la imagen:", error);
        //         toast.error("Error al subir la imagen");
        //     }
        // }
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
                        <IonItem button onClick={() => history.push("/home")}>
                            <IonIcon aria-hidden="true" icon={homeOutline} slot="start" />
                            <IonLabel>Inicio</IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => history.push("/home/search")}>
                            <IonIcon aria-hidden="true" icon={searchOutline} slot="start" />
                            <IonLabel>Buscar</IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => history.push("/home/favorite")}>
                            <IonIcon aria-hidden="true" icon={heartOutline} slot="start" />
                            <IonLabel>Guardados</IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>

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
