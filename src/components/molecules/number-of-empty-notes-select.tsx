import React, { ChangeEvent, useCallback } from "react";
import useStore from "../../store";
import Select from "components/atoms/select";

const NumberOfEmptyNotesSelect: React.FC = () => {
  const setInputState = useStore((state) => state.setInputState);
  const numberOfNotes = useStore((state) => state.inputState.numberOfNotes);
  const numberOfEmptyNotes = useStore(
    (state) => state.inputState.numberOfEmptyNotes
  );

  const maxEmptyNotes = Math.max(0, numberOfNotes);
  if (numberOfEmptyNotes > maxEmptyNotes) {
    setInputState("numberOfEmptyNotes", maxEmptyNotes);
  }

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        setInputState("numberOfEmptyNotes", value);
      }
    },
    [setInputState]
  );

  const notes = Array.from({ length: maxEmptyNotes }, (_, i) => i);

  return (
    <div className="w-full">
      <Select
        id="numberOfEmptyNotes"
        name="numberOfEmptyNotes"
        label="Number of empty notes"
        onChange={handleChange}
        selectedValue={numberOfEmptyNotes.toString()}
        options={notes.map((num) => ({
          value: num.toString(),
          label: num,
        }))}
      />
    </div>
  );
};

export default NumberOfEmptyNotesSelect;
