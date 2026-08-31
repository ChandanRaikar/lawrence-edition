'use client';
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
    const overRide = {
        display: 'block',
        margin: '20px auto'
    }
    return (
        <ClipLoader color='#ff1235' size={40} cssOverride={overRide}></ClipLoader>
    )
}