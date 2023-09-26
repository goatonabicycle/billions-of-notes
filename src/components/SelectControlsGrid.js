import React from "react";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";
import Select from "./Select";
import { useMemo } from "react";
import { INSTRUMENTS, mapObjectToSelectOptionsWithValues } from "../useful";

function SelectControlsGrid({
  selectedPanelsToShow,
  setSelectedPanelsToShow,
  selectedNoteLength,
  setSelectedNoteLength,
  controlState,
  handleControlChange,
}) {
  const getInstruments = () => {
    return INSTRUMENTS;
  };

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
        max="700"
        step="5"
        editable={true}
        value={controlState.tempo}
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
        value={controlState.volume}
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
        options={useMemo(() => {
          return mapObjectToSelectOptionsWithValues(getInstruments());
        }, [])}
        onChange={handleControlChange}
        selectedValue={controlState.instrument}
      />
    </div>
  );
}

export default SelectControlsGrid;
