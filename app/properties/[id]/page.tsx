import connectDB from "@/config/database";
import Property from "@/models/Property";

export default async function PropertyPage({ params }) {
    return (
        <div>
            {params.id}
        </div>
    );
}