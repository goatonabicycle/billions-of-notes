import React from "react";
import useStore from "../../store";
import KeySelect from "components/molecules/key-select";
import ScaleSelect from "components/molecules/scale-select";
import NumberOfNotesSelect from "components/molecules/number-of-notes-select";
import NumberOfEmptyNotesSelect from "components/molecules/number-of-empty-notes-select";

interface InputProps {
  id: string;
}

const Input: React.FC<InputProps> = ({ id }) => {
  const { inputStates, removeInputState } = useStore();

  const inputState = inputStates.find((state) => state.id === id);
  if (!inputState) return null;

  return (
    <div className="border-solid border-2 border-red-600 mb-4">
      <KeySelect id={id} />
      <ScaleSelect id={id} />
      <NumberOfNotesSelect id={id} />
      <NumberOfEmptyNotesSelect id={id} />
      <button
        onClick={() => removeInputState(id)}
        className="mt-2 bg-red-500 text-white px-4 py-2"
      >
        Remove
      </button>
    </div>
  );
};

export default Input;
