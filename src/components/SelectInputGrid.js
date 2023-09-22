import React, { useMemo, memo } from "react";
import Select from "./Select";
import OctaveSelector from "./OctaveSelector";
import { mapToSelectOptions } from "../useful";

const SelectInputGrid = memo(
  ({ KEYS, scales, inputState, setInputState, handleInputChange }) => {
    const keyOptions = useMemo(() => mapToSelectOptions(KEYS), [KEYS]);
    const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);
    const notesOptions = useMemo(() => {
      const notes = Array.from({ length: 40 }, (_, i) => i + 1);
      return mapToSelectOptions(notes);
    }, []);
    const emptyNotesOptions = useMemo(() => {
      const maxEmptyNotes = Math.max(0, parseInt(inputState.numberOfNotes) - 3);
      const emptyNotesOptions = Array.from(
        { length: maxEmptyNotes + 1 },
        (_, i) => i
      );
      return mapToSelectOptions(emptyNotesOptions);
    }, [inputState.numberOfNotes]);

    return (
      <div className="select-grid">
        <Select
          id="key"
          name="key"
          label="Key:"
          options={keyOptions}
          onChange={handleInputChange}
          selectedValue={inputState.key}
        />

        <Select
          id="scale"
          name="scale"
          label="Scale:"
          options={scaleOptions}
          onChange={handleInputChange}
          selectedValue={inputState.scale}
        />

        <Select
          id="numberOfNotes"
          name="numberOfNotes"
          label="Notes:"
          options={notesOptions}
          onChange={handleInputChange}
          selectedValue={inputState.numberOfNotes}
        />

        <Select
          id="emptyNotes"
          name="emptyNotes"
          label="Empty notes:"
          options={emptyNotesOptions}
          onChange={handleInputChange}
          selectedValue={inputState.emptyNotes}
        />

        <OctaveSelector
          inputState={inputState}
          setInputState={setInputState}
        />
      </div>
    );
  }
);

export default SelectInputGrid;
