import { FaBath, FaBed, FaCheck, FaHotel, FaMap, FaMapMarker, FaMapMarkerAlt, FaRulerCombined, FaTimes } from "react-icons/fa";
import { FaMapLocation, FaVault } from "react-icons/fa6";
import { FaWifi, FaSnowflake, FaKitchenSet, FaSquareParking, FaPersonSwimming, FaShield, FaElevator, FaWheelchair, FaDumbbell, FaTv, FaBlender, FaCup } from "react-icons/fa6";
import PropertyMap from "./PropertyMap";

export default function PropertyDetailsPage({ property }: any) {
    return (
        <main>
            <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
                <div className="text-gray-500 mb-4">{property.type}</div>
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <p className="text-black">
                        <FaMapMarkerAlt className="text-black inline mr-1" />{property.location.street} {property.location.city} {property.location.state} {property.location.zipcode}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-black text-white px-4 py-2 rounded">
                    Rates & Availability
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <div className="text-2xl font-bold text-black">
                            {property.rates.nightly ? (`$${property.rates.nightly.toLocaleString()}`) : (<FaTimes className="text-text-black"></FaTimes>)}
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <div className="text-2xl font-bold text-text-black">
                            {property.rates.weekly ? (`$${property.rates.weekly.toLocaleString()}`) : (<FaTimes className="text-text-black"></FaTimes>)}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold text-text-black">
                            {property.rates.monthly ? (`$${property.rates.monthly.toLocaleString()}`) : (<FaTimes className="text-text-black"></FaTimes>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">About Property</h3>
                <div
                    className="flex justify-left gap-4 text-black mb-6 text-base space-x-9"
                >
                    <p>
                        <FaBed className="mr-2 inline" />{property.beds}{' '}
                        <span className="hidden sm:inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="mr-2 inline" /> {property.baths}{' '}
                        <span className="hidden sm:inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="mr-2 inline" />
                        {property.square_feet} <span className="hidden sm:inline">sqft</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4">
                    {property.description}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg text-xl font-bold mb-6">Features</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                    {
                        property.amenities.map((amenity, index) => (
                            <li key={index} className="py-2">
                                {amenity === 'Wifi' ? (
                                    <FaWifi className="text-black inline mr-2" />
                                ) : amenity === 'Full kitchen' ? (
                                    <FaKitchenSet className="text-black inline mr-2" />
                                ) : amenity === 'Washer & Dryer' ? (
                                    <FaKitchenSet className="text-black inline mr-2" />
                                ) : amenity === 'Free Parking' ? (
                                    <FaSquareParking className="text-black inline mr-2" />
                                ) : amenity === 'Swimming Pool' ? (
                                    <FaPersonSwimming className="text-black inline mr-2" />
                                ) : amenity === 'Hot Tub' ? (
                                    <FaBath className="text-black inline mr-2" />
                                ) : amenity === '24/7 Security' ? (
                                    <FaShield className="text-black inline mr-2" />
                                ) : amenity === 'Wheelchair Accessible' ? (
                                    <FaWheelchair className="text-black inline mr-2" />
                                ) : amenity === 'Elevator Access' ? (
                                    <FaElevator className="text-black inline mr-2" />
                                ) : amenity === 'Dishwasher' ? (
                                    <FaVault className="text-black inline mr-2" />
                                ) : amenity === 'Gym/Fitness Center' ? (
                                    <FaDumbbell className="text-black inline mr-2" />
                                ) : amenity === 'Air Conditioning' ? (
                                    <FaSnowflake className="text-black inline mr-2" />
                                ) : amenity === 'Balcony/Patio' ? (
                                    <FaHotel className="text-black inline mr-2" />
                                ) : amenity === 'Smart TV' ? (
                                    <FaTv className="text-black inline mr-2" />
                                ) : amenity === 'Coffee Maker' ? (
                                    <FaBlender className="text-black inline mr-2" />
                                ) : (
                                    <FaCheck className="text-black inline mr-2" />
                                )}

                                {amenity}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* <!-- Map --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <PropertyMap property={property} />
            </div>
        </main>
    )
}