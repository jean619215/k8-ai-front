"use client";
import useCommonStore from "@/stores/useCommonStore";
import { Button, Typography } from "@mui/material";
import React, { use, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import DownloadIcon from "@mui/icons-material/Download";
import { VisuallyHiddenInput } from "@/components/VisuallyHiddenInput";
import { cn } from "@/lib/utils";

const Whiteboard = ({ className }: { className?: string }) => {
  const { setUserSavedData, userSavedData } = useCommonStore();

  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<any>(null);
  // const [savedData, setSavedData] = useState<string | null>(null);
  // const [savedImage, setSavedImage] = useState<string | null>(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(5);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    undefined
  ); // 背景圖片

  useEffect(() => {
    if (userSavedData && userSavedData.type.includes("image")) {
      // setBackgroundImage(userSavedData.url);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string); // 設定背景圖片
      };
      reader.readAsDataURL(userSavedData);
    } else {
      setBackgroundImage(undefined);
    }
  }, [userSavedData]);

  // // 保存畫布內容
  // const handleSave = async () => {
  //   if (canvasRef.current) {
  //     const data = await canvasRef.current.exportPaths(); // 獲取畫布的路徑數據 (JSON)
  //     setSavedData(JSON.stringify(data));

  //     const image = await canvasRef.current.exportImage("png"); // 導出為圖片
  //     setSavedImage(image);
  //   }
  // };

  // 保存畫布內容
  const handleSave = async (e: any) => {
    if (canvasRef.current && e.length > 0) {
      // const data = await canvasRef.current.exportPaths(); // 獲取畫布的路徑數據 (JSON)
      // setSavedData(JSON.stringify(data));

      const image = await canvasRef.current.exportImage("png"); // 導出為圖片
      //圖片轉換為base64
      // setSavedImage(image);
      setUserSavedData(image); // 設定保存的數據
    }
  };

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
  // const handleUploadBackground = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setBackgroundImage(e.target?.result as string); // 設定背景圖片
  //       // 儲存
  //       setUserSavedData(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className={cn("", className)}>
      <div className="flex gap-5 items-center flex-wrap p-3">
        <div className="flex border-brown-01 relative items-center gap-2">
          <Typography variant="subtitle1" color="primary">
            Color:
          </Typography>
          <VisuallyHiddenInput
            ref={colorInputRef}
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
          <span
            className="w-4 h-4  rounded-full cursor-pointer block"
            style={{
              backgroundColor: brushColor,
            }}
            onClick={() => colorInputRef.current?.click()}
          ></span>
        </div>
        <div className="relative flex items-center gap-2">
          <Typography variant="subtitle1" color="primary">
            Size:
          </Typography>
          <input
            className=" text-brown-01"
            type="number"
            value={brushRadius}
            min="1"
            max="50"
            onChange={(e) => setBrushRadius(Number(e.target.value))}
          />
        </div>
        {/* <Button onClick={handleSave} style={{ marginLeft: "10px" }}>
          保存畫布
        </Button>
        <Button onClick={handleLoad} disabled={!savedData}>
          加載畫布
        </Button> */}
        <Button variant="outlined" onClick={handleClear}>
          <Typography variant="body2" color="primary">
            Clear
          </Typography>
        </Button>
        {/* <Button onClick={handleDownloadJSON} style={{ marginLeft: "10px" }}>
          下載 JSON
        </Button> */}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadImage}
        >
          <Typography variant="body2" color="primary">
            Download
          </Typography>
        </Button>
      </div>

      {/* 上傳背景圖片 */}
      {/* <div className="mb-3">
        <label>
          上傳背景圖片：
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadBackground}
          />
        </label>
      </div> */}

      {/* 畫布 */}
      <ReactSketchCanvas
        ref={canvasRef}
        className="border-1 border-brown-01 rounded-md"
        strokeColor={brushColor}
        strokeWidth={brushRadius}
        backgroundImage={backgroundImage}
        preserveBackgroundImageAspectRatio={"xMidYMin"}
        onChange={handleSave}
      />

      {/* 顯示保存的圖片 */}
      {/* {userSavedData && (
        <div className="mt-4">
          <h3>保存的圖片：</h3>
          <img
            src={userSavedData}
            alt="Saved Canvas"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )} */}
    </div>
  );
};

export default Whiteboard;
