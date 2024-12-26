import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    // Prevent event from bubbling up to any parent form
    e.preventDefault();
    e.stopPropagation();
    
    setIsOpen(!isOpen);
    if (!isOpen && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={sectionRef} className="border rounded-lg mb-4 shadow-sm scroll-mt-4">
      <button
        onClick={handleToggle}
        type="button" // Explicitly set type to prevent form submission
        className={clsx(
          "w-full px-4 py-3 flex items-center justify-between",
          "text-left font-semibold text-gray-700",
          "bg-gradient-to-r from-gray-50 to-white",
          "hover:bg-gray-50 transition-colors duration-200",
          "rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  );
}