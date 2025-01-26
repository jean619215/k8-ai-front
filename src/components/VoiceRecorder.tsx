"use client";

import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Button, CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";

import useCommonStore from "@/stores/useCommonStore";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const { speechToText, setSpeechToText } = useCommonStore();

  const startRecording = async () => {
    try {
      setAudioUrl(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      const audioChunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (event) =>
        audioChunks.push(event.data);

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach((track) => track.stop());

        // 傳輸到後端
        handleTranslateToText(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("錄音失敗：", error);
      alert("無法開始錄音，請檢查麥克風權限。");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranslateToText = async (audioBlob: Blob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(",")[1];
        if (base64data) {
          const response = await axios.post(
            "/api/speech-to-text",
            {
              audioFile: base64data,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data;
          setSpeechToText(data.transcript);
        }
      };
    } catch (error) {
      console.error("發送錄音到後端失敗：", error);
      alert("無法處理錄音，請稍後再試。");
    }
  };

  return (
    <div>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        // color={isRecording ? "secondary" : "primary"}
      >
        {isRecording ? <StopCircleIcon /> : <MicIcon />}
      </Button>
      {/* {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )} */}
    </div>
  );
}
