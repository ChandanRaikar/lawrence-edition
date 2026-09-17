'use client';
import { FaEnvelope } from "react-icons/fa"
import { FaEnvelopeOpen } from "react-icons/fa"
import { useState } from 'react';
import { toast } from "react-toastify";
import messageRead from "../actions/messageRead";
import messageDelete from "../actions/messageDelete";
import { useGlobalContext } from "../context/GlobalContext";

export default function MessageCard({ message }) {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setUnreadMessages } = useGlobalContext();


    const handleMessageRead = async () => {
        const readMessages = await messageRead(message._id);
        setIsRead(readMessages);
        setUnreadMessages((prevCount) => (readMessages ? prevCount - 1 : prevCount + 1))
        toast.success(`Marked as ${readMessages ? "Read" : "New"}`)
    }

    const handleMessageDelete = async () => {
        await messageDelete(message._id);
        setIsDeleted(true);
        setUnreadMessages((prevCount) => (isRead ? prevCount : prevCount - 1))
        toast.success('Message Deleted')
    }

    return (
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">

            {!isRead && (<div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">New</div>)}

            <h2 className="text-xl mb-4">
                {message.read ? (<FaEnvelopeOpen className="inline-block mr-4" />) : (<FaEnvelope className="inline-block mr-4" />)}
                <span className="font-bold">Property Inquiry:</span> {''}
                {message.property.name}
            </h2>
            <p className="text-gray-700">{message.body}</p>
            <ul className="mt-4">
                <li>
                    <strong>Reply Email:</strong>{' '}
                    <a href={`mailto:${message.email}`} className="text-blue-700">
                        ${message.email}
                    </a>
                </li>
                <li>
                    <strong>Reply Phone:</strong>{' '}
                    <a href={`tel:${message.phone}`} className="text-blue-700">
                        ${message.phone}
                    </a>
                </li>
                {/* <li>
                    <strong>Recived on:</strong>{' '}
                    {new Date(message.createdAt).toLocaleString()}
                </li> */}
            </ul>
            <button onClick={handleMessageRead} className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
                {isRead ? 'Mark as unread' : 'Mark as read'}
            </button>
            <button onClick={handleMessageDelete} className="mt-4 mr-3 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md">
                Delete
            </button>
        </div>
    )
}