import React, { useState, useEffect } from "react";
import UploadControls from "./UploadControls";
import DragDropZone from "./DragDropZone";
import ErrorDisplay from "./ErrorDisplay";

const FileUploader = ({ document, onFileChange, onUpload, onCancel }) => {
  const [applicants, setApplicants] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplicantsWithDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/files/applicants/all');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setApplicants(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applicants and documents');
      console.error('Error fetching applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsWithDocuments();
  }, []);

  const handleUpload = async () => {
    await onUpload();
    await fetchApplicantsWithDocuments();
  };

  return (
    <div className="col-span-4">
      <div className="p-4 border rounded-xl bg-gray-50 flex flex-col gap-4 h-full justify-between shadow-sm transition-all">
        <div className="space-y-4">
          <UploadControls
            onFileChange={onFileChange}
            onUpload={handleUpload}
            onCancel={onCancel}
          />
          <ErrorDisplay document={document} />
          <DragDropZone document={document} onFileChange={onFileChange} />
        </div>
        
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Applicants and Documents</h2>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading applicants...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded">
              {error}
            </div>
          ) : Object.keys(applicants).length === 0 ? (
            <div className="text-gray-500 text-center py-4">
              No applicants found
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(applicants).map(([applicantName, documents]) => (
                <div key={applicantName} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">{applicantName}</h3>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
                        <div>
                          <p className="font-medium text-gray-700">{doc.documentName}</p>
                          <p className="text-sm text-gray-500">File: {doc.uploadFile}</p>
                        </div>
                        <a
                          href={`http://localhost:5000/uploads/${doc.uploadFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Document
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;