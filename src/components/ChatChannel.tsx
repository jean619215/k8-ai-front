"use client";
import "katex/dist/katex.min.css";

import {
  Button,
  InputAdornment,
  OutlinedInput,
  styled,
  TextField,
} from "@mui/material";
import React, { use, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import useOpenAI from "@/hooks/useOpenAI";
import { cn, preprocessLaTeX } from "@/lib/utils";
import useCommonStore from "@/stores/useCommonStore";

function ChatChannel({ className }: { className?: string }) {
  // const [messages, setMessages] = useState<IMessage[]>([]);
  const { userSavedData, setUserSavedData, isNewData, setIsNewData } =
    useCommonStore();
  const { messageStore, sendChatMessage } = useOpenAI();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  // const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement> & { isComposing?: boolean }
  ) => {
    if (event.key === "Enter" && !isComposing) {
      handleSendMessage();
    }
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
  };

  const handleCompositionStart = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(true);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || isLoading) {
      return;
    }

    setIsLoading(true);

    const messages: any[] = [
      {
        type: "text",
        text: inputValue,
      },
    ];

    if (userSavedData && isNewData) {
      console.log("_____userSavedData", userSavedData);

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;

        if (userSavedData.type.includes("image")) {
          messages.push({
            type: "image_url",
            image_url: {
              url: data,
            },
          });
        } else {
          messages.push(data);
        }
        sendChatMessage(messages);
        setInputValue("");
        setIsLoading(false);
      };
      reader.readAsDataURL(userSavedData);
      setIsNewData(false);
    } else {
      sendChatMessage(messages);
      setInputValue("");
      setIsLoading(false);
    }

    // Simulate AI response delay
    // setTimeout(() => {
    //   // setMessages((prevMessages) => [
    //   //   ...prevMessages,
    //   //   { message: inputValue, isUser: true },
    //   //   { message: "AI: I'm a robot", isUser: false },
    //   // ]);

    // }, 1000);
  };

  useEffect(() => {
    if (channelRef.current && messageStore.length > 0) {
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      // 滑到底部
      channelRef.current.scrollTop = channelRef.current.scrollHeight;
    }
  }, [messageStore]);

  return (
    <div
      className={cn(
        "flex flex-col rounded-md m-1 border-2 border-brown-01 min-h-96 ",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto p-2" ref={channelRef}>
        {messageStore.map((message, index) => (
          <div
            key={index}
            className={`flex items-center p-2 ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.isUser
                  ? "bg-blue-500 text-white ml-5"
                  : "bg-gray-200 mr-5"
              }`}
            >
              <ReactMarkdown
                className="prose whitespace-pre-wrap"
                children={preprocessLaTeX(message.message)}
                remarkPlugins={[rehypeMathjax, remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
              ></ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full  border-t border-brown-01">
        <OutlinedInput
          type="text"
          label=""
          className="w-full border-none"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          // onKeyUp={handleKeyUp}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <Button onClick={handleSendMessage} disabled={isLoading}>
                Send
              </Button>
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
}

export default ChatChannel;
