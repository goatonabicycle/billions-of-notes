import React, { useMemo } from "react";
import {
	INSTRUMENTS,
	mapToSelectOptions,
	mapToSelectOptionsWithValues,
} from "../useful";
import Select from "./Select";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";

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
}) {
	const instrumentOptions = useMemo(
		() => mapToSelectOptionsWithValues(INSTRUMENTS),
		[],
	);

	const notationOptions = useMemo(
		() => mapToSelectOptions(["flat", "sharp"]),
		[],
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
				min="10"
				max="900"
				step="10"
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

			{/* <Slider
				id="noteLengthSlider"
				name="noteLength"
				label="Note Length"
				min="1"
				max="10"
				step="1"
				editable={false}
				value={noteLength}
				onChange={handleControlChange}
			/> */}

			<Select
				id="instrument"
				name="instrument"
				label="Sounds:"
				options={instrumentOptions}
				onChange={handleControlChange}
				selectedValue={instrument}
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
				<label htmlFor="tieNotes">Tie notes</label>
			</div>
		</div>
	);
}

export default React.memo(SelectControlsGrid);
