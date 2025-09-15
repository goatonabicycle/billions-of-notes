import React, { memo, useEffect } from "react";
import Select from "./Select";
import Tooltip from "./Tooltip";
import useScaleNotesStore from "../stores/scaleNotesStore";

const ScaleSelector = ({
	scaleOptions,
	inputScale,
	handleInputChange,
	notesInScale,
	tooltip,
	onNotesChanged
}) => {
	const { getActiveIndexes, toggleNoteIndex, initializeScale } = useScaleNotesStore();

	useEffect(() => {
		if (inputScale && notesInScale.length > 0) {
			initializeScale(inputScale, notesInScale.length);
		}
	}, [inputScale, notesInScale.length, initializeScale]);

	const activeIndexes = getActiveIndexes(inputScale, notesInScale.length);

	const handleNoteClick = (noteIndex) => {
		toggleNoteIndex(inputScale, noteIndex);
		if (onNotesChanged) {
			onNotesChanged();
		}
	};

	return (
		<Tooltip text={tooltip}>
			<div className="flex flex-col gap-1">
				<Select
					id="scale"
					name="scale"
					options={scaleOptions}
					selectedValue={inputScale}
					onChange={handleInputChange}
					label="Scale"
					width="w-56"
				/>

				{notesInScale.length > 0 && (
					<div className="flex flex-wrap items-center gap-1">
						{notesInScale.map((note, i) => {
							const isActive = activeIndexes.includes(i);
							return (
								<button
									key={i.toString()}
									onClick={() => handleNoteClick(i)}
									className={`px-1.5 py-0.5 text-[10px] rounded border transition-all duration-200 cursor-pointer hover:scale-105 ${isActive
										? 'border-primary-400/50 bg-primary-500/40 text-primary-100'
										: 'border-primary-400/20 bg-primary-950/20 text-primary-300/60'
										}`}
									title={`Click to ${isActive ? 'exclude' : 'include'} ${note} from note generation`}
								>
									{note || ""}
								</button>
							);
						})}
					</div>
				)}
			</div>
		</Tooltip>
	);
};

export default memo(ScaleSelector);