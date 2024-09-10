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
  controlState: {
    tempo,
    volume,
    instrument,
    notation,
    tieTogether,
    noteLength,
  },
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
        max="900"
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
        name="noteLength"
        label="Note Length"
        min="1"
        max="10"
        step="1"
        editable={false}
        value={noteLength}
        onChange={handleControlChange}
      />

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
      <div>
        <input
          type="checkbox"
          id="tieTogether"
          name="tieTogether"
          checked={tieTogether}
          onChange={handleControlChange}
        />
        <label for="tieNotes">Tie notes</label>
      </div>
    </div>
  );
}

export default React.memo(SelectControlsGrid);
