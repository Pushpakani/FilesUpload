import React, { useState } from "react";
import ApplicantTabs from "../components/ApplicantTabs";
import Modal from "../components/Modal";
import DocumentList from "../components/DocumentList";
import FileUploader from "../components/FileUploader/Index";
import {
  FiPlus,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiX,
} from "react-icons/fi";

const DocumentUpload = () => {
  const [applicants, setApplicants] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  const [newName, setNewName] = useState("");
  const [isAddingApplicant, setIsAddingApplicant] = useState(true);
  const [selectedDocIndex, setSelectedDocIndex] = useState(null);

  const handleAddApplicant = () => {
    setModalLabel("Enter applicant name:");
    setIsAddingApplicant(true);
    setNewName("");
    setModalOpen(true);
  };

  const handleAddDocument = () => {
    setModalLabel("Enter document name:");
    setIsAddingApplicant(false);
    setNewName("");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!newName.trim()) return;
    if (isAddingApplicant) {
      const updated = [
        ...applicants,
        {
          name: newName.trim(),
          documents: [{ name: "Aadhaar", file: null, status: "None" }],
        },
      ];
      setApplicants(updated);
      setActiveIndex(updated.length - 1);
    } else {
      const updated = [...applicants];
      updated[activeIndex].documents.push({
        name: newName.trim(),
        file: null,
        status: "None",
      });
      setApplicants(updated);
    }
    setModalOpen(false);
  };

  const handleDeleteApplicant = (index) => {
    const updated = [...applicants];
    updated.splice(index, 1);
    setApplicants(updated);
    if (activeIndex >= updated.length) {
      setActiveIndex(updated.length - 1);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || selectedDocIndex === null) return;
    const updated = [...applicants];
    updated[activeIndex].documents[selectedDocIndex] = {
      ...updated[activeIndex].documents[selectedDocIndex],
      file,
      status: "Pending",
    };
    setApplicants(updated);
  };

  const handleUploadClick = () => {
    if (selectedDocIndex === null) return;
    const updated = [...applicants];
    const selectedDoc = updated[activeIndex].documents[selectedDocIndex];
    if (selectedDoc.file && selectedDoc.status === "Pending") {
      selectedDoc.status = "Completed";
      setApplicants(updated);
    }
  };

  const handleCancel = () => {
    if (selectedDocIndex === null) return;
    const updated = [...applicants];
    updated[activeIndex].documents[selectedDocIndex] = {
      ...updated[activeIndex].documents[selectedDocIndex],
      file: null,
      status: "None",
    };
    setApplicants(updated);
  };

  const selectedDocument =
    selectedDocIndex !== null
      ? applicants[activeIndex].documents[selectedDocIndex]
      : null;

  return (
    <div className="max-w-6xl mx-auto px-[4vw] py-[4vh]">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-[5vw] sm:text-3xl font-bold">Document Upload</h1>
        <button
          onClick={handleAddApplicant}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-[3.5vw] sm:text-sm flex items-center gap-2"
        >
          <FiPlus /> Add Applicant
        </button>
      </div>

      <div className="mt-6">
        <ApplicantTabs
          applicants={applicants}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onDelete={handleDeleteApplicant}
        />
      </div>

      <div className="grid grid-cols-6 gap-6 mt-4 mb-6">
        {applicants.length > 0 && (
          <>
            <DocumentList
              documents={applicants[activeIndex]?.documents}
              selectedDocIndex={selectedDocIndex}
              onSelect={setSelectedDocIndex}
              onAdd={handleAddDocument}
            />
            <FileUploader
              document={selectedDocument}
              onFileChange={handleFileChange}
              onUpload={handleUploadClick}
              onCancel={handleCancel}
            />
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
              setSelectedDocIndex(null);
            }
          }}
          disabled={activeIndex === 0}
          className={`px-2 py-1 md:px-4 md:py-2 rounded-md text-[3.5vw] sm:text-sm flex items-center gap-2 transition ${
            activeIndex === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <FiArrowLeft /> Back
        </button>

        <button
          onClick={() => {
            if (activeIndex < applicants.length - 1) {
              setActiveIndex(activeIndex + 1);
              setSelectedDocIndex(null);
            }
          }}
          disabled={activeIndex === applicants.length - 1}
          className={`px-2 py-1 md:px-4 md:py-2  rounded-md text-[3.5vw] sm:text-sm flex items-center gap-2 transition ${
            activeIndex === applicants.length - 1
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Next <FiArrowRight />
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        title={isAddingApplicant ? "Add Applicant" : "Add Document"}
        onClose={() => setModalOpen(false)}
      >
        <label className="block mb-2 text-[3.5vw] sm:text-sm font-medium text-gray-700">
          {modalLabel}
        </label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-[3.5vw] sm:text-sm"
          placeholder={
            isAddingApplicant ? "Enter applicant name" : "Enter document name"
          }
        />
        <div className="flex justify-end mt-6 gap-3">
          <button
            className="bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-700 transition text-[3.5vw] sm:text-sm flex items-center gap-2"
            onClick={handleSave}
          >
            <FiCheck /> Save
          </button>
          <button
            className="bg-gray-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-gray-700 transition text-[3.5vw] sm:text-sm flex items-center gap-2"
            onClick={() => setModalOpen(false)}
          >
            <FiX /> Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentUpload;
