import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import TinderCard from 'react-tinder-card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FindFriendsPage.css';
import {
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonPage,
    IonMenuButton,
    IonAvatar
} from '@ionic/react';
import { chatbubblesOutline, chevronForward, personOutline } from 'ionicons/icons';

import defaultImage from '../../assets/images/default-profile.png';
import { personAddOutline } from 'ionicons/icons';


const FindFriendsPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [friendRequests, setFriendRequests] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const decodedToken: any = jwtDecode(token);
                const userId = decodedToken.id;

                const response = await axios.post(
                    'https://api-notepad-production.up.railway.app/users',
                    { userId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setUsers(response.data);

                const friendRequestResponse = await axios.post(
                    'https://api-notepad-production.up.railway.app/friend-requests',
                    { userId: userId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setFriendRequests(friendRequestResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSwipe = async (direction: string, user: any) => {
        if (!user) return;

        if (direction === 'right') {
            try {

                await axios.post(
                    'https://api-notepad-production.up.railway.app/friend-request/send',
                    {
                        targetUserId: user._id,
                        userId: userId,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success(`Solicitud de amistad enviada a ${user.name}`, {
                    position: 'bottom-center',
                });
            } catch (error) {
                console.error('Error sending friend request:', error);
                toast.error('Error al enviar la solicitud de amistad', {
                    position: 'bottom-center',
                });
            }
        } else if (direction === 'left') {
            toast.info(`Ignoraste a ${user.name}`, {
                position: 'bottom-center',
            });
        }

        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleAcceptRequest = async (requestUserId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.id;

            await axios.post(
                'https://api-notepad-production.up.railway.app/friend-request/accept',
                { userId, requestUserId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Solicitud de amistad aceptada', {
                position: 'bottom-center',
            });

            setFriendRequests(friendRequests.filter((req) => req._id !== requestUserId));
        } catch (error) {
            console.error('Error accepting friend request:', error);
            toast.error('Error al aceptar la solicitud de amistad', {
                position: 'bottom-center',
            });
        }
    };

    const handleRejectRequest = async (requestUserId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.id;

            await axios.post(
                'https://api-notepad-production.up.railway.app/friend-request/reject',
                { requestUserId, userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.info('Solicitud de amistad rechazada', {
                position: 'bottom-center',
            });

            setFriendRequests(friendRequests.filter((req) => req._id !== requestUserId));
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            toast.error('Error al rechazar la solicitud de amistad', {
                position: 'bottom-center',
            });
        }
    };

    const currentUser = users[currentIndex];

    return (
        <><IonMenu contentId="main-content">
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


                <IonList lines='full'>
                    <p color='medium'>Configuraciones</p>
                    <IonItem>
                        <IonLabel>Gestion de la cuenta</IonLabel>
                        <div slot='end'>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Notificaciones</IonLabel>
                        <div slot='end'>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Privacidad y datos</IonLabel>
                        <div slot='end'>
                            <IonIcon color="medium" icon={chevronForward}></IonIcon>
                        </div>
                    </IonItem>
                </IonList>

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
                        <IonTitle> <a href='/finder'> people finder </a></IonTitle>
                        <IonButtons slot='end'>
                            <IonButton href="/chats">
                                <IonIcon slot="icon-only" icon={chatbubblesOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <div className="find-friends-page">
                    <h1>Encuentra Amigos</h1>
                    <div className="card-container">
                        {currentUser ? (
                            <TinderCard
                                className="swipe"
                                key={currentUser._id}
                                onSwipe={(dir) => handleSwipe(dir, currentUser)}
                                preventSwipe={["up", "down"]}
                            >
                                <div className="card">
                                    <img
                                        className="profile-image"
                                        src={currentUser.profileImage || defaultImage}
                                        alt={`${currentUser.name} ${currentUser.lastName}`}
                                    />
                                    <div className="card-info">
                                        <h2 style={{ color: 'black' }}>
                                            {currentUser.name} {currentUser.lastName}
                                        </h2>
                                        <p>@{currentUser.username}</p>
                                    </div>
                                </div>
                            </TinderCard>
                        ) : (
                            <div className="no-more-users">¡No hay más usuarios para mostrar!</div>
                        )}
                    </div>

                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={() => setShowModal(true)}>
                            <IonIcon icon={personAddOutline} />
                        </IonFabButton>
                    </IonFab>

                    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                        <div className="modal-content">
                            <h2>Solicitudes de Amistad</h2>
                            <IonList>
                                {friendRequests.map((request) => (
                                    <IonItem key={request._id}>
                                        <IonLabel>
                                            {request.name} {request.lastName} @{request.username}
                                        </IonLabel>
                                        <IonButton color="success" onClick={() => handleAcceptRequest(request._id)}>
                                            Aceptar
                                        </IonButton>
                                        <IonButton color="danger" onClick={() => handleRejectRequest(request._id)}>
                                            Rechazar
                                        </IonButton>
                                    </IonItem>
                                ))}
                            </IonList>
                            <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
                        </div>
                    </IonModal>

                    <ToastContainer />
                </div>
            </IonPage>
        </>
    );
};

export default FindFriendsPage;
