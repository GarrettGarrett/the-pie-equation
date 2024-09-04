import React from 'react';
import Image from 'next/image';

const HandwrittenNote = ({ text }) => {
  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full pr-4">
      <div className="relative">
        <p className="text-lg font-handwritten transform  absolute -left-10 -translate-y-5">{text}</p>
        <Image 
          src="/arrow-left.png" 
          alt="arrow-left" 
          width={56}  
          height={56}
          className="rotate-6"
        />
      </div>
    </div>
  );
};

export default HandwrittenNote;

