import React, { ChangeEvent, useCallback } from "react";
import useStore from "../../store/inputStore";
import Select from "components/atoms/select";

interface NumberOfNotesSelectProps {
  id: string;
}

const NumberOfNotesSelect: React.FC<NumberOfNotesSelectProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const setInputState = useStore((state) => state.setInputState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        setInputState(id, "numberOfNotes", value);
      }
    },
    [id, setInputState]
  );

  const inputState = inputStates.find((state) => state.id === id);
  if (!inputState) return null;

  const notes = Array.from({ length: 399 }, (_, i) => i + 1);

  return (
    <Select
      id={`numberOfNotes-${id}`}
      name={`numberOfNotes-${id}`}
      label="Number of Notes"
      onChange={handleChange}
      selectedValue={inputState.numberOfNotes.toString()}
      options={notes.map((num) => ({
        value: num.toString(),
        label: num,
      }))}
    />
  );
};

export default NumberOfNotesSelect;
