import React, { ChangeEvent, useCallback } from "react";
import useStore from "../../store";
import Select from "components/atoms/select";

const NumberOfNotesSelect: React.FC = () => {
  const numberOfNotes = useStore((state) => state.inputState.numberOfNotes);
  const setInputState = useStore((state) => state.setInputState);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        setInputState("numberOfNotes", value);
      }
    },
    [setInputState]
  );

  const notes = Array.from({ length: 399 }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <Select
        id="numberOfNotes"
        name="numberOfNotes"
        label="Number of Notes"
        onChange={handleChange}
        selectedValue={numberOfNotes.toString()}
        options={notes.map((num) => ({
          value: num.toString(),
          label: num,
        }))}
      />
    </div>
  );
};

export default NumberOfNotesSelect;
