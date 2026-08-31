import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/app/components/PropertyHeaderImage";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import PropertyDetailsPage from "@/app/components/PropertyDetails";
import PropertyImages from "@/app/components/PropertyImages";
import convertToSerializableObject from "@/utils/convertToObject"
import BookmarkButton from "@/app/components/BookmarkButton";
import ShareButton from "@/app/components/ShareButton";
import ContactForm from "@/app/components/forms/ContactForm";

type Props = { params: Promise<{ id: string }> }

export default async function PropertyPage({ params }: Props) {
    await connectDB();
    const { id } = await params;
    const propertyDoc = await Property.findById(id).lean();
    const property = convertToSerializableObject(propertyDoc)

    if (!property) {
        return (<h1 className="text-center text-xl font-bold mt-10">
            Property not found!
        </h1>)
    }


    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-emerald-800 hover:text-emerald-950 flex items-center"
                    >
                        <FaChevronLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>
            <section className="bg-emerald-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="md:col-span-8">
                            <PropertyDetailsPage property={property} />
                        </div>
                        <aside className="md:col-span-4 gap-1">
                            <BookmarkButton property={property} />
                            <ShareButton property={property} />
                            <ContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>
            <PropertyImages images={property.images} />
        </>
    )
}