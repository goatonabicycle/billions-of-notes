import React, { useMemo, memo } from "react";
import Select from "./Select";
import OctaveSelector from "./OctaveSelector";
import { mapToSelectOptions } from "../useful";

const SelectInputGrid = memo(
  ({
    KEYS,
    scales,
    inputKey,
    inputScale,
    inputNumberOfNotes,
    inputEmptyNotes,
    inputOctaves,
    setInputState,
    handleInputChange,
  }) => {
    const keyOptions = useMemo(() => mapToSelectOptions(KEYS), [KEYS]);
    const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);
    const notesOptions = useMemo(() => {
      const notes = Array.from({ length: 40 }, (_, i) => i + 1);
      return mapToSelectOptions(notes);
    }, []);
    const emptyNotesOptions = useMemo(() => {
      const maxEmptyNotes = Math.max(0, parseInt(inputNumberOfNotes) - 3);
      const emptyNotesOptions = Array.from(
        { length: maxEmptyNotes + 1 },
        (_, i) => i
      );
      return mapToSelectOptions(emptyNotesOptions);
    }, [inputNumberOfNotes]);

    return (
      <div className="select-grid">
        <Select
          id="key"
          name="key"
          label="Key:"
          options={keyOptions}
          onChange={handleInputChange}
          selectedValue={inputKey}
        />

        <Select
          id="scale"
          name="scale"
          label="Scale:"
          options={scaleOptions}
          onChange={handleInputChange}
          selectedValue={inputScale}
        />

        <Select
          id="numberOfNotes"
          name="numberOfNotes"
          label="Notes:"
          options={notesOptions}
          onChange={handleInputChange}
          selectedValue={inputNumberOfNotes}
        />

        <Select
          id="emptyNotes"
          name="emptyNotes"
          label="Empty notes:"
          options={emptyNotesOptions}
          onChange={handleInputChange}
          selectedValue={inputEmptyNotes}
        />

        <OctaveSelector
          octaves={inputOctaves}
          setInputState={setInputState}
        />
      </div>
    );
  }
);

export default SelectInputGrid;
