import { useEffect } from 'react';
import SaveToMidi from '../components/SaveToMidi';

export function useKeyboardShortcuts({ 
	setIsPlaying, 
	setTriggerRegenerate, 
	resetInputs, 
	randomNotes, 
	tempo 
}) {
	useEffect(() => {
		const handleKeyPress = (event) => {
			switch (event.key.toLowerCase()) {
				case "p":
					event.preventDefault();
					setIsPlaying((prevIsPlaying) => !prevIsPlaying);
					break;
				case "n":
					setTriggerRegenerate((prevTrigger) => !prevTrigger);
					break;
				case "r":
					resetInputs();
					break;
				case "s":
					SaveToMidi(randomNotes, tempo);
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [setIsPlaying, setTriggerRegenerate, resetInputs, randomNotes, tempo]);
}

export function getKeyboardShortcuts() {
	return [
		{ key: 'P', description: 'Play/Pause' },
		{ key: 'N', description: 'Generate new notes' },
		{ key: 'R', description: 'Reset all inputs' },
		{ key: 'S', description: 'Save as MIDI' }
	];
}