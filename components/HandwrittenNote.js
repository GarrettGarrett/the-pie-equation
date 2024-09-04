import React from 'react';

const HandwrittenNote = ({ text }) => {
  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full pr-4">
      <div className="relative">
        <p className="text-lg font-handwritten transform  absolute -left-10 -translate-y-5">{text}</p>
        <img src="/arrow-left.png" alt="arrow-left" className="h-14 w-auto rotate-6" />
      </div>
    </div>
  );
};

export default HandwrittenNote;

