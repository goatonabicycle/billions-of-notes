import React, { useMemo } from "react";
import {
	INSTRUMENTS,
	mapToSelectOptions,
	mapToSelectOptionsWithValues,
} from "../useful";
import Select from "./Select";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";
import Checkbox from "./Checkbox";

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
		<div className="flex flex-wrap justify-center items-start gap-4 m-4">
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

			<Checkbox
				id="tieTogether"
				name="tieTogether"
				checked={tieTogether}
				onChange={handleControlChange}
				label="Tie notes"
				className="m-6"
			/>
		</div>
	);
}

export default React.memo(SelectControlsGrid);
