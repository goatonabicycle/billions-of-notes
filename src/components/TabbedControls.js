import React from "react";
import SelectInputGrid from "./SelectInputGrid";
import SelectControlsGrid from "./SelectControlsGrid";
import { TrashIcon } from "./Icons";  // Make sure this is available

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

const KeptStatesList = ({ keptStates, onLoadKeptState, onRemoveKeptState }) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('default', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	};

	if (keptStates.length === 0) {
		return (
			<div className="text-gray-400 text-center py-8">
				No saved states yet. Click "Keep" to save your favorite note sequences! <br />
				Currently you can keep only 5 sequences!
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{keptStates.map((state) => (
				<div
					key={state.id}
					className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
				>
					<button
						onClick={() => onLoadKeptState(state.id)}
						className="flex-1 text-left text-gray-300 hover:text-pink-400 transition-colors"
					>
						<div className="font-medium">{state.displayName}</div>
						<div className="text-xs text-gray-500">
							{formatDate(state.dateAdded)}
						</div>
					</button>
					<button
						onClick={() => onRemoveKeptState(state.id)}
						className="px-3 py-2 text-pink-500/70 hover:text-pink-500 hover:bg-pink-500/10 rounded transition-colors"
						title="Remove from saved states"
					>
						<TrashIcon className="w-4 h-4" />
					</button>
				</div>
			))}
		</div>
	);
};

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
	keptStates,
	onLoadKeptState,
	onRemoveKeptState,
}) => {
	const tabs = [
		{ id: "settings", label: "Settings" },
		{ id: "keep", label: "Keep" },
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
						/>
					</div>
				)}

				{activeTab === "keep" && (
					<div className="p-6">
						<KeptStatesList
							keptStates={keptStates}
							onLoadKeptState={onLoadKeptState}
							onRemoveKeptState={onRemoveKeptState}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default TabbedControls;