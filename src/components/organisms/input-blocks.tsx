import React, { useEffect } from "react";
import useInputStore from "../../store/inputStore";
import Input from "../molecules/input";

const InputBlocks: React.FC = () => {
  const { inputStates, addInputState } = useInputStore();

  useEffect(() => {}, [inputStates, addInputState]);

  return (
    <div>
      <div className="flex space-x-4">
        {inputStates.map((inputState) => (
          <div key={inputState.id} className="p-4 border border-gray-500">
            <Input id={inputState.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputBlocks;
