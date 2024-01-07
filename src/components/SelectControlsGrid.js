import React, { useMemo } from "react";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";
import Select from "./Select";
import {
  INSTRUMENTS,
  mapToSelectOptionsWithValues,
  mapToSelectOptions,
} from "../useful";

function SelectControlsGrid({
  selectedPanelsToShow,
  setSelectedPanelsToShow,
  selectedNoteLength,
  setSelectedNoteLength,
  controlState: { tempo, volume, instrument, notation },
  handleControlChange,
  setInstrumentName,
  currentInstrument,
}) {
  const instrumentOptions = useMemo(
    () => mapToSelectOptionsWithValues(INSTRUMENTS),
    []
  );

  const notationOptions = useMemo(
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

      <div style={{ display: "none" }}>
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
      </div>

      <Select
        id="instrument"
        name="instrument"
        label="Sounds:"
        options={instrumentOptions}
        onChange={(e) => {
          setInstrumentName(e.target.value);
        }}
        selectedValue={currentInstrument && currentInstrument.value}
      />

      <div style={{ display: "none" }}>
        <Select
          id="notation"
          name="notation"
          label="Notation"
          options={notationOptions}
          onChange={handleControlChange}
          selectedValue={notation}
        />
      </div>

      <input
        type="checkbox"
        id="tieNotes"
        checked={false}
        enabled={false}
        onChange={() => {
          alert("soon");
        }}
      />
      <label for="tieNotes">Tie notes</label>
    </div>
  );
}

export default React.memo(SelectControlsGrid);
