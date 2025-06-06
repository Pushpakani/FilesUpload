import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const ErrorDisplay = ({ document }) => {
  if (!document?.fileError) return null;

  return (
    <div className="text-red-600 text-sm mt-2 flex items-center gap-2">
      <FiAlertCircle /> {document.fileError}
    </div>
  );
};

export default ErrorDisplay;
