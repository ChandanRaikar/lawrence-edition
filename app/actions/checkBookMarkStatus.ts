"use server";
import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";

export default async function checkBookMarkStatus(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Userid is required!");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  const isBookMarked = user.bookmarks.includes(propertyId);
  return isBookMarked;
}
