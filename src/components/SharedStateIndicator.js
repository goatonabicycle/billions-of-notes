import React from 'react';

const SharedStateIndicator = ({ stateId, isModified }) => {
  if (!stateId || isModified) return null;

  return (
    <div className="text-sm text-gray-400 bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 px-3 py-2 rounded-lg">
      Looking at /{stateId}
    </div>
  );
};

export default SharedStateIndicator;