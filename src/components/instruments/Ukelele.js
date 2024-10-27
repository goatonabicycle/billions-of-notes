import React, { useCallback } from "react";
import { useStorage } from "../../hooks/useLocalStorage";
import {
	DEFAULT_FINGER_RANGE,
	DEFAULT_NUMBER_OF_GUITAR_FRETS,
	DEFAULT_NUMBER_OF_UKELELE_STRINGS,
	DEFAULT_POSITION,
	INITIAL_UKELELE_TUNING,
} from "../../useful";
import Fretboard from "../Fretboard";
import Slider from "../Slider";

const Ukelele = ({ notesToPlay, playbackIndex, scaleNotes }) => {
	const [selectedPosition, setSelectedPosition] = useStorage(
		"selectedPosition",
		DEFAULT_POSITION,
	);

	const [selectedUkeleleFingerRange, setSelectedUkeleleFingerRange] =
		useStorage("selectedUkeleleFingerRange", DEFAULT_FINGER_RANGE);

	const [selectedNumberOfUkeleleStrings, setSelectedNumberOfUkeleleStrings] =
		useStorage("selectedUkeleleStrings", DEFAULT_NUMBER_OF_UKELELE_STRINGS);

	const [numberOfUkeleleFrets, setNumberOfUkeleleFrets] = useStorage(
		"numberOfUkeleleFrets",
		DEFAULT_NUMBER_OF_GUITAR_FRETS,
	);

	const [selectedUkeleleTuning, setSelectedUkeleleTuning] = useStorage(
		"selectedUkeleleTuning",
		INITIAL_UKELELE_TUNING,
	);

	const handlePositionChange = useCallback(
		(e) => {
			setSelectedPosition(Number.parseInt(e.target.value, 10));
		},
		[setSelectedPosition],
	);

	const handleFingerRangeChange = useCallback(
		(e) => {
			setSelectedUkeleleFingerRange(Number.parseInt(e.target.value, 10));
		},
		[setSelectedUkeleleFingerRange],
	);

	const handleNumberOfUkeleleStringsChange = useCallback(
		(e) => {
			setSelectedNumberOfUkeleleStrings(Number.parseInt(e.target.value, 10));
		},
		[setSelectedNumberOfUkeleleStrings],
	);

	const handleNumberOfUkeleleFretsChange = useCallback(
		(e) => {
			setNumberOfUkeleleFrets(Number.parseInt(e.target.value, 10));
		},
		[setNumberOfUkeleleFrets],
	);

	const strings = selectedUkeleleTuning.slice(
		0,
		selectedNumberOfUkeleleStrings,
	);

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/20">
			<div className="flex items-center gap-20 px-4 py-1">
				<div className="text-purple-300 text-xl min-w-[100px]">Ukelele</div>
				<div className="flex flex-wrap items-center gap-6 text-sm">
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
