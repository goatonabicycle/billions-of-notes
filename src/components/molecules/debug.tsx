import React, { useEffect } from "react";
import useInputStore from "../../store/inputStore";
import useCurrentNoteStore from "../../store/currentNoteStore";
import Button from "components/atoms/button";
import ReactJson from "react-json-view";

const Debug: React.FC = React.memo(() => {
  const inputStates = useInputStore((state) => state.inputStates);
  const resetInputState = useInputStore((state) => state.resetInputState);
  const currentNotes = useCurrentNoteStore((state) => state.currentNotes);

  useEffect(() => {
    const unsubscribe = useInputStore.subscribe((state) => {
      console.log("Input states updated:", state.inputStates);
    });

    return () => unsubscribe();
  }, []);

  const handleReset = () => {
    resetInputState();
  };

  return (
    <div className="bottom-0 left-0 w-full bg-gray-700 p-4 rounded-t-lg shadow-lg text-white z-50">
      <h2 className="text-xl font-bold mb-4">Store Debug Information</h2>
      <div className="bg-gray-600 p-4 rounded-lg border border-gray-900 max-h-200 overflow-y-auto">
        <ReactJson
          src={inputStates}
          collapsed={1}
          theme="monokai"
          displayDataTypes={true}
          enableClipboard={false}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
      <div className="bg-gray-600 p-4 rounded-lg border border-gray-900 max-h-200 overflow-y-auto mt-4">
        <ReactJson
          src={currentNotes}
          collapsed={1}
          theme="monokai"
          displayDataTypes={true}
          enableClipboard={false}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
      <div className="mt-4 text-right">
        <Button onClick={handleReset}>Reset State</Button>
      </div>
    </div>
  );
});

export default Debug;
