import React, { memo } from "react";

import LineRenderer from "./LineRenderer";
import Title from "./Title";

const keyframes = `
  @keyframes gridMove {
    0% { transform: translateY(40px); }
    100% { transform: translateY(0px); }
  }

  @keyframes borderGlow {
    0% { border-color: #3b82f6; }
    33% { border-color: #60a5fa; }
    66% { border-color: #93c5fd; }
    100% { border-color: #3b82f6; }
  }
`;

const TitleArea = memo(
	({
		selectedTempo,
		setTriggerRegenerate,
		triggerRegenerate,
		currentColour,
		randomNotes,
		currentIndex,
		animationsEnabled,
		setAnimationsEnabled,
		debugEnabled,
		setDebugEnabled,
	}) => {
		const gridAnimationDuration = Math.max(0.2, 240 / selectedTempo);

		return (
			<div className="relative w-full max-w-4xl mx-auto">
				<style>{keyframes}</style>

				<div
					className={`relative overflow-hidden bg-background-light ${!animationsEnabled ? "border border-primary-500/20" : "border-4"} ${animationsEnabled ? "shadow-glow-title" : ""}`}
					style={{
						borderStyle: "solid",
						animation: animationsEnabled ? "borderGlow 3s linear infinite" : "none",
					}}
				>
					<div
						className="absolute inset-0 x-0"
						style={{
							background: `
              linear-gradient(transparent 0%, rgba(29, 78, 216, 0.3) 90%),
              linear-gradient(90deg, rgba(59, 130, 246, 0.8) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.8) 1px, transparent 1px)
            `,
							backgroundSize: "40px 40px",
							animation: animationsEnabled ? `gridMove ${gridAnimationDuration}s linear infinite` : "none",
							opacity: 0.3,
						}}
					/>

					<div className="relative z-10 flex flex-col items-center p-4">
						<div className="w-full text-center">
							<Title selectedTempo={selectedTempo} animationsEnabled={animationsEnabled} />
						</div>

						<div className="w-full min-h-[200px] flex justify-center items-center">
							<LineRenderer
								onClick={() => {
									setTriggerRegenerate(!triggerRegenerate);
								}}
								colour={currentColour}
								notes={randomNotes}
								tempo={selectedTempo}
								activeNote={currentIndex}
								animationsEnabled={animationsEnabled}
							/>
						</div>

					</div>
				</div>
			</div>
		);
	}
);

export default TitleArea;