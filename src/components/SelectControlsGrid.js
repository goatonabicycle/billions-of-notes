import React, { useMemo, memo } from "react";
import {
	INSTRUMENTS,
	mapToSelectOptions,
	mapToSelectOptionsWithValues,
} from "../useful";
import Select from "./Select";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";
import Checkbox from "./Checkbox";

const SelectControlsGrid = memo(({
	selectedPanelsToShow,
	setSelectedPanelsToShow,
	controlState: { tempo, volume, instrument, notation, tieTogether },
	handleControlChange,
}) => {
	const instrumentOptions = useMemo(
		() => mapToSelectOptionsWithValues(INSTRUMENTS),
		[],
	);

	const notationOptions = useMemo(
		() => mapToSelectOptions(["flat", "sharp"]),
		[],
	);

	return (
		<div className="w-full max-w-4xl space-y-4">
			<div className="flex flex-wrap gap-4">
				<Slider
					id="tempoSlider"
					name="tempo"
					label="Tempo"
					min="10"
					max="600"
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
					label="Sounds"
					options={instrumentOptions}
					onChange={handleControlChange}
					selectedValue={instrument}
					width={"w-60"}
				/>

				<div className="hidden">
					<Select
						id="notation"
						name="notation"
						label="Notation"
						options={notationOptions}
						onChange={handleControlChange}
						selectedValue={notation}
					/>
				</div>

				<div className="flex items-center">
					<Checkbox
						id="tieTogether"
						name="tieTogether"
						checked={tieTogether}
						onChange={handleControlChange}
						label="Tie same notes together"
					/>
				</div>
			</div>

			<div className="pt-5 border-t border-pink-400/10">
				<ShowMeSelector
					selectedPanelsToShow={selectedPanelsToShow}
					setSelectedPanelsToShow={setSelectedPanelsToShow}
				/>
			</div>
		</div>
	);
});

export default SelectControlsGrid;