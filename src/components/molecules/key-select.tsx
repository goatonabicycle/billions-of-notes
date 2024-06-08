import React, { ChangeEvent, useCallback } from "react";
import useStore from "../../store";
import Select from "components/atoms/select";

interface KeySelectProps {
  id: string;
}

const KeySelect: React.FC<KeySelectProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const setInputState = useStore((state) => state.setInputState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInputState(id, "key", event.target.value);
    },
    [id, setInputState]
  );

  const inputState = inputStates.find((state) => state.id === id);
  if (!inputState) return null;

  const notesWithSharps = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];

  return (
    <div className="w-full">
      <Select
        id={`key-${id}`}
        name={`key-${id}`}
        label="Key"
        onChange={handleChange}
        selectedValue={inputState.key}
        options={notesWithSharps.map((note) => ({
          value: note,
          label: note,
        }))}
      />
    </div>
  );
};

export default KeySelect;
