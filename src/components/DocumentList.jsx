import React from "react";
import { FiFolderPlus } from "react-icons/fi";

const DocumentList = ({ documents, selectedDocIndex, onSelect, onAdd }) => {
  return (
    <div className="col-span-2 bg-blue-50 p-1 sm:p-4 rounded-md flex flex-col gap-3 min-h-[300px]">
      <>
        {documents?.map((doc, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            className={`text-start md:text-center font-medium cursor-pointer transition-all text-[4vw] sm:text-[2.5vw] md:text-[1.5vw] lg:text-sm p-2 rounded-md ${
              selectedDocIndex === idx
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-blue-800 hover:bg-blue-300"
            }`}
          >
            {doc.name}
          </div>
        ))}
      </>
      <>
        <button
          onClick={onAdd}
          className="mt-auto bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2 text-[4vw] sm:text-[2.5vw] md:text-[1.5vw] lg:text-sm"
        >
          <FiFolderPlus className="text-inherit" /> Add
        </button>
      </>
    </div>
  );
};

export default DocumentList;
