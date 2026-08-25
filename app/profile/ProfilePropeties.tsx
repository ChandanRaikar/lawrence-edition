'use client';
import { useState } from "react"
import Link from "next/link";
import Image from "next/image";
import deleteProperty from "../actions/deleteProperty";
import { toast } from "react-toastify";


export default function ProfileProperties({ properties: initialProperties }) {
    const [properties, setProperties] = useState(initialProperties);


    const handleDeleteProperty = async (propertyId) => {
        const confirmed = window.confirm("Are you sure to delete this property?")
        if (!confirmed) {
            return;
        }
        await deleteProperty(propertyId);
        const updatedProperties = properties.filter((property) => property._id !== propertyId)
        setProperties(updatedProperties);
        toast.success('Property delete successfully!')
    }

    return (
        properties.map((property, index) => (
            <div className="mb-10" key={index}>
                <Link href={`/properties/${property._id}`}>
                    <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        width={1000}
                        height={200}
                        alt="Property 1"
                    />
                </Link>
                <div className="mt-2">
                    <p className="text-lg font-semibold">{property.name}</p>
                    <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state}</p>
                </div>
                <div className="mt-2">
                    <Link
                        href="/add-property.html"
                        className="bg-green-700 text-white px-3 py-2 rounded-md mr-2 hover:bg-green-800"
                    >
                        Edit
                    </Link>
                    <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleDeleteProperty(property._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))
    )
}