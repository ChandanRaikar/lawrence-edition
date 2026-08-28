import PropertyEditForm from "@/app/components/forms/PropetyEditForm"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import convertToSerializableObject from "@/utils/convertToObject";

type Props = { params: Promise<{ id: string }> }

export default async function EditPage({ params }: Props) {
    await connectDB();
    const { id } = await params;
    const propertyDoc = await Property.findById(id).lean();
    const property = convertToSerializableObject(propertyDoc)

    if (!property) {
        return (
            <h1 className="text-center text-xl text-emerald-700">
                Property not found
            </h1>
        )
    }

    return (
        <div>
            <section className="bg-emerald-100">
                <div className="container mx-auto max-w-2xl py-25">
                    <div className="bg-white px-6 py8 mb-4 shadow-md rounde-md-border m-4 m:m-0">
                        <PropertyEditForm property={property} />
                    </div>
                </div>
            </section>
        </div>
    )
} 