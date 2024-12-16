"use client";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // 引入 Katex 樣式

export default function ChatPage() {
  const markdown = `The lift coefficient ($C_L$) is a dimensionless coefficient.`;
  return (
    <div>
      <h1>Chat Page</h1>
      <ReactMarkdown
        className="prose whitespace-pre-wrap"
        children={markdown}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      ></ReactMarkdown>
    </div>
  );
}
