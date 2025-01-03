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
	Guitar,
	StarIcon
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
	isKeeping,
	loadedFromKeep,
	stateModified,
}) => {
	const handleNewNotesClick = useCallback(
		() => setTriggerRegenerate(!triggerRegenerate),
		[triggerRegenerate, setTriggerRegenerate]
	);

	const handlePlayPauseClick = useCallback(
		() => setIsPlaying(!isPlaying),
		[isPlaying, setIsPlaying]
	);

	const handleResetClick = useCallback(
		() => resetInputs(),
		[resetInputs]
	);

	const handleShareClick = useCallback(
		() => saveAndShare(false),
		[saveAndShare]
	);

	const handleKeepClick = useCallback(async () => {
		try {
			await saveAndShare(true);
		} catch (error) {
			console.error('Error keeping state:', error);
		}
	}, [saveAndShare]);

	const handleSaveMIDIClick = useCallback(
		() => SaveToMidi(
			randomNotes,
			selectedTempo,
			selectedKey,
			selectedScale,
			selectedNumberOfNotes
		),
		[randomNotes, selectedTempo, SaveToMidi, selectedKey, selectedScale, selectedNumberOfNotes]
	);

	const handleReverseClick = useCallback(
		() => {
			const newRandomNotes = randomNotes.reverse();
			setRandomNotes([...newRandomNotes]);
		},
		[randomNotes, setRandomNotes]
	);

	const getFretboardUrl = useCallback(
		() => {
			const params = new URLSearchParams();
			params.set('key', selectedKey);
			params.set('scale', selectedScale);
			return `/fret?${params.toString()}`;
		},
		[selectedKey, selectedScale]
	);

	return (
		<div
			className="grid grid-cols-2 items-center justify-center gap-2"
			data-intro="These are the main control buttons. This is where you can generate new notes, play them, reset them, reverse them, and more!"
			data-step="3"
		>
			<Button
				icon={NewNotesIcon}
				onClick={handleNewNotesClick}
				text="New"
				tooltip="Generate a new sequence of random notes"
			/>
			<Button
				text={isPlaying ? "Pause" : "Play"}
				icon={isPlaying ? PauseIcon : PlayIcon}
				onClick={handlePlayPauseClick}
				tooltip={isPlaying ? "Pause playback" : "Play the current sequence"}
			/>
			<Button
				onClick={handleResetClick}
				icon={ResetIcon}
				text="Reset"
				tooltip="Reset all settings to default values"
			/>
			<Button
				onClick={handleReverseClick}
				icon={ReverseIcon}
				text="Reverse"
				tooltip="Reverse the current sequence of notes"
			/>
			<Button
				onClick={handleShareClick}
				text={isGeneratingLink ? "Generating..." : shareButtonText}
				icon={ShareIcon}
				disabled={isGeneratingLink}
				tooltip="Share your current configuration with others"
			/>
			<Button
				onClick={handleSaveMIDIClick}
				icon={SaveIcon}
				text="Save MIDI"
				tooltip="Download the current sequence as a MIDI file"
			/>
			<Button
				icon={Guitar}
				text="Fretboard"
				onClick={() => window.open(getFretboardUrl(), '_blank')}
				tooltip="View these notes on a guitar fretboard"
			/>
			<Button
				icon={StarIcon}
				text={isKeeping ? "Saving..." : "Keep"}
				onClick={handleKeepClick}
				disabled={isKeeping || isGeneratingLink || (loadedFromKeep && !stateModified)}
				tooltip={
					loadedFromKeep && !stateModified
						? "Make changes to save a new version"
						: "Save this sequence to your favorites"
				}
			/>
		</div>
	);
};

export default React.memo(ButtonBlock);