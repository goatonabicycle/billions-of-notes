import React from "react";
import useStore from "../../store";
import Button from "components/atoms/button";

const Debug: React.FC = React.memo(() => {
  const inputStates = useStore((state) => state.inputStates);
  const resetInputState = useStore((state) => state.resetInputState);

  const handleReset = () => {
    resetInputState();
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-8 text-black">
      <h2 className="text-xl font-bold mb-4">Store Debug Information</h2>
      <pre className="bg-gray-600 p-4 rounded-lg border border-gray-900 ">
        {JSON.stringify(inputStates, null, 2)}
      </pre>
      <Button onClick={handleReset}>Reset State</Button>
    </div>
  );
});

export default Debug;
