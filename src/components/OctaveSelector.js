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
		<div className="flex items-center gap-3">
			<div className="flex flex-wrap gap-4">
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
