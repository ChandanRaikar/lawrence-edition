"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";
import getSessionUser from "@/utils/getSessionUser";

export default async function messageDelete(messageId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorize");
  }

  await Message.deleteOne();

  revalidatePath("/", "layout");
}
