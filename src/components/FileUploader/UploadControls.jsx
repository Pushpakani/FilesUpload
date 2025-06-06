import React, { useRef } from "react";
import { FiPlus, FiUpload, FiX } from "react-icons/fi";

const UploadControls = ({ onFileChange, onUpload, onCancel }) => {
  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    if (e.target.files.length > 0) {
      onFileChange({ target: { files: [e.target.files[0]] } });
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files[0]) return;

    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);
    formData.append('applicantName', 'Applicant Name');

    try {
      const response = await fetch('http://localhost:5000/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        onUpload();
      } else {
        console.error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Failed to upload file');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        className="hidden"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleInputChange}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] lg:text-sm flex items-center gap-2"
      >
        <FiPlus /> Choose
      </label>
      <button
        onClick={handleUpload}
        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] lg:text-sm flex items-center gap-2"
      >
        <FiUpload /> Upload
      </button>
      <button
        onClick={onCancel}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] lg:text-sm flex items-center gap-2"
      >
        <FiX /> Cancel
      </button>
    </div>
  );
};

export default UploadControls;