// filepath: /Users/jeanchung/k8-ai-front/src/app/api/text-to-speech/route.ts
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const client = new TextToSpeechClient({
  keyFilename: "./keyfile.json",
});

export interface IRequest {
  text: string;
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const [response] = await client.synthesizeSpeech({
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0,
        speakingRate: 0,
      },
      input: {
        text,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Journey-F",
      },
    });

    // const filePath = path.join("/tmp", "output.mp3");
    if (response.audioContent) {
      const audioBuffer = Buffer.from(
        response.audioContent as string,
        "base64"
      );

      return new NextResponse(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": "attachment; filename=output.mp3",
        },
      });
    } else {
      throw new Error("Audio content is undefined");
    }
  } catch (error) {
    console.error("Error communicating with Google Text-to-Speech API:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
