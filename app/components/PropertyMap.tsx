'use client'
import { setGlobal } from "next/dist/trace";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";

export default function PropertyMap({ property }) {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [viewport, setviewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });

    const [loading, setLoading] = useState(true);
    const [geocodeError, setgeocodeError] = useState(false);

    setDefaults({
        key: process.env.GOOGLE_GEOCODE_API,
        language: "en",
        region: "es",
    })

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`)
                if (res.results.length === 0) {
                    setgeocodeError(true)
                    return;
                }
                const { lat, lng } = res.results[0].geometry.location;
                setLat(lat)
                setLon(lng)
                setviewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng
                });
            }
            catch (error) {
                console.log(error);
                setgeocodeError(true)
            } finally {
                setLoading(false);
            }
        }
        fetchCoords();
    })
    if (loading) return (<h1>Loading...</h1>)
    if (geocodeError) {
        return (<div>Location not found</div>)
    }
    return (<div>
        map
    </div>)
}