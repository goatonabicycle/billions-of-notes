import React from "react";

const ShowMeSelector = ({ selectedPanelsToShow, setSelectedPanelsToShow }) => {
	const panels = ["Guitar", "Piano Roll", "Piano", "Bass Guitar", "Ukelele"];

	const handleChange = (event) => {
		const value = event.target.value;
		if (event.target.checked) {
			setSelectedPanelsToShow((prevPanels) => [...prevPanels, value]);
		} else {
			setSelectedPanelsToShow((prevPanels) =>
				prevPanels.filter((panel) => panel !== value),
			);
		}
	};

	return (
		<div className="flex flex-col items-center gap-3 m-6">
			<div className="text-xs font-medium text-pink-300 uppercase tracking-wide">
				Show me:
			</div>
			<div className="flex flex-wrap justify-center gap-4">
				{panels.map((panel) => (
					<label
						key={panel}
						className="flex items-center gap-2 cursor-pointer group"
					>
						<div className="relative">
							<input
								type="checkbox"
								value={panel}
								checked={selectedPanelsToShow.includes(panel)}
								onChange={handleChange}
								className="appearance-none w-4 h-4 border-2 border-pink-400/50 
                         bg-pink-950/30 rounded
                         checked:bg-gradient-to-r checked:from-pink-600 checked:to-purple-600
                         focus:outline-none focus:border-pink-400
                         shadow-[0_0_10px_rgba(236,72,153,0.2)]
                         hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                         focus:shadow-[0_0_20px_rgba(236,72,153,0.4)]
                         transition-all duration-300 backdrop-blur-sm"
							/>
							{/* Custom checkmark */}
							<div
								className={`absolute inset-0 flex items-center justify-center
                            pointer-events-none transition-opacity duration-200
                            ${selectedPanelsToShow.includes(panel) ? "opacity-100" : "opacity-0"}`}
							>
								<svg
									role="graphics-symbol img"
									className="w-3 h-3 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>
						<span className="text-sm text-pink-100 group-hover:text-pink-300 transition-colors duration-200">
							{panel}
						</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default ShowMeSelector;
