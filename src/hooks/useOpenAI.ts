import { mathFormat } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(false);

  const sendChatMessage = async (userMsg: IOpenAiContent[] | string[]) => {
    setLoading(true);

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
      // const aiMessage = response.data.result.message.content;
      const aiMessage =
        "要計算角度 \\( A \\)，我們可以從給定的資訊開始進行推理。\n\n1. **考慮三角形的內部角和：** 在任何三角形中，三個內部角的和始終為 180 度。\n   \n2. **使用已知角度的信息：**\n   - 我們知道 \\( \\angle ADB = 45^\\circ \\)。\n   - 也知道 \\( \\angle DBC";
      if (aiMessage) {
        // newMessages.push({ message: aiMessage, isUser: false });

        console.log("_____aiMessage", mathFormat(aiMessage));
        setMessageStore((prevMessages: IMessage[]) => [
          ...prevMessages,
          {
            message: mathFormat(aiMessage),
            isUser: false,
          },
        ]);
      }
    }

    setLoading(false);
  };

  return {
    messageStore,
    loading,
    sendChatMessage,
  };
};

export default useOpenAI;
