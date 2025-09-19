import React, { useMemo, memo } from "react";
import {
	INSTRUMENTS,
	mapToSelectOptions,
	mapToSelectOptionsWithValues,
} from "../useful";
import Checkbox from "./Checkbox";
import Select from "./Select";
import ShowMeSelector from "./ShowMeSelector";
import Slider from "./Slider";

const SelectControlsGrid = memo(
	({
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
			<div
				className="w-full max-w-4xl space-y-4"
				data-intro="The controls here do not change the notes. Instead, they change how you experience them"
				data-step="6"
			>
				<div className="flex flex-wrap gap-4">
					<Slider
						id="tempoSlider"
						name="tempo"
						label="Tempo"
						min="10"
						max="1000"
						step="10"
						editable={true}
						value={tempo}
						onChange={handleControlChange}
						tooltip="The speed of playback"
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
						tooltip="How loud!"
					/>

					<Select
						id="instrument"
						name="instrument"
						label="Sounds"
						options={instrumentOptions}
						onChange={handleControlChange}
						selectedValue={instrument}
						width={"w-60"}
						tooltip="What types of sounds to play"
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
							tooltip="Treat sequential notes as a single note that rings over the length of the notes"
						/>
					</div>
				</div>

				<div
					className="pt-5 border-t border-primary-400/10"
					data-intro="Here you can control how you want to see the notes. Each instrument will show how to play the notes"
					data-step="7"
				>
					<ShowMeSelector
						selectedPanelsToShow={selectedPanelsToShow}
						setSelectedPanelsToShow={setSelectedPanelsToShow}
						tooltip={"How you want to see the generated sequence"}
					/>
				</div>
			</div>
		);
	},
);

export default SelectControlsGrid;
