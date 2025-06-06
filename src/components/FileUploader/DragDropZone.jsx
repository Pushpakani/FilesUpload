import React, { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiFileText, FiImage, FiFile } from "react-icons/fi";

const DragDropZone = ({ document, onFileChange }) => {
  const fileInputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (document?.file && document.file.type.startsWith("image")) {
      const url = URL.createObjectURL(document.file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [document?.file]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange({ target: { files: [e.dataTransfer.files[0]] } });
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getFileIcon = () => {
    if (!document?.file) return <FiFileText size={36} className="text-blue-600" />;
    if (document.file.type === "application/pdf")
      return <FiFileText size={36} className="text-red-600" />;
    if (document.file.type.includes("word"))
      return <FiFileText size={36} className="text-blue-600" />;
    if (document.file.type.startsWith("image"))
      return <FiImage size={36} className="text-green-600" />;
    return <FiFile size={36} className="text-gray-600" />;
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="mt-6 border border-dashed border-gray-300 p-6 rounded-lg text-center text-gray-500 text-[3.8vw] sm:text-[2.3vw] md:text-sm cursor-pointer hover:border-blue-400 transition"
      onClick={() => fileInputRef.current?.click()}
    >
      {document?.file ? (
        <div className="flex flex-col items-center gap-2 text-center">
          {getFileIcon()}
          <p className="font-medium text-[4vw] sm:text-[2.5vw] md:text-sm">
            {document.file.name}
          </p>
          <p className="text-xs text-gray-400">
            {(document.file.size / 1024).toFixed(2)} KB
          </p>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 rounded-md max-h-40 object-contain border"
            />
          )}
          <span
            className={`text-xs font-medium mt-1 px-3 py-1 rounded-full ${
              document.status === "Completed"
                ? "bg-green-200 text-green-800"
                : document.status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {document.status}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <FiAlertCircle size={28} className="text-blue-400" />
          <p>
            Drag and Drop files here or click <strong>Choose</strong> to upload.
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropZone;