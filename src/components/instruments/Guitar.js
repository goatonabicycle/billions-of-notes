import React, { useCallback } from "react";

import { useStorage } from "../../hooks/useLocalStorage";
import {
	DEFAULT_FINGER_RANGE,
	DEFAULT_NUMBER_OF_GUITAR_FRETS,
	DEFAULT_NUMBER_OF_GUITAR_STRINGS,
	DEFAULT_POSITION,
	INITIAL_GUITAR_TUNING,
} from "../../useful";

import Fretboard from "../Fretboard";
import Slider from "../Slider";

import "./Guitar.css";

const Guitar = ({ notesToPlay, playbackIndex, scaleNotes }) => {
	const [selectedPosition, setSelectedPosition] = useStorage(
		"selectedPosition",
		DEFAULT_POSITION,
	);

	const [selectedFingerRange, setSelectedFingerRange] = useStorage(
		"selectedFingerRange",
		DEFAULT_FINGER_RANGE,
	);

	const [selectedNumberOfGuitarStrings, setSelectedNumberOfGuitarStrings] =
		useStorage("selectedGuitarStrings", DEFAULT_NUMBER_OF_GUITAR_STRINGS);

	const [numberOfGuitarFrets, setNumberOfGuitarFrets] = useStorage(
		"numberOfGuitarFrets",
		DEFAULT_NUMBER_OF_GUITAR_FRETS,
	);

	const [selectedTuning, setSelectedTuning] = useStorage(
		"selectedTuning",
		INITIAL_GUITAR_TUNING,
	);

	const handlePositionChange = useCallback(
		(e) => {
			setSelectedPosition(Number.parseInt(e.target.value, 10));
		},
		[setSelectedPosition],
	);

	const handleFingerRangeChange = useCallback(
		(e) => {
			setSelectedFingerRange(Number.parseInt(e.target.value, 10));
		},
		[setSelectedFingerRange],
	);

	const handleNumberOfGuitarStringsChange = useCallback(
		(e) => {
			setSelectedNumberOfGuitarStrings(Number.parseInt(e.target.value, 10));
		},
		[setSelectedNumberOfGuitarStrings],
	);

	const handleNumberOfGuitarFretsChange = useCallback(
		(e) => {
			setNumberOfGuitarFrets(Number.parseInt(e.target.value, 10));
		},
		[setNumberOfGuitarFrets],
	);

	const strings = selectedTuning.slice(0, selectedNumberOfGuitarStrings);

	return (
		<div className="guitar-container doodle-border">
			{"Guitar"}

			<div className="guitar-inputs">
				<Slider
					id="positionSlider"
					label="Play from"
					min="0"
					max={numberOfGuitarFrets}
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
					value={selectedFingerRange}
					onChange={handleFingerRangeChange}
				/>

				<Slider
					id="numberOfGuitarStringsSlider"
					label="Strings"
					min="6"
					max="8"
					step="1"
					editable={false}
					value={selectedNumberOfGuitarStrings}
					onChange={handleNumberOfGuitarStringsChange}
				/>

				<Slider
					id="numberOfGuitarFretsSlider"
					label="Frets"
					min="12"
					max="24"
					step="1"
					editable={false}
					value={numberOfGuitarFrets}
					onChange={handleNumberOfGuitarFretsChange}
				/>
			</div>
			<Fretboard
				playbackIndex={playbackIndex}
				notesToPlay={notesToPlay}
				preferredPosition={selectedPosition}
				fingerRange={selectedFingerRange}
				scaleNotes={scaleNotes}
				strings={strings}
				selectedTuning={selectedTuning}
				setSelectedTuning={setSelectedTuning}
				initialTuning={INITIAL_GUITAR_TUNING}
				numberOfFrets={numberOfGuitarFrets}
			/>
		</div>
	);
};

export default Guitar;
