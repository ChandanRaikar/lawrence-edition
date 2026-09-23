import Image from "next/image"
import Link from "next/link"
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarkerAlt } from 'react-icons/fa'

export default function FeaturedPropertyCard({ property }) {

    const getRateDisplay = () => {
        const { rates } = property;
        if (rates.monthly) {
            return `$${rates.monthly.toLocaleString()}/Mo`
        } else if (rates.weekly) {
            return `$${rates.weekly.toLocaleString()}/Wk`
        } else if (rates.nightly) {
            return `$${rates.nightly.toLocaleString()}/night`
        }
    }
    return (
        <div>
            <Link
                href={`/properties/${property._id}`}
            >
                <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row" >
                    <Image
                        src={property.images[0]}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
                    />
                    <div className="p-6">
                        <h3 className="text-black text-xl font-bold">{property.name}</h3>
                        <div className="text-gray-600 mb-4">{property.type}</div>
                        <h3
                            className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-black font-bold text-right md:text-center lg:text-right"
                        >
                            {getRateDisplay()}
                        </h3>
                        <div className="flex gap-4 text-black mb-4">
                            <p>
                                <FaBed className="mt-1 text-black inline-block mr-1" /> {property.beds}{' '}
                                <span className="md:hidden lg:inline">Beds</span>
                            </p>
                            <p>
                                <FaBath className="mt-1 text-black inline-block mr-1" /> {property.baths}{' '}
                                <span className="md:hidden lg:inline">Baths</span>
                            </p>
                            <p>
                                <FaRulerCombined className="mt-1 text-black inline-block mr-1" />
                                {property.square_feet}{' '}<span className="md:hidden lg:inline">sqft</span>
                            </p>
                        </div>

                        <div className="border border-gray-200 mb-5"></div>

                        <div className="flex flex-col lg:flex-row justify-between">
                            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                                {/* FaBed, FaBath, FaRulerCombined, FaMapMarked */}
                                <FaMapMarkerAlt className="mt-1 text-black" />
                                <span className="text-black font-bold"> Boston MA </span>
                            </div>
                            <span className="h-9 bg-black hover:bg-gray-800 text-white px-9 py-2 rounded-lg text-center text-sm">
                                Details
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div >
    )
}