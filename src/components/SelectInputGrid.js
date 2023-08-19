import React, { useMemo, memo, useCallback } from "react";
import Select from "./Select";
import OctaveSelector from "./OctaveSelector";
import { mapToSelectOptions } from "../useful";

const SelectInputGrid = memo(
  ({
    KEYS,
    scales,
    selectedKey,
    setSelectedKey,
    selectedScale,
    setSelectedScale,
    selectedNumberOfNotes,
    setSelectedNumberOfNotes,
    selectedEmptyNotes,
    setSelectedEmptyNotes,
    selectedOctaves,
    setSelectedOctaves,
  }) => {
    const keyOptions = useMemo(() => mapToSelectOptions(KEYS), []);
    const scaleOptions = useMemo(() => mapToSelectOptions(scales), []);
    const notesOptions = useMemo(() => {
      const notes = Array.from({ length: 40 }, (_, i) => i + 1);
      return mapToSelectOptions(notes);
    }, []);
    const emptyNotesOptions = useMemo(() => {
      const maxEmptyNotes = Math.max(0, parseInt(selectedNumberOfNotes) - 3);
      const emptyNotesOptions = Array.from(
        { length: maxEmptyNotes + 1 },
        (_, i) => i
      );
      return mapToSelectOptions(emptyNotesOptions);
    }, [selectedNumberOfNotes]);

    const handleKeyChange = useCallback((value) => setSelectedKey(value), []);
    const handleScaleChange = useCallback(
      (value) => setSelectedScale(value),
      []
    );
    const handleNumberOfNotesChange = useCallback(
      (value) => setSelectedNumberOfNotes(value),
      []
    );
    const handleEmptyNotesChange = useCallback(
      (value) => setSelectedEmptyNotes(value),
      []
    );

    return (
      <div className="select-grid">
        <Select
          id="keySelect"
          label="Key:"
          options={keyOptions}
          onChange={handleKeyChange}
          selectedValue={selectedKey}
        />

        <Select
          id="ScaleSelect"
          label="Scale:"
          options={scaleOptions}
          onChange={handleScaleChange}
          selectedValue={selectedScale}
        />

        <Select
          id="numOfNotesSelect"
          label="Notes:"
          options={notesOptions}
          onChange={handleNumberOfNotesChange}
          selectedValue={selectedNumberOfNotes}
        />

        <Select
          id="mixEmptySelect"
          label="Empty notes:"
          options={emptyNotesOptions}
          onChange={handleEmptyNotesChange}
          selectedValue={selectedEmptyNotes}
        />

        <OctaveSelector
          selectedOctaves={selectedOctaves}
          setSelectedOctaves={setSelectedOctaves}
        />
      </div>
    );
  }
);

export default SelectInputGrid;
