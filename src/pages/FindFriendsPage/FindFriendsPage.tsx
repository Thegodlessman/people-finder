import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import TinderCard from 'react-tinder-card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FindFriendsPage.css';


const FindFriendsPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                // Decodificar el token para obtener el userId
                const decodedToken: any = jwtDecode(token);
                const userId = decodedToken.id;

                const response = await axios.post(
                    'https://api-notepad-production.up.railway.app/users',
                    { userId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSwipe = async (direction: string, user: any) => {
        if (!user) return;

        if (direction === 'right') {
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    '/api/friend-request',
                    { targetUserId: user._id },
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

    const currentUser = users[currentIndex];

    return (
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
                        <div className="card" style={{ backgroundImage: `url(${currentUser.profileImage || '/default-profile.png'})` }}>
                            <div className="card-info">
                                <h2>
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
        </div>
    );
};

export default FindFriendsPage;
