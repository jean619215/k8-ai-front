import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { preprocessLaTeX } from "@/lib/utils";

export interface IMessage {
  message: string;
  isUser: boolean;
}

export interface IOpenAiContent {
  type: string;
  text?: string;
  image_url?: string;
}

const useOpenAI = () => {
  const [messageStore, setMessageStore] = useState<IMessage[]>([]);
  const [openAILoading, setOpenAILoading] = useState(false);

  const sendChatMessage = async (userMsg: IOpenAiContent[] | string[]) => {
    setOpenAILoading(true);

    // let newMessages: IMessage[] = [
    //   {
    //     message: userMsg.find((msg) => msg.type === "text")?.text || "",
    //     isUser: true,
    //   },
    // ];

    setMessageStore((prevMessages: IMessage[]) => [
      ...prevMessages,
      {
        message: userMsg.find((msg) => msg.type === "text")?.text || "",
        isUser: true,
      },
    ]);

    console.log("______userMsg______", userMsg);

    const response = await axios.post("/api/openai", {
      messages: [
        {
          role: "system",
          content:
            "Imagine you are an elementary school teacher guiding children to solve math problems without giving them the answer directly. You are given a math problem and a picture of the problem. You need to give the children some hints to solve the problem.",
        },
        { role: "user", content: userMsg },
      ],
    });

    if (response.status === 200) {
      const aiMessage = response.data.result.message.content;
      // const aiMessage =
      //   "要計算角度 \\( A \\)，我們可以從給定的資訊開始進行推理。\n\n1. **考慮三角形的內部角和：** 在任何三角形中，三個內部角的和始終為 180 度。\n   \n2. **使用已知角度的信息：**\n   - 我們知道 \\( \\angle ADB = 45^\\circ \\)。\n   - 也知道 \\( \\angle DBC";
      if (aiMessage) {
        // newMessages.push({ message: aiMessage, isUser: false });

        setMessageStore((prevMessages: IMessage[]) => [
          ...prevMessages,
          {
            message: preprocessLaTeX(aiMessage),
            isUser: false,
          },
        ]);
      }
    }

    setOpenAILoading(false);
  };

  return {
    messageStore,
    openAILoading,
    sendChatMessage,
  };
};

export default useOpenAI;
