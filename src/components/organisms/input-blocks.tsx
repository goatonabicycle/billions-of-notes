import React, { useEffect } from "react";
import useInputStore from "../../store/inputStore";
import useCurrentNoteStore from "../../store/currentNoteStore";
import Input from "../molecules/input";

const InputBlocks: React.FC = () => {
  const { inputStates, addInputState, removeInputState } = useInputStore();
  const { removeCurrentNote } = useCurrentNoteStore();

  useEffect(() => {}, [inputStates, addInputState]);

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button onClick={addInputState} className="px-4 py-2 bg-green-500 text-white">
          Add New Input
        </button>
      </div>
      <div className="flex space-x-4">
        {inputStates.map((inputState) => (
          <div key={inputState.id} className="p-4 border border-gray-500">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Input {inputState.id}</h2>
              <button
                onClick={() => {
                  removeCurrentNote(inputState.id);
                  removeInputState(inputState.id);
                }}
                className="text-red-500"
              >
                x
              </button>
            </div>
            <Input id={inputState.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputBlocks;
