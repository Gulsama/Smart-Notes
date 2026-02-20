"use client";
import React, { useEffect } from "react";

interface PdfViewerProps {
  fileId: string;
  onClose: () => void;
}

export default function PdfViewer({ fileId, onClose }: PdfViewerProps) {
  useEffect(() => {
    const handleContext = (event: MouseEvent) => event.preventDefault();
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      if (
        (isCmdOrCtrl &&
          (event.key === "s" || event.key === "p" || event.key === "u")) ||
        event.key === "F12"
      ) {
        event.preventDefault();
        return false;
      }
    };
    document.addEventListener("contextmenu", handleContext);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContext);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center pt-4 select-none"
    >
      <button
        onClick={onClose}
        className="mb-4 px-4 py-2 text-white rounded-full bg-red-500 font-medium"
      >
        বন্ধ করুন
      </button>
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 size-20 z-20 bg-transparent"></div>
          <iframe
            src={`https://drive.google.com/file/d/${fileId}/preview`}
            className="relative w-full h-full border-none z-10"
            allow="autoplay"
          ></iframe>
      </div>
    </div>
  );
}

