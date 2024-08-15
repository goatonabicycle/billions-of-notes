import React, { ChangeEvent } from "react";
import useStore from "../../store/inputStore";

interface OctaveSelectProps {
  id: string;
}

const OctaveSelect: React.FC<OctaveSelectProps> = ({ id }) => {
  const inputStates = useStore((state) => state.inputStates);
  const setInputState = useStore((state) => state.setInputState);

  const inputState = inputStates.find((state) => state.id === id);
  if (!inputState) return null;

  const handleOctaveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) return;

    let updatedOctaves: number[];
    if (event.target.checked) {
      updatedOctaves = inputState.octaves.includes(value)
        ? inputState.octaves
        : [...inputState.octaves, value].sort((a, b) => a - b);
    } else {
      updatedOctaves = inputState.octaves.filter((octave) => octave !== value);
    }

    setInputState(id, "octaves", updatedOctaves);
  };

  const octaveOptions = [1, 2, 3, 4, 5, 6];

  return (
    <div className="text-center">
      <label className="block mb-2 ">Select Octaves:</label>
      <div className="flex justify-center flex-wrap space-x-2">
        {octaveOptions.map((octave) => (
          <label key={octave} className="flex items-center space-x-1">
            <input
              type="checkbox"
              value={octave}
              checked={inputState.octaves.includes(octave)}
              onChange={handleOctaveChange}
              className="mr-1"
            />
            {`${octave}`}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OctaveSelect;
