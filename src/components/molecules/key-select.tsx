import React, { ChangeEvent, useCallback } from "react";
import useStore from "../../store";
import Select from "components/atoms/select";

const KeySelect: React.FC = () => {
  const key = useStore((state) => state.inputState.key);
  const setInputState = useStore((state) => state.setInputState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInputState("key", event.target.value);
    },
    [setInputState]
  );

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
        id="key"
        name="key"
        label="Key"
        onChange={handleChange}
        selectedValue={key}
        options={notesWithSharps.map((note) => ({
          value: note,
          label: note,
        }))}
      />
    </div>
  );
};

export default KeySelect;
