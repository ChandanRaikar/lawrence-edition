import connectDB from '@/config/database';
import PropertyCard from '../components/PropertyCard';
import Property from '@/models/Property';
import Pagination from '../components/Pagination';
import { PAGINATION_PAGE_SIZE } from '@/utils/paginationConfig';

export const metadata = {
    title: {
        default: 'Properties'
    }
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function PropertiesPage(props: { searchParams: SearchParams }) {
    await connectDB();
    const searchParams = await props.searchParams
    const pageParam = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page
    const parsedPage = Number(pageParam)
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

    const offset = (page - 1) * PAGINATION_PAGE_SIZE;
    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(offset).limit(PAGINATION_PAGE_SIZE);

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {
                    properties.length === 0 ? (<p className='text-center text-xl'>No properties found!</p>) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {
                                properties.map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))
                            }
                        </div>
                    )
                }
                <Pagination page={page} PAGINATION_PAGE_SIZE={PAGINATION_PAGE_SIZE} totalItems={total} />
            </div>
        </section>
    );
}