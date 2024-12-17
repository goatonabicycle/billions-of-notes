import React, { useState } from "react";
import SelectInputGrid from "./SelectInputGrid";
import SelectControlsGrid from "./SelectControlsGrid";

const TabButton = ({ label, isActive, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={`px-8 py-2.5 text-sm font-medium transition-colors duration-200 ${isActive
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
	const [activeTab, setActiveTab] = useState("settings");

	const tabs = [
		{ id: "settings", label: "Settings" },
		{ id: "keep", label: "Keep" },
	];

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 overflow-hidden">
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

			<div className="overflow-x-auto">
				{activeTab === "settings" && (
					<div className="space-y-6 p-6">
						<div className="border-b border-pink-500/10 pb-6">
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
						</div>
						<SelectControlsGrid
							selectedPanelsToShow={selectedPanelsToShow}
							setSelectedPanelsToShow={setSelectedPanelsToShow}
							controlState={controlState}
							handleControlChange={handleControlChange}
							setInstrumentName={setInstrumentName}
						/>
					</div>
				)}

				{activeTab === "keep" && (
					<div className="p-6">
						Coming soon! A list of notes that have been generated that you liked!
					</div>
				)}
			</div>
		</div>
	);
};

export default TabbedControls;