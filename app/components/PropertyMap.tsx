'use client'
import { setGlobal } from "next/dist/trace";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map from "react-map-gl/mapbox";
import { Marker } from "react-map-gl/mapbox";
import Image from "next/image";
import pin from '@/app/assets/images/pin.svg'
import Spinner from "./Spinner";
import 'mapbox-gl/dist/mapbox-gl.css';

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
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        region: 'us',
        outputFormat: 'json'
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
    }, []);

    if (loading) return (<Spinner />)
    if (geocodeError) {
        return (<div>Location not found</div>)
    }
    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: lon,
                latitude: lat,
                zoom: 18
            }}
            style={{ width: '100%', height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9">
            <Marker longitude={lon} latitude={lat} anchor='bottom'>
                <Image src={pin} alt="location" height={40} width={40} />
            </Marker>
        </Map>
    )
}