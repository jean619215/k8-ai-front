import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

const AI_MODEL = "gpt-4o-mini";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface IRequest {
  messages: {
    role: string;
    content: string;
  }[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid prompt provided." },
        { status: 400 }
      );
    }

    console.log("_____body", body.messages);

    // return NextResponse.json({ body });
    // return NextResponse.json({
    //   result: {
    //     message: {
    //       content:
    //         "要計算角度 \\( A \\)，我們可以從給定的資訊開始進行推理。\n\n1. **考慮三角形的內部角和：** 在任何三角形中，三個內部角的和始終為 180 度。\n   \n2. **使用已知角度的信息：**\n   - 我們知道 \\( \\angle ADB = 45^\\circ \\)。\n   - 也知道 \\( \\angle DBC",
    //     },
    //   },
    // });

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: body.messages,
      max_tokens: 300,
    });

    const result = completion.choices[0];

    console.log("_____result", result);

    // const result = {
    //   message: {
    //     content: "Hello, I'm an AI. How can I help you today?",
    //   },
    // };
    //ex: "要計算角度 \\( A \\)，我們可以從給定的資訊開始進行推理。\n\n1. **考慮三角形的內部角和：** 在任何三角形中，三個內部角的和始終為 180 度。\n   \n2. **使用已知角度的信息：**\n   - 我們知道 \\( \\angle ADB = 45^\\circ \\)。\n   - 也知道 \\( \\angle DBC"
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
