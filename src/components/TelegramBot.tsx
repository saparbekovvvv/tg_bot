import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormTelegram {
  username: string;
  email: string;
  subject: string;
  description: string;
}

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

function TelegramBot() {
  const { register, handleSubmit, reset } = useForm<IFormTelegram>();

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `Username: <b>${data.username}</b>\n`;
    messageTG += `Email Address: <b>${data.email}</b>\n`;
    messageTG += `Subject: <b>${data.subject}</b>\n`;
    messageTG += `Description: <b>${data.description}</b>\n`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: true, maxLength: 25 })}
        placeholder="username"
      />
      <input
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          maxLength: 50,
        })}
        placeholder="email"
      />
      <input
        {...register("subject", { required: true })}
        placeholder="subject"
      />
      <input
        {...register("description", { required: true })}
        placeholder="description"
      />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default TelegramBot;
