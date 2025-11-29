import introJs from "intro.js";
import React from "react";
import useTooltipStore from "../stores/tooltipStore";
import SelectControlsGrid from "./SelectControlsGrid";
import SelectInputGrid from "./SelectInputGrid";
import Tooltip from "./Tooltip";

const TabButton = ({ label, isActive, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={`px-8 py-2.5 text-sm font-medium transition-colors duration-200 ${
			isActive
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
	debugEnabled,
	setDebugEnabled,
	setTriggerRegenerate,
	triggerRegenerate,
}) => {
	const { tooltipsEnabled, setTooltipsEnabled } = useTooltipStore();

	const handleNotesChanged = () => {
		setTriggerRegenerate(!triggerRegenerate);
	};
	const tabs = [
		{ id: "settings", label: "Notes" },
		{ id: "options", label: "Options" },
	];

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20">
			<div
				className="flex border-b border-primary-500/20"
				data-intro="These tabs organize all the controls - Settings for note generation, Visuals for UI preferences, and Help for assistance"
				data-step="2"
			>
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
				<div className={activeTab === "settings" ? "block" : "hidden"}>
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
								onNotesChanged={handleNotesChanged}
							/>
						</div>
						<SelectControlsGrid
							selectedPanelsToShow={selectedPanelsToShow}
							setSelectedPanelsToShow={setSelectedPanelsToShow}
							controlState={controlState}
							handleControlChange={handleControlChange}
						/>
					</div>
				</div>

				<div className={activeTab === "options" ? "block" : "hidden"}>
					<div
						className="p-4"
						data-intro="Control the visual experience and get help"
						data-step="9"
					>
						<div className="grid grid-cols-3 gap-3 mb-4">
							<div className="flex items-center justify-between p-3 bg-background-dark border border-primary-500/30 rounded">
								<Tooltip text="Show or hide helpful text that appears when hovering over controls">
									<label
										htmlFor="tooltips-toggle"
										className="text-sm text-primary-300"
									>
										Tooltips
									</label>
								</Tooltip>
								<button
									id="tooltips-toggle"
									type="button"
									onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
									className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
										tooltipsEnabled
											? "bg-primary-500 text-white border border-primary-400"
											: "bg-background-dark text-primary-400 border border-primary-500/50"
									}`}
								>
									{tooltipsEnabled ? "On" : "Off"}
								</button>
							</div>
							<button
								type="button"
								onClick={() => {
									const intro = introJs();

									intro.onbeforechange((targetElement) => {
										const step = targetElement?.getAttribute("data-step");

										if (step === "5" || step === "6" || step === "7") {
											setActiveTab("settings");
										} else if (step === "9") {
											setActiveTab("options");
											setTimeout(() => intro.refresh(), 200);
										}
									});

									intro.onafterchange(() => {
										setTimeout(() => intro.refresh(), 150);
									});

									setActiveTab("settings");
									setTimeout(() => intro.start(), 300);
								}}
								className="group flex items-center justify-center gap-2 p-3 bg-background-dark border border-primary-500/30 rounded text-center transition-all duration-200 hover:bg-primary-900 hover:border-primary-400"
							>
								<span className="text-sm font-medium text-primary-400 group-hover:text-primary-300 transition-colors">
									Tutorial
								</span>
							</button>

							<button
								type="button"
								onClick={() => setDebugEnabled(!debugEnabled)}
								className={`group flex items-center justify-center gap-2 p-3 rounded text-center transition-all duration-200 border ${
									debugEnabled
										? "bg-primary-500 border-primary-400 text-white"
										: "bg-background-dark border-primary-500/30 hover:bg-primary-900 hover:border-primary-400"
								}`}
							>
								<span
									className={`text-sm font-medium transition-colors ${
										debugEnabled
											? "text-white"
											: "text-primary-400 group-hover:text-primary-300"
									}`}
								>
									Debug {debugEnabled ? "On" : "Off"}
								</span>
							</button>
						</div>

						<div className="p-2 bg-background-dark border border-primary-500/30 rounded">
							<span className="font-medium text-primary-400 text-xs mr-2">
								Shortcuts:
							</span>
							<span className="text-primary-300/80 text-xs">
								p=Pause r=Reset n=New s=Save
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(TabbedControls);
