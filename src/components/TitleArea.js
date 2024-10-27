import React, { memo } from "react";
import ExplainButton from "./ExplainButton";
import KofiButton from "./KofiButton";
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
			className="text-pink-100 hover:text-pink-400 transition-colors duration-300"
		>
			{children}
		</button>
	);
});
const TitleArea = memo(
	({
		selectedTempo,
		setTriggerRegenerate,
		triggerRegenerate,
		currentColour,
		randomNotes,
		currentIndex,
	}) => {
		return (
			<div className="relative w-full max-w-4xl mx-auto">
				<div className="flex flex-col items-center">
					<div className="w-full text-center">
						<Title selectedTempo={selectedTempo} />
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

					<nav className="flex items-center justify-center gap-1 text-xs">
						<LinkButton
							href="https://github.com/goatonabicycle/billions-of-notes"
							external
						>
							Source code
						</LinkButton>

						<span className="text-pink-300/30">|</span>

						<ExplainButton />

						<span className="text-pink-300/30">|</span>

						<KofiButton />

						<span className="text-pink-300/30">|</span>

						<LinkButton href="/what-scale">What's the scale?</LinkButton>
					</nav>
				</div>
			</div>
		);
	},
);

export default TitleArea;
