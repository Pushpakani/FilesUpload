import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, title, onClose, children }) => {
  const modalRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isTyping) onClose();
      if (e.key === "Tab") {
        // Trap focus inside modal
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Add event listeners for input elements
    const handleInputFocus = () => setIsTyping(true);
    const handleInputBlur = () => setIsTyping(false);

    const inputs = modalRef.current.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', handleInputFocus);
      input.addEventListener('blur', handleInputBlur);
    });

    document.addEventListener("keydown", handleKeyDown);
    // Focus first focusable element
    setTimeout(() => {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements.length && focusableElements[0].focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      inputs.forEach(input => {
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
      });
    };
  }, [isOpen, onClose, isTyping]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !isTyping) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    if (!isTyping) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative max-h-[80vh] overflow-auto animate-fadeIn"
      >
        <h3 id="modal-title" className="text-xl font-semibold mb-4">
          {title}
        </h3>
        <button
          className={`absolute top-3 right-3 text-gray-500 hover:text-gray-700 ${isTyping ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleCloseClick}
          aria-label="Close modal"
          disabled={isTyping}
        >
          <FiX className="text-xl" />
        </button>
        {children}
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
