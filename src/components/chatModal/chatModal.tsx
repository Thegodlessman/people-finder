import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import jwtDecode from "jwt-decode";
import './chatModal.css'

const socket: Socket = io("https://api-notepad-production.up.railway.app");

type ChatModalProps = {
    friend: { _id: string; username: string; profileImage: string; name: string };
    onClose: () => void;
};

interface Message {
    sender: string | null;
    receiver: string;
    content: string;
    timestamp: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ friend, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return null; // Detenemos el renderizado si no hay token
    }

    const decodedToken: any = jwtDecode(token);

    // Cargar historial de mensajes al montar el componente
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post(
                    `https://api-notepad-production.up.railway.app/getMessages`,
                    { userId: decodedToken.id, friendId: friend._id }, // IDs en el body
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Token de autenticación
                        },
                    }
                );
                setMessages(response.data); // Establecer el historial en el estado
            } catch (error) {
                console.error("Error al obtener mensajes:", error);
            }
        };

        fetchMessages();
    }, [friend._id, decodedToken.id, token]);

    // Conectar al socket cuando el modal se monta
    useEffect(() => {
        socket.emit("joinRoom", { room: friend._id });

        // Escuchar mensajes desde el servidor
        socket.on("receiveMessage", (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Limpiar la conexión al desmontar
        return () => {
            socket.emit("leaveRoom", { room: friend._id });
            socket.off("receiveMessage");
        };
    }, [friend._id]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            sender: decodedToken.id,
            receiver: friend._id,
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        // Enviar mensaje al servidor
        socket.emit("sendMessage", message);

        // Agregar mensaje al estado local
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
    };

    return (
        <div className="chat-modal">
            <h2 className="chat-title">Chat con {friend.username}</h2>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.sender === decodedToken.id ? "chat-sent" : "chat-received"
                            }`}
                    >
                        <p className="message-content">{msg.content}</p>
                        <span className="message-timestamp">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>
            <input
                className="chat-input"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="chat-buttons">
                <button className="send-button" onClick={handleSendMessage}>
                    Enviar
                </button>
                <button className="close-button" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ChatModal;
