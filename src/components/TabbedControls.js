import React from "react";
import SelectInputGrid from "./SelectInputGrid";
import SelectControlsGrid from "./SelectControlsGrid";
import introJs from "intro.js";
import useTooltipStore from "../stores/tooltipStore";
import Tooltip from "./Tooltip";

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
	debugEnabled,
	setDebugEnabled,
}) => {
	const { tooltipsEnabled, setTooltipsEnabled } = useTooltipStore();
	const tabs = [
		{ id: "settings", label: "Settings" },
		{ id: "tools", label: "Tools" },
		{ id: "visuals", label: "Visuals" },
		{ id: "help", label: "Help" },
	];

	return (
		<div className="bg-gray-900/80 backdrop-blur-sm border border-primary-500/20">
			<div className="flex border-b border-primary-500/20" data-intro="These tabs organize all the controls - Settings for note generation, Tools for other apps, Visuals for UI preferences, and Help for assistance" data-step="2">
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

				<div className={activeTab === "tools" ? "block" : "hidden"}>
					<div className="space-y-6 p-6" data-intro="Here you can access other tools and things that you might find useful" data-step="8">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<a
								href="/fret"
								className="group flex flex-col items-center justify-center p-6 bg-background-dark border-2 border-primary-500 text-center transition-all duration-200 hover:bg-primary-900 hover:border-yellow-500"
							>
								<div className="text-2xl mb-2 group-hover:text-yellow-500 transition-colors">🎸</div>
								<div className="text-sm font-bold text-primary-400 group-hover:text-yellow-500 transition-colors uppercase tracking-wider">Fretboard</div>
								<div className="text-xs text-primary-300/70 mt-1">Visualize scales on guitar</div>
							</a>

							<a
								href="/what-scale"
								className="group flex flex-col items-center justify-center p-6 bg-background-dark border-2 border-primary-500 text-center transition-all duration-200 hover:bg-primary-900 hover:border-yellow-500"
							>
								<div className="text-2xl mb-2 group-hover:text-yellow-500 transition-colors">❔</div>
								<div className="text-sm font-bold text-primary-400 group-hover:text-yellow-500 transition-colors uppercase tracking-wider">Scale Finder</div>
								<div className="text-xs text-primary-300/70 mt-1">Identify musical scales</div>
							</a>
						</div>
					</div>
				</div>

				<div className={activeTab === "visuals" ? "block" : "hidden"}>
					<div className="space-y-6 p-6" data-intro="Control the visual experience - animations, themes, and UI preferences" data-step="9">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Tooltip text="Control animated visual effects like moving backgrounds and transitions">
									<label className="text-sm text-primary-300">Animations</label>
								</Tooltip>
								<button
									onClick={() => setAnimationsEnabled(!animationsEnabled)}
									className={`px-4 py-2 text-xs font-medium rounded transition-all duration-200 ${animationsEnabled
										? 'bg-primary-500 text-white border-2 border-primary-400'
										: 'bg-background-dark text-primary-400 border-2 border-primary-500/50'
										}`}
								>
									{animationsEnabled ? '✨ Enabled' : '💤 Disabled'}
								</button>
							</div>

							<div className="flex items-center justify-between">
								<Tooltip text="Show or hide helpful text that appears when hovering over controls">
									<label className="text-sm text-primary-300">Tooltips</label>
								</Tooltip>
								<button
									onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
									className={`px-4 py-2 text-xs font-medium rounded transition-all duration-200 ${tooltipsEnabled
										? 'bg-primary-500 text-white border-2 border-primary-400'
										: 'bg-background-dark text-primary-400 border-2 border-primary-500/50'
										}`}
								>
									{tooltipsEnabled ? '💬 Enabled' : '🔇 Disabled'}
								</button>
							</div>

							<div className="flex items-center justify-between">
								<Tooltip text="Choose different color schemes and visual styles (more themes coming soon)">
									<label className="text-sm text-primary-300">Theme</label>
								</Tooltip>
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
				</div>

				<div className={activeTab === "help" ? "block" : "hidden"}>
					<div className="space-y-4 p-4" data-intro="Get help, access developer tools, and view the source code" data-step="10">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
							<button
								onClick={() => {
									const intro = introJs();

									intro.onbeforechange(function (targetElement) {
										const step = targetElement?.getAttribute('data-step');

										if (step === '5' || step === '6' || step === '7') {
											setActiveTab('settings');
										} else if (step === '8') {
											setActiveTab('tools');
											setTimeout(() => intro.refresh(), 200);
										} else if (step === '9') {
											setActiveTab('visuals');
											setTimeout(() => intro.refresh(), 200);
										} else if (step === '10') {
											setActiveTab('help');
											setTimeout(() => intro.refresh(), 200);
										}
									});

									intro.onafterchange(function () {
										setTimeout(() => intro.refresh(), 150);
									});

									setActiveTab('settings');
									setTimeout(() => intro.start(), 300);
								}}
								className="group flex flex-col items-center justify-center p-3 bg-background-dark border-2 border-primary-500 text-center transition-all duration-200 hover:bg-primary-900 hover:border-yellow-500"
							>
								<div className="text-xl mb-1 group-hover:text-yellow-500 transition-colors">📖</div>
								<div className="text-xs font-bold text-primary-400 group-hover:text-yellow-500 transition-colors uppercase tracking-wider">Tutorial</div>
							</button>

							<button
								onClick={() => setDebugEnabled(!debugEnabled)}
								className={`group flex flex-col items-center justify-center p-3 text-center transition-all duration-200 border-2 ${debugEnabled
									? 'bg-primary-500 border-primary-400 text-white'
									: 'bg-background-dark border-primary-500 hover:bg-primary-900 hover:border-yellow-500'
									}`}
							>
								<div className={`text-xl mb-1 transition-colors ${debugEnabled ? 'text-white' : 'text-primary-400 group-hover:text-yellow-500'
									}`}>
									{debugEnabled ? '🐛' : '💤'}
								</div>
								<div className={`text-xs font-bold transition-colors uppercase tracking-wider ${debugEnabled ? 'text-white' : 'text-primary-400 group-hover:text-yellow-500'
									}`}>
									Debug {debugEnabled ? 'On' : 'Off'}
								</div>
							</button>

							<a
								href="https://github.com/goatonabicycle/billions-of-notes"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col items-center justify-center p-3 bg-background-dark border-2 border-primary-500 text-center transition-all duration-200 hover:bg-primary-900 hover:border-yellow-500"
							>
								<div className="text-xl mb-1 group-hover:text-yellow-500 transition-colors">🧑‍💻</div>
								<div className="text-xs font-bold text-primary-400 group-hover:text-yellow-500 transition-colors uppercase tracking-wider">Source Code</div>
							</a>

							<a
								href="https://github.com/goatonabicycle/billions-of-notes/issues/new"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col items-center justify-center p-3 bg-background-dark border-2 border-primary-500 text-center transition-all duration-200 hover:bg-primary-900 hover:border-yellow-500"
							>
								<div className="text-xl mb-1 group-hover:text-yellow-500 transition-colors">💡</div>
								<div className="text-xs font-bold text-primary-400 group-hover:text-yellow-500 transition-colors uppercase tracking-wider">Share Ideas</div>
							</a>
						</div>

						<div className="border-t border-primary-500/30 pt-3">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
								<div className="p-2 bg-background-dark border border-primary-500/30 rounded">
									<div className="font-bold text-primary-400 mb-1">About</div>
									<div className="text-primary-300/80">Random music note generator - no AI wrapping, no crypto, just randomness</div>
								</div>

								<div className="p-2 bg-background-dark border border-primary-500/30 rounded">
									<div className="font-bold text-primary-400 mb-1">Shortcuts</div>
									<div className="text-primary-300/80">p=Pause r=Reset n=New s=Save</div>
								</div>
							</div>

							<div className="flex justify-center mt-3">
								<a href='https://ko-fi.com/B0B1LV8D9' target='_blank'>
									<img height='24' style={{ border: "0px", height: "24px" }} src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' />
								</a>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default React.memo(TabbedControls);