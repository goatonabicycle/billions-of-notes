import React, { ChangeEvent, useCallback } from "react";

import useStore from "../../store";
import Select from "components/atoms/select";

const ScaleSelect: React.FC = () => {
  const scale = useStore((state) => state.inputState.scale);
  const setInputState = useStore((state) => state.setInputState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInputState("scale", event.target.value);
    },
    [setInputState]
  );

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
  // Get these from tonejs

  return (
    <div className="w-full">
      <Select
        id="scale"
        name="scale"
        label="Scale"
        onChange={handleChange}
        selectedValue={scale}
        options={scales.map((scale) => ({
          value: scale,
          label: scale,
        }))}
      />
    </div>
  );
};

export default ScaleSelect;
