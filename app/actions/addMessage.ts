"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";

export default async function addMessage(previousState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id not available");
  }

  const { userId } = sessionUser;
  const recipient = formData.get("recipient");
  if (userId === recipient) {
    return { error: "You cannot message your self" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });

  await newMessage.save();
  return { submitted: true };
}
