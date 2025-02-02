// filepath: /Users/jeanchung/k8-ai-front/src/hooks/useTextToSpeech.ts
import axios from "axios";
import { useState } from "react";

const useTextToSpeech = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [textToSpeechLoading, setLoading] = useState(false);

  const convertTextToSpeech = async (text: string) => {
    setLoading(true);
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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { audioUrl, textToSpeechLoading, convertTextToSpeech };
};

export default useTextToSpeech;
