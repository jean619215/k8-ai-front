import ChatChannel from "@/components/ChatChannel";
import Whiteboard from "@/components/Whiteboard";

export default function HomeworkPage() {
  return (
    <div className="flex">
      <Whiteboard />
      <ChatChannel />
    </div>
  );
}
