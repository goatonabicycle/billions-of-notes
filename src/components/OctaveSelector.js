import React, { memo } from "react";
import "./OctaveSelector.css";
import { OCTAVES } from "../useful";

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
		<div className="octave-selector">
			<div>Octaves:</div>
			<div>
				{OCTAVES.map((octave) => (
					<span className="octave-selector-item" key={octave}>
						<input
							type="checkbox"
							value={octave}
							checked={octaves.includes(octave)}
							onChange={handleChange}
						/>
						{octave}
					</span>
				))}
			</div>
		</div>
	);
});

export default OctaveSelector;
