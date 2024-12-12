import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import jwtDecode from 'jwt-decode';

const socket: Socket = io("https://api-notepad-production.up.railway.app");

type ChatModalProps = {
    friend: { _id: string; username: string; profileImage: string; name: string };
    onClose: () => void;
};

const ChatModal: React.FC<ChatModalProps> = ({ friend, onClose }) => {
    const [messages, setMessages] = useState<{
        sender: string | null;
        receiver: string;
        content: string;
        timestamp: string;
    }[]>([]);

    const [newMessage, setNewMessage] = useState<string>("");

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }

    const decodedToken: any = jwtDecode(token);

    // Conectar al socket cuando el modal se monta
    useEffect(() => {
        socket.emit("joinRoom", { room: friend._id });

        // Escuchar mensajes desde el servidor
        socket.on("receiveMessage", (message) => {
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
        <div className="modal">
            <h2>Chat con {friend.username}</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.sender === "currentUser" ? "sent" : "received"}
                    >
                        <p>{msg.content}</p>
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Enviar</button>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};

export default ChatModal;
