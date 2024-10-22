import { sendEmail } from "../helpers/sendEmail.js";
import Message from "../models/messageModel.js";

import catchAsyncFuncError from "../utils/catchAsyncFuntionErrors.js";
import { ErrorHandler } from "../utils/Errorhandler.js";

export const getAllMessages = catchAsyncFuncError(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });;

  return res.status(200).json({
    success: true,
    messages,
    messagesCount: messages.length,
  });
});

export const sendMessage = catchAsyncFuncError(async (req, res) => {

  const { name, email, message } = req.body;

  try {
    if (name && email && message) {
      console.log("message controler" ,name , email)
      await sendEmail(message, name, email);
    }
  } catch (error) {
    return next(new ErrorHandler("Error while sending mail to admin ", 400));
  }

  const newMessage = new Message({
    name,
    email,
    message,
  });

  
  await newMessage.save();

  return res.status(200).json({
    success: true,
    message: newMessage,
  });
});

export const deleteMessage = catchAsyncFuncError(async (req, res,next) => {

  const { id } = req.params;

  try {
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return next(new ErrorHandler("Message not found ! ", 400));
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
