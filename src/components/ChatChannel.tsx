"use client";
import "katex/dist/katex.min.css";

import {
  Button,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { use, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import useChat, { ChatMessage } from "@/hooks/useChat";
// import VoiceRecorder from "@/components/VoiceRecorder";
import useOpenAI from "@/hooks/useOpenAI";
import { cn, preprocessLaTeX } from "@/lib/utils";
import useCommonStore from "@/stores/useCommonStore";

function ChatChannel({ className }: { className?: string }) {
  const [messages, setMessages] = useState<
    {
      message: string;
      isUser: boolean;
    }[]
  >([]);
  const {
    whiteboardImage,
    isNewWhiteboardImage,
    setIsNewWhiteboardImage,
    speechToText,
  } = useCommonStore();
  const { messageStore, chatLoading, sendMessage } = useChat();
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

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) {
      return;
    }

    setIsLoading(true);

    const messageContent: ChatMessage = {
      role: "user",
      content: [{ type: "text", text: inputValue }],
    };

    if (whiteboardImage && isNewWhiteboardImage) {
      messageContent.content.push({
        type: "image_url",
        image_url: {
          url: whiteboardImage,
        },
      });
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: inputValue, isUser: true },
    ]);

    setInputValue("");
    setIsLoading(false);
    setIsNewWhiteboardImage(false);

    const aiMessage = await sendMessage(messageContent);
    if (aiMessage) {
      const latexText = preprocessLaTeX(aiMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { message: latexText, isUser: false },
      ]);
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

  useEffect(() => {
    if (speechToText) {
      setInputValue(speechToText);
    }
  }, [speechToText]);

  return (
    <div
      className={cn(
        "flex flex-col rounded-md m-1 border-2 border-brown-01",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto p-2" ref={channelRef}>
        {messages.map((message, index) => (
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
                remarkPlugins={[rehypeMathjax, remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
              >
                {message.message}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {chatLoading && (
          <div className={`flex items-center p-2 justify-star`}>
            <div className={`p-3 rounded-lg bg-gray-200 mr-5`}>
              <CircularProgress />
            </div>
          </div>
        )}
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
              {/* <VoiceRecorder /> */}
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
}

export default ChatChannel;
