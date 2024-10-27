import React, { memo } from "react";
import Select from "./Select";

const ScaleSelector = ({
	scaleOptions,
	inputScale,
	handleInputChange,
	notesInScale,
}) => {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between gap-4">
				<div className="flex-grow">
					<Select
						id="scale"
						name="scale"
						options={scaleOptions}
						selectedValue={inputScale}
						onChange={handleInputChange}
						hideLabel={true}
					/>
				</div>
			</div>

			{notesInScale.length > 0 && (
				<div className="flex flex-wrap items-center gap-1 mt-1">
					{notesInScale.map((note, i) => (
						<div
							key={i.toString()}
							className="px-2 py-1 rounded border border-pink-400/30 bg-pink-950/30 
                       text-pink-100 text-xs font-medium tracking-wider 
                       hover:border-pink-400/60 
                       hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] 
                       transition-all duration-300"
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
