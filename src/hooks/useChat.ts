import { AxiosResponse } from "axios";
import { useState } from "react";

import { apiUrl } from "@/config/apiUrl";
import axios from "@/lib/customizedAxios";
import { preprocessLaTeX } from "@/lib/utils";

import { OpenAIContentRole } from "./useOpenAI";

export interface ChatMessage {
  role: string;
  content: Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

export interface ChatMessageResponse {
  response: string;
}
/**
 * 
 * @returns 
config
: 
{transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
data
: 
{response: '這是一個圖片，可能是某種卡通角色或圖案。如果你想知道更多，請告訴我！'}
headers
: 
AxiosHeaders {access-control-allow-origin: '*', connection: 'close', content-length: '117', content-type: 'application/json; charset=utf-8', date: 'Thu, 23 Jan 2025 06:24:55 GMT', …}
request
: 
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status
: 
200
statusText
: 
"OK"
 */

const useChat = () => {
  const [chatLoading, setChatLoading] = useState(false);
  const [messageStore, setMessageStore] = useState<ChatMessage[]>([]);

  const sendMessage = async (message: ChatMessage) => {
    setChatLoading(true);
    try {
      const newMessage: ChatMessage[] = [...messageStore, message];

      console.log("____newMessage", newMessage);

      const response: AxiosResponse<ChatMessageResponse> = await axios.post(
        apiUrl.CHAT,
        {
          message: newMessage,
        }
      );

      if (response.data) {
        setMessageStore(() => [
          ...newMessage,
          {
            role: OpenAIContentRole.ASSISTANT,
            content: [
              {
                type: "text",
                text: response.data.response,
              },
            ],
          },
        ]);
        return response.data.response;
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setChatLoading(false);
    }
  };

  return { chatLoading, messageStore, sendMessage };
};

export default useChat;
