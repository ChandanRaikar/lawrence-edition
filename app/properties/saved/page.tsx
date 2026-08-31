import PropertyCard from "@/app/components/PropertyCard"
import connectDB from "@/config/database"
import User from "@/models/Users"
import getSessionUser from "@/utils/getSessionUser"

export default async function SavedPropertiesPage() {
    await connectDB()
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    const { bookmarks } = await User.findById(userId).populate('bookmarks');
    console.log('bookmark:', bookmarks)
    return (
        <section className="px-4 py-6">
            <div className="container lg:container m-auto px-4 py-6">
                <h1 className="text-2xl text-center mb-4 font-bold">Bookmarked properties</h1>
                {
                    bookmarks.lenght === 0 ? (<p>No saved properties</p>) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {bookmarks.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )
                }
            </div>
        </section>
    )
}