import React, { useCallback } from "react";

import { useStorage } from "../useLocalStorage";
import {
  DEFAULT_POSITION,
  DEFAULT_FINGER_RANGE,
  DEFAULT_NUMBER_OF_UKELELE_STRINGS,
  INITIAL_UKELELE_TUNING,
  DEFAULT_NUMBER_OF_GUITAR_FRETS,
} from "../useful";

import Slider from "./Slider";
import Fretboard from "./Fretboard";

import "./Ukelele.css";

const Ukelele = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  const [selectedPosition, setSelectedPosition] = useStorage(
    "selectedPosition",
    DEFAULT_POSITION
  );

  const [selectedUkeleleFingerRange, setSelectedUkeleleFingerRange] =
    useStorage("selectedUkeleleFingerRange", DEFAULT_FINGER_RANGE);

  const [selectedNumberOfUkeleleStrings, setSelectedNumberOfUkeleleStrings] =
    useStorage("selectedUkeleleStrings", DEFAULT_NUMBER_OF_UKELELE_STRINGS);

  const [numberOfUkeleleFrets, setNumberOfUkeleleFrets] = useStorage(
    "numberOfUkeleleFrets",
    DEFAULT_NUMBER_OF_GUITAR_FRETS
  );

  const [selectedUkeleleTuning, setSelectedUkeleleTuning] = useStorage(
    "selectedUkeleleTuning",
    INITIAL_UKELELE_TUNING
  );

  const handlePositionChange = useCallback((e) => {
    setSelectedPosition(parseInt(e.target.value, 10));
  }, []);

  const handleFingerRangeChange = useCallback((e) => {
    setSelectedUkeleleFingerRange(parseInt(e.target.value, 10));
  }, []);

  const handleNumberOfUkeleleStringsChange = useCallback((e) => {
    setSelectedNumberOfUkeleleStrings(parseInt(e.target.value, 10));
  }, []);

  const handleNumberOfUkeleleFretsChange = useCallback((e) => {
    setNumberOfUkeleleFrets(parseInt(e.target.value, 10));
  }, []);

  let strings = selectedUkeleleTuning.slice(0, selectedNumberOfUkeleleStrings);

  return (
    <div className="ukelele-container doodle-border">
      {"Ukelele"}

      <div className="ukelele-inputs">
        <Slider
          id="positionSlider"
          label="Play from"
          min="0"
          max={numberOfUkeleleFrets}
          step="1"
          editable={false}
          value={selectedPosition}
          onChange={handlePositionChange}
        />

        <Slider
          id="fingerRangeSlider"
          label="Finger Range"
          min="4"
          max="7"
          step="1"
          editable={false}
          value={selectedUkeleleFingerRange}
          onChange={handleFingerRangeChange}
        />

        <Slider
          id="numberOfUkeleleStringsSlider"
          label="Strings"
          min="6"
          max="8"
          step="1"
          editable={false}
          value={selectedNumberOfUkeleleStrings}
          onChange={handleNumberOfUkeleleStringsChange}
        />

        <Slider
          id="numberOfGuitarFretsSlider"
          label="Frets"
          min="12"
          max="24"
          step="1"
          editable={false}
          value={numberOfUkeleleFrets}
          onChange={handleNumberOfUkeleleFretsChange}
        />
      </div>
      <Fretboard
        playbackIndex={playbackIndex}
        notesToPlay={notesToPlay}
        preferredPosition={selectedPosition}
        fingerRange={selectedUkeleleFingerRange}
        scaleNotes={scaleNotes}
        strings={strings}
        selectedTuning={selectedUkeleleTuning}
        setSelectedTuning={setSelectedUkeleleTuning}
        initialTuning={INITIAL_UKELELE_TUNING}
        numberOfFrets={numberOfUkeleleFrets}
      />
    </div>
  );
};

export default Ukelele;
