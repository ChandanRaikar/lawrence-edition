import PropertyAddform from "@/app/components/forms/PropertyAddForm";
export default function AddPropertyPage() {
    return (
        <section className="bg-emerald-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-3 md:m-0">
                    <PropertyAddform />
                </div>
            </div>
        </section>
    );
}