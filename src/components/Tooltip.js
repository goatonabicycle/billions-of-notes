import React from 'react';

const Tooltip = ({ text, children }) => {
  if (!text) return children;

  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-[9999] pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 w-max max-w-[200px]">
        <div className="px-3 py-1 text-xs text-pink-100 text-center break-words rounded-lg bg-pink-950/90 backdrop-blur-sm border border-pink-400/30">
          {text}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tooltip);