import React, { memo } from "react";
import { OCTAVES } from "../useful";
import Checkbox from "./Checkbox";
import Tooltip from "./Tooltip";

const OctaveSelector = memo(({ octaves, setInputState, isFretComponent, tooltip }) => {
	const handleChange = (event) => {
		const value = Number.parseInt(event.target.value);
		if (isFretComponent) {
			const newOctaves = event.target.checked
				? [...octaves, value].sort()
				: octaves.length > 1
					? octaves.filter(octave => octave !== value)
					: octaves;

			setInputState(newOctaves);
		} else {
			if (event.target.checked) {
				setInputState((prevState) => ({
					...prevState,
					octaves: [...prevState.octaves, value].sort(),
				}));
			} else {
				setInputState((prevState) => ({
					...prevState,
					octaves: prevState.octaves.length > 1
						? prevState.octaves.filter((octave) => octave !== value)
						: prevState.octaves,
				}));
			}
		}
	};

	return (
		<Tooltip text={tooltip}>
			<div>
				<div className="flex flex-col gap-1">
					<span className="text-xs font-medium text-primary-300 uppercase">
						Octaves
					</span>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-4">
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
			</div>
		</Tooltip>
	);
});

export default OctaveSelector;