"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";
import getSessionUser from "@/utils/getSessionUser";

export default async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not found!");

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  if (publicIds.lenght > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy("property/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}
