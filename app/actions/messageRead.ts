"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export default async function messageRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Userid is required!");
  }

  const { userId } = sessionUser;
  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not foun");
  }

  if (message.recipient.toString() != userId) {
    throw new Error("Unauthorized");
  }
  message.read = !message.read;
  revalidatePath("/message", "page");
  await message.save();
  return message.read;
}
