// filepath: /Users/jeanchung/k8-ai-front/src/hooks/useTextToSpeech.ts
import axios from "axios";
import { useState } from "react";

const useTextToSpeech = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertTextToSpeech = async (text: string) => {
    setLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await axios.post(
        "/api/text-to-speech",
        { text },
        {
          responseType: "arraybuffer",
        }
      );

      if (response.data) {
        const audioBlob = new Blob([response.data], {
          type: "audio/mpeg",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        setError("Failed to get audio file path");
      }
    } catch (err) {
      setError("Failed to communicate with the server");
    } finally {
      setLoading(false);
    }
  };

  return { audioUrl, loading, error, convertTextToSpeech };
};

export default useTextToSpeech;
