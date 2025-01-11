"use client";
import "katex/dist/katex.min.css"; // 引入 Katex 樣式

import VoiceRecorder from "@/components/VoiceRecorder";
import { preprocessLaTeX } from "@/lib/utils";

export default function ChatPage() {
  return (
    <div>
      <h1>Chat Page</h1>
      <VoiceRecorder />
    </div>
  );
}
