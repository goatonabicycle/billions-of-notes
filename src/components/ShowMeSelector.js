import React from "react";
import Checkbox from "./Checkbox";

const ShowMeSelector = ({ selectedPanelsToShow, setSelectedPanelsToShow }) => {
	const panels = ["Guitar", "Piano Roll", "Piano", "Bass Guitar", "Ukelele"];

	const handleChange = (event) => {
		const value = event.target.value;
		if (event.target.checked) {
			setSelectedPanelsToShow((prevPanels) => [...prevPanels, value]);
		} else {
			setSelectedPanelsToShow(
				(prevPanels) => prevPanels.filter((panel) => panel !== value),
			);
		}
	};

	return (
		<div className="flex flex-col gap-1">
			<span className="text-xs font-medium text-pink-300 uppercase">
				Show me:
			</span>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-4">
				{panels.map((panel) => (
					<Checkbox
						key={panel}
						id={`panel-${panel}`}
						name={`panel-${panel}`}
						value={panel}
						checked={selectedPanelsToShow.includes(panel)}
						onChange={handleChange}
						label={panel}
					/>
				))}
			</div>
		</div>
	);
};

export default ShowMeSelector;