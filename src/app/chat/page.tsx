"use client";
import "katex/dist/katex.min.css"; // 引入 Katex 樣式

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { preprocessLaTeX } from "@/lib/utils";

export function ChatPage() {
  const markdown = `The lift coefficient ($C_L$) is a dimensionless coefficient.`;
  const aiMessage = preprocessLaTeX(`
  要計算角度 \\( A \\)，我們可以從給定的資訊開始進行推理。\n\n1. **考慮三角形的內部角和：** 在任何三角形中，三個內部角的和始終為 180 度。\n   \n2. **使用已知角度的信息：**\n   - 我們知道 \\( \\angle ADB = 45^\\circ \\)。\n   - 也知道 \\( \\angle DBC\\)
    `);
  const markdownSource =
    preprocessLaTeX(`Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.
  
  L = \frac{1}{2} \rho v^2 S C_L
  `);

  return (
    <div>
      <h1>Chat Page</h1>
      <ReactMarkdown
        className="whitespace-pre-wrap"
        children={aiMessage}
        remarkPlugins={[rehypeMathjax, remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
      />
    </div>
  );
}
