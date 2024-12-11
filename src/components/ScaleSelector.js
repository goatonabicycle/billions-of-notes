import React, { memo } from "react";
import Select from "./Select";

const ScaleSelector = ({
	scaleOptions,
	inputScale,
	handleInputChange,
	notesInScale,
}) => {
	return (
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
					{notesInScale.map((note, i) => (
						<div
							key={i.toString()}
							className="px-1.5 py-0.5 text-[10px] rounded border border-pink-400/30 bg-pink-950/30 text-pink-100"
						>
							{note || ""}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default memo(ScaleSelector);