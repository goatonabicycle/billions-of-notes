import React from "react";
import Button from "./Button";

const DebugSection = ({ title, data }) => (
	<div className="mb-4">
		<h3 className="text-primary-300 text-xs uppercase mb-2">{title}</h3>
		<pre className="bg-primary-950/30 p-2 rounded-lg border border-primary-400/30 overflow-x-auto">
			<code className="text-primary-100 text-xs">
				{JSON.stringify(data, null, 2)}
			</code>
		</pre>
	</div>
);

const Debug = ({
	isPlaying,
	loadedFromUrl,
	inputState,
	controlState,
	stateModified,
	randomNotes,
	selectedPanelsToShow,
	currentIndex,
}) => {
	const handleClearStorage = () => {
		localStorage.clear();
		window.location.reload();
	};

	const handleCopyDebug = () => {
		const debugState = {
			inputState,
			controlState,
			stateModified,
			randomNotes,
			selectedPanelsToShow,
		};
		navigator.clipboard.writeText(JSON.stringify(debugState, null, 2));
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-primary-400/30 p-4 max-h-[50vh] overflow-y-auto">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-primary-300 text-sm font-medium uppercase">
						Debug Info
					</h2>
					<div className="flex gap-2">
						<Button
							onClick={handleCopyDebug}
							text="Copy Debug State"
							tooltip="Copy all debug information to clipboard"
						/>
						<Button
							onClick={handleClearStorage}
							text="Clear Storage"
							tooltip="Clear local storage and refresh the page"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<DebugSection
						title="Playback State"
						data={{ isPlaying, loadedFromUrl, stateModified, currentIndex }}
					/>

					<DebugSection title="Input State" data={inputState} />

					<DebugSection title="Control State" data={controlState} />

					<DebugSection title="Random Notes" data={randomNotes} />

					<DebugSection title="Panels" data={selectedPanelsToShow} />
				</div>
			</div>
		</div>
	);
};

export default Debug;
