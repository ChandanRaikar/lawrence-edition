import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarkerAlt } from 'react-icons/fa'

export default function PropertyCard({ property }: any) {

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
        <>
            <Link href={`/properties/${property._id}`}>
                <div className="bg-mauve-100 shadow-md relative">
                    <Image
                        src={property.images[0]}
                        alt=""
                        width='0' height='0'
                        sizes='100vw'
                        className="w-full h-auto"
                    />
                    <div className="p-4">
                        <div className="text-left md:text-center lg:text-left mb-6">
                            <div className="text-gray-600">{property.type}</div>
                            <h3 className="text-xl font-bold">{property.name}   </h3>
                        </div>
                        <h3
                            className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-cyan-800 font-bold text-right md:text-center lg:text-right"
                        >
                            {getRateDisplay()}
                        </h3>

                        <div className="flex justify-center gap-4 text-gray-500 mb-4">
                            <p>
                                <FaBed className="md:hidden lg:inline" />{' '}  {property.beds}{' '}
                                <span className="md:hidden lg:inline">Beds</span>
                            </p>
                            <p>
                                <FaBath className="md:hidden lg:inline" />{' '} {property.baths}{' '}
                                <span className="md:hidden lg:inline">Baths</span>
                            </p>
                            <p>
                                <FaRulerCombined className="md:hidden lg:inline" />{' '} {property.square_feet}{' '}
                                <span className="md:hidden lg:inline">sqft</span>
                            </p>
                        </div>

                        <div
                            className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                        >
                            <p><FaMoneyBill className="md:hidden lg:inline" />{' '} Weekly</p>
                            <p><FaMoneyBill className="md:hidden lg:inline" />{' '} Monthly</p>
                        </div>

                        <div className="border border-gray-100 mb-5"></div>

                        <div className="flex flex-col lg:flex-row justify-between mb-4">
                            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                                <FaMapMarkerAlt className="mt-1 text-emerald-700" />{' '}
                                <span className="text-emerald-700 font-bold"> {property.location.city} {property.location.state} </span>
                            </div>
                            <span className="h-9 bg-emerald-900 hover:bg-emerald-950 text-white px-9 py-2 rounded-lg text-center text-sm">
                                View Details
                            </span>
                        </div>
                    </div>
                </div >
            </Link>
        </>

    )
}