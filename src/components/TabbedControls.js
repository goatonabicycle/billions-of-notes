import React, { useState } from "react";
import SelectInputGrid from "./SelectInputGrid";
import SelectControlsGrid from "./SelectControlsGrid";

const TabButton = ({ label, isActive, onClick }) => (
	<button
		onClick={onClick}
		className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
			isActive
				? "text-pink-400 border-b-2 border-pink-500 -mb-px"
				: "text-pink-300/60 hover:text-pink-300"
		}`}
	>
		{label}
	</button>
);

const TabbedControls = ({
	KEYS,
	scales,
	notesInScale,
	inputState,
	setInputState,
	handleInputChange,
	selectedPanelsToShow,
	setSelectedPanelsToShow,
	controlState,
	handleControlChange,
	setInstrumentName,
}) => {
	const [activeTab, setActiveTab] = useState("input");

	const tabs = [
		{ id: "input", label: "Input" },
		{ id: "output", label: "Output" },
		{ id: "history", label: "History" },
	];

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/20">
			<div className="flex border-b border-pink-500/20">
				{tabs.map((tab) => (
					<TabButton
						key={tab.id}
						label={tab.label}
						isActive={activeTab === tab.id}
						onClick={() => setActiveTab(tab.id)}
					/>
				))}
			</div>

			<div>
				{activeTab === "input" && (
					<SelectInputGrid
						KEYS={KEYS}
						scales={scales}
						notesInScale={notesInScale}
						inputKey={inputState.key}
						inputScale={inputState.scale}
						inputNumberOfNotes={inputState.numberOfNotes}
						inputEmptyNotes={inputState.emptyNotes}
						inputOctaves={inputState.octaves}
						setInputState={setInputState}
						handleInputChange={handleInputChange}
					/>
				)}

				{activeTab === "output" && (
					<SelectControlsGrid
						selectedPanelsToShow={selectedPanelsToShow}
						setSelectedPanelsToShow={setSelectedPanelsToShow}
						controlState={controlState}
						handleControlChange={handleControlChange}
						setInstrumentName={setInstrumentName}
					/>
				)}

				{activeTab === "history" && (
					<div className="p-4">
						Coming soon! A list of notes that have been generated!
					</div>
				)}
			</div>
		</div>
	);
};

export default TabbedControls;
