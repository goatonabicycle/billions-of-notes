import React, { useCallback } from "react";
import Button from "./Button";

import {
	NewNotesIcon,
	PauseIcon,
	PlayIcon,
	ResetIcon,
	ReverseIcon,
	SaveIcon,
	ShareIcon,
} from "./Icons";

const ButtonBlock = ({
	setTriggerRegenerate,
	triggerRegenerate,
	isPlaying,
	setIsPlaying,
	resetInputs,
	selectedKey,
	selectedScale,
	selectedNumberOfNotes,
	selectedTempo,
	selectedOctaves,
	randomNotes,
	setShareButtonText,
	shareButtonText,
	SaveToMidi,
	setRandomNotes,
	saveAndShare,
}) => {
	const handleNewNotesClick = useCallback(
		() => setTriggerRegenerate(!triggerRegenerate),
		[triggerRegenerate, setTriggerRegenerate],
	);

	const handlePlayPauseClick = useCallback(
		() => setIsPlaying(!isPlaying),
		[isPlaying, setIsPlaying],
	);

	const handleResetClick = useCallback(() => resetInputs(), [resetInputs]);
	const handleShareClick = useCallback(() => {
		saveAndShare();
	}, [saveAndShare]);

	const handleSaveMIDIClick = useCallback(
		() => SaveToMidi(randomNotes, selectedTempo, selectedKey, selectedScale, selectedNumberOfNotes),
		[randomNotes, selectedTempo, SaveToMidi, selectedKey, selectedScale, selectedNumberOfNotes],
	);

	const handleReverseClick = useCallback(() => {
		const newRandomNotes = randomNotes.reverse();
		setRandomNotes([...newRandomNotes]);
	}, [randomNotes, setRandomNotes]);

	return (
		<div className="flex flex-wrap items-center justify-center gap-4 m-4">
			<Button icon={NewNotesIcon} onClick={handleNewNotesClick} text="New" />
			<Button
				text={isPlaying ? "Pause" : "Play"}
				icon={isPlaying ? PauseIcon : PlayIcon}
				onClick={handlePlayPauseClick}
			/>
			<Button onClick={handleResetClick} icon={ResetIcon} text="Reset" />
			<Button onClick={handleReverseClick} icon={ReverseIcon} text="Reverse" />

			<Button onClick={handleShareClick} text={shareButtonText} icon={ShareIcon} />
			<Button onClick={handleSaveMIDIClick} icon={SaveIcon} text="Save MIDI" />
		</div>
	);
};

export default React.memo(ButtonBlock);