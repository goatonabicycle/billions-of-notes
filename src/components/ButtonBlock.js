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
	selectedInstrument,
	selectedOctaves,
	randomNotes,
	setShareButtonText,
	shareButtonText,
	SaveToMidi,
	setRandomNotes,
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
		const url = new URL(window.location.href);
		const inputs = [
			selectedKey,
			selectedScale,
			selectedNumberOfNotes,
			selectedTempo,
			selectedInstrument,
		].join(",");
		url.searchParams.set("inputs", inputs);
		url.searchParams.set("octaves", selectedOctaves.join(","));
		url.searchParams.set("notes", encodeURIComponent(randomNotes.join(",")));

		navigator.clipboard.writeText(url.toString());
		setShareButtonText("Link copied!");

		setTimeout(() => {
			setShareButtonText("Share these notes");
		}, 2000);
	}, [
		selectedKey,
		selectedScale,
		selectedNumberOfNotes,
		selectedTempo,
		selectedInstrument,
		selectedOctaves,
		randomNotes,
		setShareButtonText,
	]);

	const handleSaveClick = useCallback(
		() => SaveToMidi(randomNotes, selectedTempo),
		[randomNotes, selectedTempo, SaveToMidi],
	);

	const handleReverseClick = useCallback(() => {
		const newRandomNotes = randomNotes.reverse();
		setRandomNotes([...newRandomNotes]);
	}, [randomNotes, setRandomNotes]);

	return (
		<div className="flex flex-wrap items-center justify-center gap-4 m-4">
			<Button
				icon={NewNotesIcon}
				onClick={handleNewNotesClick}
				text="New notes"
			/>
			<Button
				text={isPlaying ? "Pause" : "Play"}
				icon={isPlaying ? PauseIcon : PlayIcon}
				onClick={handlePlayPauseClick}
			/>
			<Button onClick={handleResetClick} icon={ResetIcon} text="Reset inputs" />
			<Button
				onClick={handleShareClick}
				text={shareButtonText}
				icon={ShareIcon}
			/>
			<Button onClick={handleSaveClick} icon={SaveIcon} text="Save as MIDI" />

			<Button
				onClick={handleReverseClick}
				icon={ReverseIcon}
				text="Reverse notes"
			/>
		</div>
	);
};

export default React.memo(ButtonBlock);
