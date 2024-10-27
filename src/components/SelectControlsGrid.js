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

const SelectControlsGrid = memo(
	({
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
			<div className="w-full max-w-4xl mx-auto">
				<div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-pink-500/20 p-6">
					<div>
						<div className="flex items-start gap-8">
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

							<Checkbox
								id="tieTogether"
								name="tieTogether"
								checked={tieTogether}
								onChange={handleControlChange}
								label="Tie notes"
							/>
						</div>

						<ShowMeSelector
							selectedPanelsToShow={selectedPanelsToShow}
							setSelectedPanelsToShow={setSelectedPanelsToShow}
						/>
					</div>
				</div>
			</div>
		);
	},
);

export default SelectControlsGrid;
