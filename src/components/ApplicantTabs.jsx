import React from "react";
import { FiTrash } from "react-icons/fi";

const ApplicantTabs = ({
  applicants,
  activeIndex,
  setActiveIndex,
  onDelete,
}) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 overflow-x-auto mb-4">
      {applicants.map((applicant, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`flex items-center justify-between gap-2 px-3 py-2 border-b-2 cursor-pointer shadow-sm transition-all rounded-md min-w-[150px] sm:min-w-[120px] ${
            activeIndex === index
              ? "bg-blue-700 text-white"
              : "bg-white border-gray-200 text-blue-600 hover:border-blue-500"
          }`}
        >
          <span className="font-medium truncate max-w-[90px] sm:max-w-[70px] text-[3.5vw] sm:text-[2vw] md:text-[1.2vw] lg:text-sm">
            {applicant.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
            className="text-red-600 hover:text-red-800 text-[3.5vw] sm:text-[2vw] md:text-[1.2vw] lg:text-sm"
          >
            <FiTrash />
          </button>
        </div>
      ))}
                <div className="border-b-2 border-blue-500 mb-4"></div>
    </div>
  );
};

export default ApplicantTabs;
