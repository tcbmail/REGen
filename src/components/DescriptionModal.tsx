import React from 'react';
import { Copy, X } from 'lucide-react';

interface DescriptionModalProps {
  description: string;
  onClose: () => void;
}

export function DescriptionModal({ description, onClose }: DescriptionModalProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      alert('Description copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy description');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Generated Description</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <pre className="whitespace-pre-wrap font-sans text-gray-700">
            {description}
          </pre>
        </div>
      </div>
    </div>
  );
}