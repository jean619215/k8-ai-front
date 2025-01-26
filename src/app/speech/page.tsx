// filepath: /Users/jeanchung/k8-ai-front/src/components/VoiceRecorder.tsx
"use client";

import React, { useState } from "react";

import useTextToSpeech from "@/hooks/useTextToSpeech";

const VoiceRecorder: React.FC = () => {
  const [recordedText, setRecordedText] = useState("");
  const { audioUrl, loading, error, convertTextToSpeech } = useTextToSpeech();

  const handleRecord = (text: string) => {
    convertTextToSpeech(recordedText);
  };

  return (
    <div>
      <h1>Voice Recorder</h1>

      <input
        type="text"
        value={recordedText}
        onChange={(e) => setRecordedText(e.target.value)}
        placeholder="Enter text to convert"
      />

      <button onClick={() => handleRecord("Sample recorded text")}>
        Convert
      </button>
      {loading && <p>Converting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {audioUrl && (
        <div>
          <h2>Audio Output</h2>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
