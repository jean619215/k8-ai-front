"use client";

import ChatChannel from "@/components/ChatChannel";
import Upload from "@/components/UploadImage";
import Whiteboard from "@/components/Whiteboard";

export default function HomeworkPage() {
  return (
    <div className="h-full w-full p-2">
      <Upload className="" />
      <div className="flex h-ful w-full">
        <Whiteboard className="w-[600px] h-[500px]" />
        <ChatChannel className="flex-1 mt-14 h-[500px]" />
      </div>
    </div>
  );
}
