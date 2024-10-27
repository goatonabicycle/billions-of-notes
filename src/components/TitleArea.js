import React, { memo } from "react";
import ExplainButton from "./ExplainButton";
import KofiButton from "./KofiButton";
import LineRenderer from "./LineRenderer";
import Title from "./Title";

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

					<div className="flex items-center justify-center gap-4 text-sm">
						<a
							href="https://github.com/goatonabicycle/billions-of-notes"
							target="_blank"
							className="text-pink-300 hover:text-pink-400 transition-colors"
							rel="noreferrer"
						>
							Source code
						</a>
						<span className="text-pink-300/30">|</span>
						<ExplainButton />
						<span className="text-pink-300/30">|</span>
						<KofiButton />
						<span className="text-pink-300/30">|</span>
						<a
							href="/what-scale"
							target="_blank"
							className="text-pink-300 hover:text-pink-400 transition-colors"
							rel="noreferrer"
						>
							What's the scale?
						</a>
					</div>
				</div>
			</div>
		);
	},
);

export default TitleArea;
