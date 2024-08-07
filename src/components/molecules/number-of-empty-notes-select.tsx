import React, { ChangeEvent, useCallback, useEffect } from "react";
import useStore from "../../store/inputStore";
import Select from "components/atoms/select";

interface NumberOfEmptyNotesSelectProps {
  id: string;
}

const NumberOfEmptyNotesSelect: React.FC<NumberOfEmptyNotesSelectProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const setInputState = useStore((state) => state.setInputState);

  const inputState = inputStates.find((state) => state.id === id);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        setInputState(id, "numberOfEmptyNotes", value);
      }
    },
    [id, setInputState]
  );

  useEffect(() => {
    if (inputState) {
      const maxEmptyNotes = Math.max(0, inputState.numberOfNotes);
      if (inputState.numberOfEmptyNotes > maxEmptyNotes) {
        setInputState(id, "numberOfEmptyNotes", maxEmptyNotes);
      }
    }
  }, [id, inputState, setInputState]);

  if (!inputState) return null;

  const notes = Array.from({ length: Math.max(0, inputState.numberOfNotes) + 1 }, (_, i) => i);

  return (
    <div className="w-full">
      <Select
        id={`numberOfEmptyNotes-${id}`}
        name={`numberOfEmptyNotes-${id}`}
        label="Number of Empty Notes"
        onChange={handleChange}
        selectedValue={inputState.numberOfEmptyNotes.toString()}
        options={notes.map((num) => ({
          value: num.toString(),
          label: num,
        }))}
      />
    </div>
  );
};

export default NumberOfEmptyNotesSelect;
