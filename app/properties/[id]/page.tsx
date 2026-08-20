import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/app/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import PropertyDetailsPage from "@/app/components/PropertyDetails";
import HomeProperties from "@/app/components/HomeProperties";

type Props = { params: Promise<{ id: string }> }

export default async function PropertyPage({ params }: Props) {
    await connectDB();
    const { id } = await params;
    const property = await Property.findById(id).lean();

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
                    <div className="grid grid-cols-1 w-full gap-6">
                        <PropertyDetailsPage property={property} />
                    </div>
                </div>
            </section>
            <HomeProperties />
        </>
    )
}