import React, { useCallback } from "react";
import { useStorage } from "../../hooks/useLocalStorage";
import {
	DEFAULT_FINGER_RANGE,
	DEFAULT_NUMBER_OF_BASS_FRETS,
	DEFAULT_NUMBER_OF_BASS_STRINGS,
	DEFAULT_POSITION,
	INITIAL_BASS_TUNING,
} from "../../useful";
import Fretboard from "../Fretboard";
import Slider from "../Slider";

const BassGuitar = ({ notesToPlay, playbackIndex, scaleNotes }) => {
	const [selectedPosition, setSelectedPosition] = useStorage(
		"selectedBassPosition",
		DEFAULT_POSITION,
	);

	const [selectedFingerRange, setSelectedFingerRange] = useStorage(
		"selectedBassFingerRange",
		DEFAULT_FINGER_RANGE,
	);

	const [selectedNumberOfBassStrings, setSelectedNumberOfBassStrings] =
		useStorage("selectedBassStrings", DEFAULT_NUMBER_OF_BASS_STRINGS);

	const [selectedBassTuning, setSelectedBassTuning] = useStorage(
		"selectedBassTuning",
		INITIAL_BASS_TUNING,
	);

	const [numberOfBassFrets, setNumberOfBassFrets] = useStorage(
		"numberOfBassFrets",
		DEFAULT_NUMBER_OF_BASS_FRETS,
	);

	const strings = selectedBassTuning.slice(0, selectedNumberOfBassStrings);

	const handleSelectedPositionChange = useCallback(
		(e) => setSelectedPosition(Number.parseInt(e.target.value, 10)),
		[setSelectedPosition],
	);

	const handleSelectedFingerRangeChange = useCallback(
		(e) => setSelectedFingerRange(Number.parseInt(e.target.value, 10)),
		[setSelectedFingerRange],
	);

	const handleSelectedNumberOfBassStringsChange = useCallback(
		(e) => setSelectedNumberOfBassStrings(Number.parseInt(e.target.value, 10)),
		[setSelectedNumberOfBassStrings],
	);

	const handleNumberOfBassFretsChange = useCallback(
		(e) => setNumberOfBassFrets(Number.parseInt(e.target.value, 10)),
		[setNumberOfBassFrets],
	);

	return (
		<div className="text-center bg-zinc-900">
			<div className="text-purple-300 text-xl p-5">Bass Guitar</div>
			<div className="flex flex-wrap items-center justify-center text-sm gap-10">
				<Slider
					id="positionSlider"
					label="Play from"
					min="0"
					max={numberOfBassFrets}
					step="1"
					editable={false}
					value={selectedPosition}
					onChange={handleSelectedPositionChange}
				/>

				<Slider
					id="fingerRangeSlider"
					label="Finger Range"
					min="4"
					max="7"
					step="1"
					editable={false}
					value={selectedFingerRange}
					onChange={handleSelectedFingerRangeChange}
				/>

				<Slider
					id="numberOfBassStringsSlider"
					label="Strings"
					min="4"
					max="6"
					step="1"
					editable={false}
					value={selectedNumberOfBassStrings}
					onChange={handleSelectedNumberOfBassStringsChange}
				/>

				<Slider
					id="numberOfBassFretsSlider"
					label="Frets"
					min="12"
					max="24"
					step="1"
					editable={false}
					value={numberOfBassFrets}
					onChange={handleNumberOfBassFretsChange}
				/>
			</div>
			<Fretboard
				playbackIndex={playbackIndex}
				notesToPlay={notesToPlay}
				preferredPosition={selectedPosition}
				fingerRange={selectedFingerRange}
				scaleNotes={scaleNotes}
				strings={strings}
				selectedTuning={selectedBassTuning}
				setSelectedTuning={setSelectedBassTuning}
				initialTuning={INITIAL_BASS_TUNING}
				numberOfFrets={numberOfBassFrets}
			/>
		</div>
	);
};

export default BassGuitar;
