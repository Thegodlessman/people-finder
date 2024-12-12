import React, { useState, useEffect } from "react";
import {
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonModal,
    IonButton,
    IonAvatar,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonIcon,
    IonMenuButton,
} from "@ionic/react";
import ChatModal from "../../components/chatModal/chatModal"; // Importa el componente del modal
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { chatbubblesOutline, chevronForward, personOutline } from 'ionicons/icons';

// Define el tipo para los amigos
interface Friend {
    profileImage: string
    _id: string; // Ajusta el tipo según la estructura de tus datos
    username: string; // Ajusta el tipo según la estructura de tus datos
    name: string
    lastName: string
}

const ChatPage: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]); // Lista de amigos con tipo explícito
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null); // Amigo seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }

    const decodedToken: any = jwtDecode(token);

    // Cargar la lista de amigos desde tu API
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.post<Friend[]>(`https://api-notepad-production.up.railway.app/friends`,
                    { userId: decodedToken.id },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token de autenticación
                        },
                    });
                setFriends(response.data);
            } catch (error) {
                console.error("Error al cargar los amigos:", error);
            }
        };

        fetchFriends();
    }, []);

    // Manejar la apertura del modal
    const openChat = (friend: Friend) => {
        setSelectedFriend(friend);
        setIsModalOpen(true);
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
                            <h3 style={{ fontSize: "20px" }}>{decodedToken.fullName}</h3>
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
                    <h1>Lista de Amigos</h1>
                    <IonList>
                        {friends.map((friend) => (
                            <IonItem key={friend._id} button onClick={() => openChat(friend)}>
                                <IonAvatar aria-hidden="true" slot="start">
                                    <img alt="" src={friend.profileImage} />
                                </IonAvatar>
                                <IonLabel><h2>{friend.name} {friend.lastName}</h2>@{friend.username}</IonLabel>
                            </IonItem>
                        ))}
                    </IonList>

                    {/* Modal para el chat */}
                    <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                        {selectedFriend && (
                            <ChatModal
                                friend={selectedFriend}
                                onClose={() => setIsModalOpen(false)}
                            />
                        )}
                    </IonModal>
                </IonContent>
            </IonPage>
        </>
    );
};

export default ChatPage;
