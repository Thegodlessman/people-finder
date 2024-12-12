import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonInput, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Message {
    _id: string;
    senderId: string;
    content: string;
    type: 'text' | 'image';
    timestamp: string;
}

const ChatPage: React.FC = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/chats/${chatId}/messages`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessages(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [chatId]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `/api/chats/${chatId}/messages`,
                { content: newMessage, type: 'text' },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {loading ? (
                        <IonItem>Loading messages...</IonItem>
                    ) : (
                        messages.map((msg) => (
                            <IonItem key={msg._id} className={msg.senderId === localStorage.getItem('userId') ? 'sent' : 'received'}>
                                <IonLabel>
                                    <p>{msg.content}</p>
                                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                                </IonLabel>
                            </IonItem>
                        ))
                    )}
                </IonList>
            </IonContent>
            <IonFooter>
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                    <IonInput
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onIonChange={(e) => setNewMessage(e.detail.value!)}
                        style={{ flex: 1 }}
                    />
                    <IonButton onClick={sendMessage}>Enviar</IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default ChatPage;
