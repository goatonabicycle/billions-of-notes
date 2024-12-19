import React, { memo } from "react";
import ExplainButton from "./ExplainButton";
import LineRenderer from "./LineRenderer";
import Title from "./Title";

const LinkButton = memo(({ href, onClick, children, external }) => {
	if (href) {
		return (
			<a
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noreferrer" : undefined}
				className="text-pink-100 hover:text-pink-400 transition-colors duration-300"
			>
				{children}
			</a>
		);
	}

	return (
		<button
			onClick={onClick}
			type="button"
			className="text-pink-100 hover:text-pink-400 transition-colors duration-300"
		>
			{children}
		</button>
	);
});

const keyframes = `
  @keyframes gridMove {
    0% { transform: translateY(40px); }
    100% { transform: translateY(0px); }
  }

  @keyframes borderGlow {
    0% { border-color: #ff00ff; }
    33% { border-color: #00ffff; }
    66% { border-color: #ffff00; }
    100% { border-color: #ff00ff; }
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
		setAnimationsEnabled
	}) => {
		const gridAnimationDuration = Math.max(0.2, 240 / selectedTempo);

		return (
			<div className="relative w-full max-w-4xl mx-auto">
				<style>{keyframes}</style>

				<div
					className={`relative overflow-hidden ${!animationsEnabled ? "border border-pink-500/20" : ""}`}
					style={{
						borderWidth: "4px",
						borderStyle: "solid",
						animation: animationsEnabled ? "borderGlow 3s linear infinite" : "none",
						boxShadow: animationsEnabled ? "0px 0px 120px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(255, 0, 255, 0.5)" : "none",
						background: "#1a1a1a",
					}}
				>
					<div
						className="absolute inset-0 x-0"
						style={{
							background: `
              linear-gradient(transparent 0%, #2d1f3d 90%),
              linear-gradient(90deg, #ff10f0 1px, transparent 1px),
              linear-gradient(#ff10f0 1px, transparent 1px)
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
							/>
						</div>

						<nav className="grid grid-cols-1 sm:grid-cols-4 text-xs pt-4 gap-4 border-t border-pink-500 place-items-center sm:place-items-center">
							<LinkButton href="/what-scale" external>Scale❔</LinkButton>
							<LinkButton href="https://github.com/goatonabicycle/billions-of-notes" external>Code🧑‍💻</LinkButton>
							<ExplainButton />
							<LinkButton onClick={() => setAnimationsEnabled(!animationsEnabled)}>
								{animationsEnabled ? "Move" : "Move"}
								<span className="text-base">{animationsEnabled ? "✨" : "💤"}</span>
							</LinkButton>
						</nav>
					</div>
				</div>
			</div>
		);
	}
);

export default TitleArea;