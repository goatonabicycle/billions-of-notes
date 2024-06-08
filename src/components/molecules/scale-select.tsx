import React, { ChangeEvent, useCallback } from "react";
import useStore from "../../store";
import Select from "components/atoms/select";

interface ScaleSelectProps {
  id: string;
}

const ScaleSelect: React.FC<ScaleSelectProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const setInputState = useStore((state) => state.setInputState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInputState(id, "scale", event.target.value);
    },
    [id, setInputState]
  );

  const inputState = inputStates.find((state) => state.id === id);
  if (!inputState) return null;

  const scales = [
    "Major",
    "Minor",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Locrian",
    "Harmonic Minor",
    "Melodic Minor",
    "Whole Tone",
    "Pentatonic Major",
    "Pentatonic Minor",
  ];

  return (
    <div className="w-full">
      <Select
        id={`scale-${id}`}
        name={`scale-${id}`}
        label="Scale"
        onChange={handleChange}
        selectedValue={inputState.scale}
        options={scales.map((scale) => ({
          value: scale,
          label: scale,
        }))}
      />
    </div>
  );
};

export default ScaleSelect;
