
import connectDB from '@/config/database';
import Property from '@/models/Property';
import convertToSerializableObject from '@/utils/convertToObject';
import Link from 'next/link';
import PropertyCard from '@/app/components/PropertyCard';
import PropertySearch from '@/app/components/PropertySearch';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

export default async function searchResults({ searchParams }) {
    await connectDB();

    const { location, propertyType } = await searchParams;

    const locationPattern = new RegExp(location, 'i');

    let query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
        ]
    }

    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
    }

    const propertiesQueryResults = await Property.find(query).lean();
    const properties = convertToSerializableObject(propertiesQueryResults);

    return (
        <>
            <section className="bg-emerald-700 py-6">
                <div className="max-w-7xl mxauto px-4 flex flex-col items-start sm:px-6">
                    <PropertySearch />
                </div>
            </section>
            <section className='px-4 py-6'>
                <div className='container-xl lg:container m-auto px-4 py6'>
                    <Link href='/properties' className='flex items-center text-emerald-700 hover:text-emerald-900'>
                        <FaArrowAltCircleLeft className='mr-2 mt-1' /> Back to properties</Link>
                </div>
                <h1>Search Results</h1>
                {properties.length === 0 ? (<p>No properties found</p>) :
                    <div className='grid grid-cols-3 gap-3'>
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>}
            </section>
        </>
    )
}