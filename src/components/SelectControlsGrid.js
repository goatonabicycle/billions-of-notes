import React from "react";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";
import Select from "./Select";
import { useMemo } from "react";
import { INSTRUMENTS, mapObjectToSelectOptionsWithValues } from "../useful";

function SelectControlsGrid({
  selectedPanelsToShow,
  setSelectedPanelsToShow,
  selectedTempo,
  setSelectedTempo,
  selectedVolume,
  setSelectedVolume,
  selectedNoteLength,
  setSelectedNoteLength,
  inputState,
  handleInputChange,
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
        label="Tempo"
        min="0"
        max="700"
        step="5"
        editable={true}
        value={selectedTempo}
        onChange={(e) => {
          setSelectedTempo(parseInt(e.target.value, 10));
        }}
      />

      <Slider
        id="volumeSlider"
        label="Volume"
        min="0"
        max="100"
        step="1"
        editable={false}
        value={selectedVolume}
        onChange={(e) => {
          setSelectedVolume(parseInt(e.target.value, 10));
        }}
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
        onChange={handleInputChange}
        selectedValue={inputState.instrument}
      />
    </div>
  );
}

export default SelectControlsGrid;
