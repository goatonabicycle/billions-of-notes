import React, { ChangeEvent } from "react";
import useStore from "../../../store";
import Select from "components/atoms/select";
import "./key-select.css";

const KeySelect: React.FC = () => {
  const key = useStore((state) => state.key);
  const setKey = useStore((state) => state.setKey);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setKey(event.target.value);
  };

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
    <div className="border-gray-500 text-white">
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
