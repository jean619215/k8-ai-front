import { useState, useEffect } from "react";
import OpenAI from "openai";

export interface IMessage {
  message: string;
  isUser: boolean;
}

const useOpenAI = () => {
  const openai = new OpenAI();

  const AI_MODEL = "gpt-4o-mini";
  const [messagesStore, setMessagesStore] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendChatMessage = async (message: string) => {
    if (message.trim() === "") {
      return;
    }

    setLoading(true);

    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Imagine you are an elementary school teacher guiding children to solve math problems without giving them the answer directly. You are given a math problem and a picture of the problem. You need to give the children some hints to solve the problem.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 1000,
    });

    if (response.choices[0]) {
      const aiMessage = response.choices[0].message.content;
      if (aiMessage) {
        setMessagesStore((prevMessages: IMessage[]) => [
          ...prevMessages,
          { message: message, isUser: true },
          { message: aiMessage, isUser: false },
        ]);
      }
    }

    setLoading(false);
  };

  return {
    messagesStore,
    loading,
    sendChatMessage,
  };
};

export default useOpenAI;
