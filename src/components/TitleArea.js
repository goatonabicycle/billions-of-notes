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
		count,
	}) => {
		return (
			<div className="flex flex-col items-center w-full gap-6">
				<h1 className="text-center">
					<Title selectedTempo={selectedTempo} />
				</h1>

				<div className="flex flex-col items-center w-full gap-6">
					<div className="w-full flex justify-center">
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

					<div className="tiny-links flex items-center gap-3 text-sm">
						<a
							href="https://github.com/goatonabicycle/billions-of-notes"
							target="_blank"
							className="source-code hover:text-pink-400 transition-colors"
							rel="noreferrer"
						>
							Source code
						</a>
						<span className="text-gray-400">|</span>
						<ExplainButton />
						<span className="text-gray-400">|</span>
						<KofiButton />
						<span className="text-gray-400">|</span>
						<a
							href="/what-scale"
							target="_blank"
							className="source-code hover:text-pink-400 transition-colors"
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
