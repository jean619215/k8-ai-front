import { SpeechClient } from "@google-cloud/speech";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import * as nextConnect from "next-connect";
import path from "path";

// 初始化 Google Speech 客戶端
const client = new SpeechClient({
  keyFilename: "./keyfile.json",
});

// 禁用默认的 bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  try {
    const { audioFile } = await req.json(); // 獲取前端上傳的音頻文件

    const [response] = await client.recognize({
      config: {
        encoding: "WEBM_OPUS",
        languageCode: "zh-TW",
      },
      audio: {
        content: audioFile,
      },
    });

    const transcription = response?.results
      ?.map((result) => result?.alternatives?.[0]?.transcript)
      .join("\n");

    return NextResponse.json({ transcript: transcription });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing speech-to-text" },
      { status: 500 }
    );
  }
};
