import React from "react";
import SelectInputGrid from "./SelectInputGrid";
import SelectControlsGrid from "./SelectControlsGrid";

const TabButton = ({ label, isActive, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={`px-8 py-2.5 text-sm font-medium transition-colors duration-200 ${isActive
			? "text-primary-400 border-b-2 border-primary-500 -mb-px"
			: "text-primary-300/60 hover:text-primary-300"
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
	activeTab,
	setActiveTab,
	animationsEnabled,
	setAnimationsEnabled,
}) => {
	const tabs = [
		{ id: "settings", label: "Settings" },
		{ id: "visuals", label: "Visuals" },
	];

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20">
			<div className="flex border-b border-primary-500/20">
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
				{activeTab === "settings" && (
					<div className="space-y-6 p-6">
						<div className="border-b border-primary-500/10 pb-6">
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
						/>
					</div>
				)}

				{activeTab === "visuals" && (
					<div className="space-y-6 p-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<label className="text-sm text-primary-300">Animations</label>
								<button
									onClick={() => setAnimationsEnabled(!animationsEnabled)}
									className={`px-4 py-2 text-xs font-medium rounded transition-all duration-200 ${
										animationsEnabled
											? 'bg-primary-500 text-white border-2 border-primary-400'
											: 'bg-background-dark text-primary-400 border-2 border-primary-500/50'
									}`}
								>
									{animationsEnabled ? '✨ Enabled' : '💤 Disabled'}
								</button>
							</div>

							<div className="flex items-center justify-between">
								<label className="text-sm text-primary-300">Theme</label>
								<select
									className="px-4 py-2 text-xs bg-background-dark text-primary-400 border-2 border-primary-500/50 rounded cursor-not-allowed opacity-50"
									disabled
								>
									<option>Retro Blue</option>
									<option>Coming Soon...</option>
								</select>
							</div>
						</div>
					</div>
				)}

			</div>
		</div>
	);
};

export default React.memo(TabbedControls);