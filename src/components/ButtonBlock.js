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
	isGeneratingLink,
	setActiveTab,
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
		() =>
			SaveToMidi(
				randomNotes,
				selectedTempo,
				selectedKey,
				selectedScale,
				selectedNumberOfNotes,
			),
		[
			randomNotes,
			selectedTempo,
			SaveToMidi,
			selectedKey,
			selectedScale,
			selectedNumberOfNotes,
		],
	);

	const handleReverseClick = useCallback(() => {
		const newRandomNotes = randomNotes.reverse();
		setRandomNotes([...newRandomNotes]);
	}, [randomNotes, setRandomNotes]);

	return (
		<div
			className="grid grid-cols-2 items-center justify-center gap-2"
			data-intro="These are the main control buttons. This is where you can generate new notes, play them, reset them, reverse them, and more!"
			data-step="3"
		>
			<Button
				icon={<NewNotesIcon />}
				onClick={handleNewNotesClick}
				text="New"
				tooltip="Generate a new sequence of random notes"
			/>
			<Button
				text={isPlaying ? "Pause" : "Play"}
				icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
				onClick={handlePlayPauseClick}
				tooltip={isPlaying ? "Pause playback" : "Play the current sequence"}
			/>
			<Button
				onClick={handleResetClick}
				icon={<ResetIcon />}
				text="Reset"
				tooltip="Reset all settings to default values"
			/>
			<Button
				onClick={handleReverseClick}
				icon={<ReverseIcon />}
				text="Reverse"
				tooltip="Reverse the current sequence of notes"
			/>
			<Button
				onClick={handleShareClick}
				text={shareButtonText}
				icon={<ShareIcon />}
				disabled={isGeneratingLink}
				tooltip="Copy a shareable link to clipboard"
			/>
			<Button
				onClick={handleSaveMIDIClick}
				icon={<SaveIcon />}
				text="Save MIDI"
				tooltip="Download the current sequence as a MIDI file"
			/>
		</div>
	);
};

export default React.memo(ButtonBlock);
