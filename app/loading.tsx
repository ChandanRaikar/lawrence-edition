'use client';
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingPage() {
    const overRide = {
        display: 'block',
        margin: '100px auto'
    }
    return (
        <ClipLoader color='#ff1235' size={150} cssOverride={overRide}></ClipLoader>
    )
}