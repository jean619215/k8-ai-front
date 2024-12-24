"use client";

import ChatChannel from "@/components/ChatChannel";
import Upload from "@/components/Upload";
import Whiteboard from "@/components/Whiteboard";
import useCommonStore from "@/stores/useCommonStore";

export default function HomeworkPage() {
  const { userSavedData } = useCommonStore();

  return (
    <div className="h-full w-full p-2">
      <Upload className="" />
      <div className="flex h-ful w-full">
        {userSavedData && userSavedData.type.includes("image") && (
          <Whiteboard className="w-[600px] h-[500px]" />
        )}
        <ChatChannel className="flex-1 mt-14 h-full" />
      </div>
    </div>
  );
}
