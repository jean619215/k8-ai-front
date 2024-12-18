"use client";
import {
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import useOpenAI from "@/hooks/useOpenAI";

const ChatChannel: React.FC = (file) => {
  // const [messages, setMessages] = useState<IMessage[]>([]);
  const { messagesStore, sendChatMessage } = useOpenAI();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || isLoading) {
      return;
    }

    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: inputValue, isUser: true },
        { message: "AI: I'm a robot", isUser: false },
      ]);
      setInputValue("");
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div className="min-w-80 flex flex-col  h-[500px] rounded-md m-8 border-2 border-brown-01">
        <div className="flex-1 overflow-y-auto p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center p-2 ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.isUser ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <ReactMarkdown
                  className="prose whitespace-pre-wrap"
                  children={message.message}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                ></ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="w-full  border-t border-brown-01">
          <OutlinedInput
            type="text"
            label=""
            className="w-full border-none"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
    </div>
  );
};

export default ChatChannel;
