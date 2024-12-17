"use client";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Whiteboard = () => {
  const canvasRef = useRef<any>(null);
  const [savedData, setSavedData] = useState<string | null>(null);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(5);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // 背景圖片

  // // 保存畫布內容
  // const handleSave = async () => {
  //   if (canvasRef.current) {
  //     const data = await canvasRef.current.exportPaths(); // 獲取畫布的路徑數據 (JSON)
  //     setSavedData(JSON.stringify(data));

  //     const image = await canvasRef.current.exportImage("png"); // 導出為圖片
  //     setSavedImage(image);
  //   }
  // };

  // // 加載保存的內容
  // const handleLoad = () => {
  //   if (savedData && canvasRef.current) {
  //     canvasRef.current.loadPaths(JSON.parse(savedData)); // 載入 JSON 數據
  //   }
  // };

  // 清除畫布
  const handleClear = () => {
    canvasRef.current?.clearCanvas();
  };

  // 下載 JSON 文件
  const handleDownloadJSON = async () => {
    if (canvasRef.current) {
      const savedData = await canvasRef.current.exportPaths();
      const blob = new Blob([savedData], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "canvas-data.json";
      link.click();
    }
  };

  // 下載 PNG 圖片
  const handleDownloadImage = async () => {
    if (canvasRef.current) {
      const savedImage = await canvasRef.current.exportImage("png");
      const link = document.createElement("a");
      link.href = savedImage;
      link.download = "canvas-image.png";
      link.click();
    }
  };

  // 上傳背景圖片
  const handleUploadBackground = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string); // 設定背景圖片
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* 工具面板 */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          畫筆顏色：
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          畫筆大小：
          <input
            type="number"
            value={brushRadius}
            min="1"
            max="50"
            onChange={(e) => setBrushRadius(Number(e.target.value))}
          />
        </label>
        {/* <Button onClick={handleSave} style={{ marginLeft: "10px" }}>
          保存畫布
        </Button>
        <Button onClick={handleLoad} disabled={!savedData}>
          加載畫布
        </Button> */}
        <Button onClick={handleClear} style={{ marginLeft: "10px" }}>
          清除畫布
        </Button>
        <Button onClick={handleDownloadJSON} style={{ marginLeft: "10px" }}>
          下載 JSON
        </Button>
        <Button onClick={handleDownloadImage} style={{ marginLeft: "10px" }}>
          下載圖片
        </Button>
      </div>

      {/* 上傳背景圖片 */}
      <div className="mb-3">
        <label>
          上傳背景圖片：
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadBackground}
          />
        </label>
      </div>

      {/* 畫布 */}
      <ReactSketchCanvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", width: "800px", height: "600px" }}
        strokeColor={brushColor}
        strokeWidth={brushRadius}
        backgroundImage={backgroundImage || ""}
      />

      {/* 顯示保存的圖片 */}
      {savedImage && (
        <div className="mt-4">
          <h3>保存的圖片：</h3>
          <img
            src={savedImage}
            alt="Saved Canvas"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
};

export default Whiteboard;
