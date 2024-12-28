"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, styled, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

import { VisuallyHiddenInput } from "@/components/VisuallyHiddenInput";
import { cn } from "@/lib/utils";
import useCommonStore from "@/stores/useCommonStore";
const acceptFileTypes = ["image/*"];

function UploadImage({ className }: { className?: string }) {
  const { uploadImageFile, setUploadImageFile } = useCommonStore();
  // const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploadImageFile(file);
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setUserSavedData(e.target?.result as string);
      // };
      // reader.readAsDataURL(file);
    }
    // setSelectedFile(file);
  };

  //   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //     event.preventDefault();
  //     const file = event.dataTransfer.files?.[0];

  //     if (file) {
  //       setUserSavedData(file);
  //     }
  //   };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClickSelectFile = () => {
    inputRef.current?.click();
  };

  const handleClear = () => {
    setUploadImageFile(undefined);
  };

  return (
    <div className={cn("", className)}>
      {/* <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-1 border-dashed border-brown-01 rounded-lg p-4 cursor-default"
      >
        <Typography variant="h6" color="primary">
          Drag a file here
        </Typography>
        <Button
          variant="outlined"
          onClick={handleClickSelectFile}
          startIcon={<CloudUploadIcon />}
        >
          <Typography variant="body2" color="primary">
            Upload a file
          </Typography>
        </Button>
        <VisuallyHiddenInput
          ref={inputRef}
          type="file"
          accept={acceptFileTypes.join(",")}
          onChange={handleFileChange}
        />
      </div> */}
      <div className="flex items-center gap-2">
        <Button
          variant="outlined"
          onClick={handleClickSelectFile}
          startIcon={<CloudUploadIcon />}
        >
          <Typography variant="body2" color="primary">
            Upload a file
          </Typography>
        </Button>
        <VisuallyHiddenInput
          ref={inputRef}
          type="file"
          accept={acceptFileTypes.join(",")}
          onChange={handleFileChange}
        />
        {uploadImageFile?.name && (
          <div className="flex items-center">
            <Typography variant="body2" color="primary">
              {uploadImageFile.name}
            </Typography>
            <IconButton color="primary" onClick={handleClear}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
