"use server";
import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export default async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Userid is required!");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookMarked = user.bookmarks.includes(propertyId);
  let msg;

  if (isBookMarked) {
    user.bookmarks.pull(propertyId);
    console.log("propid", propertyId);
    msg = "Removed from bookmarks";
    isBookMarked = false;
  } else {
    user.bookmarks.push(propertyId);
    console.log("propid", propertyId);
    msg = "Added to bookmarks";
    isBookMarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return {
    msg,
    isBookMarked,
  };
}
