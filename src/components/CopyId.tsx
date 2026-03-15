'use client';

import { useState } from 'react';

export const CopyId = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayId = id.length > 8 ? id.slice(0, 4) + '...' : id;

  return (
    <div className="relative inline-block">
      <span 
        onClick={handleCopy}
        className="text-sm text-[rgba(18,20,23,0.3)] cursor-pointer hover:text-[#3470FF] transition-colors flex items-center gap-1"
        title="Click to copy full ID"
      >
        Id: {displayId}
        <span className="text-[10px] opacity-50">📋</span>
      </span>
      
      {copied && (
        <span className="absolute -top-6 left-0 bg-[#121417] text-white text-[10px] px-2 py-1 rounded shadow-lg animate-fade-in">
          Copied!
        </span>
      )}
    </div>
  );
};