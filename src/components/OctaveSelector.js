import React, { memo } from "react";
import { OCTAVES } from "../useful";
import Checkbox from "./Checkbox";

const OctaveSelector = memo(({ octaves, setInputState }) => {
	const handleChange = (event) => {
		const value = Number.parseInt(event.target.value);

		if (event.target.checked) {
			setInputState((prevState) => ({
				...prevState,
				octaves: [...prevState.octaves, value].sort(),
			}));
		} else {
			setInputState((prevState) => ({
				...prevState,
				octaves:
					prevState.octaves.length > 1
						? prevState.octaves.filter((octave) => octave !== value)
						: prevState.octaves,
			}));
		}
	};

	return (
		<div className="flex flex-col items-center gap-3 m-6">
			<div className="text-xs font-medium text-pink-300 uppercase tracking-wide">
				Octaves:
			</div>
			<div className="flex flex-wrap justify-center gap-4">
				{OCTAVES.map((octave) => (
					<Checkbox
						key={octave}
						id={`octave-${octave}`}
						name={`octave-${octave}`}
						value={octave}
						checked={octaves.includes(octave)}
						onChange={handleChange}
						label={octave.toString()}
					/>
				))}
			</div>
		</div>
	);
});

export default OctaveSelector;
