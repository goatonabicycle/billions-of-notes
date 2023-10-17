import React, { useMemo } from "react";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";
import Select from "./Select";
import {
  INSTRUMENTS,
  mapObjectToSelectOptionsWithValues,
  mapToSelectOptions,
} from "../useful";

function SelectControlsGrid({
  selectedPanelsToShow,
  setSelectedPanelsToShow,
  selectedNoteLength,
  setSelectedNoteLength,
  controlState: { tempo, volume, instrument, noteMode },
  handleControlChange,
}) {
  const instrumentOptions = useMemo(
    () => mapObjectToSelectOptionsWithValues(INSTRUMENTS),
    []
  );

  const noteModeOptions = useMemo(
    () => mapToSelectOptions(["flat", "sharp"]),
    []
  );

  return (
    <div className="select-grid">
      <ShowMeSelector
        selectedPanelsToShow={selectedPanelsToShow}
        setSelectedPanelsToShow={setSelectedPanelsToShow}
      />

      <Slider
        id="tempoSlider"
        name="tempo"
        label="Tempo"
        min="0"
        max="600"
        step="5"
        editable={true}
        value={tempo}
        onChange={handleControlChange}
      />

      <Slider
        id="volumeSlider"
        name="volume"
        label="Volume"
        min="0"
        max="100"
        step="1"
        editable={false}
        value={volume}
        onChange={handleControlChange}
      />

      <Slider
        id="noteLengthSlider"
        label="Note Length"
        min="1"
        max="10"
        step="1"
        editable={false}
        value={selectedNoteLength}
        onChange={(e) => {
          setSelectedNoteLength(parseInt(e.target.value, 10));
        }}
      />

      <Select
        id="instrument"
        name="instrument"
        label="Sounds:"
        options={instrumentOptions}
        onChange={handleControlChange}
        selectedValue={instrument}
      />

      <Select
        id="noteMode"
        name="noteMode"
        label="Note mode:"
        options={noteModeOptions}
        onChange={handleControlChange}
        selectedValue={noteMode}
      />
    </div>
  );
}

export default React.memo(SelectControlsGrid);
