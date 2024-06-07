import React from "react";
import useStore from "../../../store";

const Debug: React.FC = React.memo(() => {
  const key = useStore((state) => state.key);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Store Debug Information</h2>
      <pre className="bg-white p-4 rounded-lg border border-gray-300">
        {JSON.stringify({ key }, null, 2)}
      </pre>
    </div>
  );
});

export default Debug;
