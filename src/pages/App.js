import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Note, Scale } from "tonal";

import { supabase } from '../supabaseClient';

import { useStorage } from "../hooks/useLocalStorage";
import {
	DEFAULT_EMPTY_NOTES,
	DEFAULT_KEY,
	DEFAULT_NOTES_MODE,
	DEFAULT_NOTE_LENGTH,
	DEFAULT_NUMBER_OF_NOTES,
	DEFAULT_OCTAVES,
	DEFAULT_PANELS_TO_SHOW,
	DEFAULT_SCALE,
	DEFAULT_TEMPO,
	DEFAULT_VOLUME,
	FLAT_TO_SHARP,
	INSTRUMENTS,
	KEYS,
	getRandomItem,
	randomRGBA,
	shuffleArray,
	DEFAULT_ANIMATIONS_ENABLED
} from "../useful";

import ButtonBlock from "../components/ButtonBlock";
import Loop from "../components/Loop";
import MessageBoxes from "../components/MessageBoxes";
import NotesUsed from "../components/NotesUsed";
import SaveToMidi from "../components/SaveToMidi";
import TabbedControls from "../components/TabbedControls";
import ShowMePanels from "../components/ShowMePanels";
import TitleArea from "../components/TitleArea";
import SharedStateIndicator from "../components/SharedStateIndicator";

import "./App.css";

const scales = Scale.names();

function App() {
	const { id } = useParams();
	const location = useLocation();
	const [stateModified, setStateModified] = useState(false);

	const [instrumentName, setInstrumentName] = useState(INSTRUMENTS[0].value);
	const [animationsEnabled, _setAnimationsEnabled] = useStorage("animationsEnabled", DEFAULT_ANIMATIONS_ENABLED);

	const [inputState, _setInputState] = useStorage("inputState", {
		key: DEFAULT_KEY,
		scale: DEFAULT_SCALE,
		numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
		emptyNotes: DEFAULT_EMPTY_NOTES,
		octaves: DEFAULT_OCTAVES,
	});

	const setInputState = useCallback((newState) => {
		setStateModified(true);
		_setInputState(newState);
	}, [_setInputState]);

	const [controlState, _setControlState] = useStorage("controlState", {
		tempo: DEFAULT_TEMPO,
		volume: DEFAULT_VOLUME,
		noteMode: DEFAULT_NOTES_MODE,
		noteLength: DEFAULT_NOTE_LENGTH,
		tieTogether: false,
	});

	const setControlState = useCallback((newState) => {
		setStateModified(true);
		_setControlState(newState);
	}, [_setControlState]);

	const handleInputChange = useCallback(
		(event) => {
			setInputState((prevState) => ({
				...prevState,
				[event.target.name]: event.target.value,
			}));
		},
		[setInputState],
	);

	const handleControlChange = useCallback(
		(event) => {
			const { target } = event;
			const value = target.type === "checkbox" ? target.checked : target.value;
			setControlState((prevState) => ({
				...prevState,
				[target.name]: value,
			}));
		},
		[setControlState],
	);

	const [selectedPanelsToShow, _setSelectedPanelsToShow] = useStorage(
		"selectedPanelsToShow",
		DEFAULT_PANELS_TO_SHOW,
	);
	const setSelectedPanelsToShow = useCallback(_setSelectedPanelsToShow, []);

	const [currentColour, setCurrentColour] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [notesInScale, setNotesInScale] = useState([]);
	const [shareButtonText, setShareButtonText] = useState("Share notes");
	const [randomNotes, setRandomNotes] = useState([]);
	const [triggerRegenerate, setTriggerRegenerate] = useState(false);
	const [triggerNotesUpdate, setTriggerNotesUpdate] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [loadedFromUrl, setLoadedFromUrl] = useState(false);

	const resetInputs = useCallback(() => {
		setCurrentIndex(0);
		setStateModified(true);

		setInputState({
			...inputState,
			key: DEFAULT_KEY,
			scale: DEFAULT_SCALE,
			numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
			emptyNotes: DEFAULT_EMPTY_NOTES,
			octaves: DEFAULT_OCTAVES,
		});
	}, [setCurrentIndex, setInputState, inputState]);

	useEffect(() => {
		async function loadSharedState(stateId) {

			const { data, error } = await supabase
				.from('app_states')
				.select('*')
				.eq('id', stateId)
				.single();

			if (error) {
				console.error('Error loading state:', error);
				return;
			}

			if (data) {
				setLoadedFromUrl(true);

				_setInputState({
					key: data.key,
					scale: data.scale,
					numberOfNotes: Number(data.number_of_notes),
					emptyNotes: Number(data.empty_notes),
					octaves: data.octaves,
				});

				_setControlState({
					tempo: Number(data.tempo),
					volume: Number(data.volume),
					noteMode: data.note_mode,
					noteLength: Number(data.note_length),
					tieTogether: data.tie_together === true,
					instrument: data.instrument
				});

				setRandomNotes(data.random_notes);
				setInstrumentName(data.instrument);
				setSelectedPanelsToShow(data.panels_to_show);
				setStateModified(false);
			}
		}

		if (id) {
			loadSharedState(id);
		}
	}, [id]);

	const saveAndShare = async () => {
		const stateToSave = {
			key: inputState.key,
			scale: inputState.scale,
			number_of_notes: inputState.numberOfNotes,
			empty_notes: inputState.emptyNotes,
			octaves: inputState.octaves,
			tempo: controlState.tempo,
			volume: controlState.volume,
			instrument: controlState.instrument,
			note_mode: "sharp", // Todo: I still need to handle the sharp/flat note mode stuff. 
			note_length: controlState.noteLength,
			tie_together: controlState.tieTogether,
			random_notes: randomNotes,
			panels_to_show: selectedPanelsToShow
		};

		const stateHash = btoa(JSON.stringify(stateToSave));

		const { data: existingState } = await supabase
			.from('app_states')
			.select('id')
			.eq('state_hash', stateHash)
			.single();

		if (existingState) {
			const shareableUrl = `${window.location.origin}/${existingState.id}`;
			navigator.clipboard.writeText(shareableUrl);
			setShareButtonText("Link copied!");
			setTimeout(() => setShareButtonText("Share notes"), 2000);
			return;
		}

		const { data, error } = await supabase
			.from('app_states')
			.insert([{
				...stateToSave,
				state_hash: stateHash
			}])
			.select()
			.single();

		if (error) {
			console.error('Error saving state:', error);
			return;
		}

		const shareableUrl = `${window.location.origin}/${data.id}`;
		navigator.clipboard.writeText(shareableUrl);
		setShareButtonText("Link copied!");
		setTimeout(() => setShareButtonText("Share notes"), 2000);
		setStateModified(false);
	};

	useEffect(() => {
		if (!inputState) return;

		if (loadedFromUrl) {
			setLoadedFromUrl(false);
			return;
		}

		const getRandomNotes = (notesInScale, total, empty, notesMode) => {
			let numberOfNotesToUse = total - empty;
			if (numberOfNotesToUse < 0) numberOfNotesToUse = total;

			const notesWithOctaves = Array(numberOfNotesToUse)
				.fill(0)
				.map(
					() => `${getRandomItem(notesInScale)}${getRandomItem(inputState.octaves)}`,
				);
			const emptyNotes = Array(empty).fill("");
			return shuffleArray([...notesWithOctaves, ...emptyNotes]);
		};

		const scale = Scale.get(`${inputState.key} ${inputState.scale}`);
		const notesInScale = scale.notes.map((note) => {
			const { pc, oct } = Note.get(Note.simplify(note));
			return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
		});

		setNotesInScale(notesInScale);

		const totalNotes = Number.parseInt(inputState.numberOfNotes);
		const emptyNotes = Number.parseInt(inputState.emptyNotes);
		const notation = Number.parseInt(controlState.notation);
		const randomNotes = getRandomNotes(
			notesInScale,
			totalNotes,
			emptyNotes,
			notation,
		);

		const firstNonEmptyNoteIndex = randomNotes.findIndex((note) => note !== "");
		if (firstNonEmptyNoteIndex !== -1) {
			[randomNotes[0], randomNotes[firstNonEmptyNoteIndex]] = [
				randomNotes[firstNonEmptyNoteIndex],
				randomNotes[0],
			];
		}

		setRandomNotes(randomNotes);
		setCurrentIndex(0);
		setCurrentColour(randomRGBA());
	}, [inputState, triggerRegenerate]);

	useEffect(() => {
		if (!inputState) return;
		const maxEmptyNotes = Math.max(
			0,
			Number.parseInt(inputState.numberOfNotes) - 3,
		);
		if (Number.parseInt(inputState.emptyNotes) > maxEmptyNotes) {
			setInputState({
				...inputState,
				emptyNotes: maxEmptyNotes,
			});
		}
	}, [inputState, setInputState]);

	useEffect(() => {
		const handleKeyPress = (event) => {
			switch (event.key.toLowerCase()) {
				case "p": // P for play/pause. Space is important for accessibility of the page.
					event.preventDefault();
					setIsPlaying((prevIsPlaying) => !prevIsPlaying);
					break;
				case "n": // N for new notes
					setTriggerRegenerate((prevTrigger) => !prevTrigger);
					break;
				case "r": // R for reset inputs
					resetInputs();
					break;
				case "s": // S for save as MIDI
					SaveToMidi(randomNotes, controlState.tempo);
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	});

	useEffect(() => {
		document.body.classList.toggle('animations-enabled', animationsEnabled);
	}, [animationsEnabled]);

	if (!inputState) return null;
	if (!inputState.octaves) return null;

	return (
		<div className="App">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 p-4">
				{/* Title Area */}
				<div className="lg:col-span-4">
					<SharedStateIndicator stateId={id} isModified={stateModified} />
					<TitleArea
						selectedTempo={controlState.tempo}
						setTriggerRegenerate={setTriggerRegenerate}
						triggerRegenerate={triggerRegenerate}
						setTriggerNotesUpdate={setTriggerNotesUpdate}
						triggerNotesUpdate={triggerNotesUpdate}
						currentColour={currentColour}
						randomNotes={randomNotes}
						currentIndex={currentIndex}
						animationsEnabled={animationsEnabled}
						setAnimationsEnabled={_setAnimationsEnabled}
					/>
				</div>

				{/* Controls Block */}
				<div className="lg:col-span-2 space-y-6">
					<ButtonBlock
						setTriggerRegenerate={setTriggerRegenerate}
						triggerRegenerate={triggerRegenerate}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						resetInputs={resetInputs}
						selectedKey={inputState.key}
						selectedScale={inputState.scale}
						selectedNumberOfNotes={inputState.numberOfNotes}
						selectedTempo={controlState.tempo}
						selectedOctaves={inputState.octaves}
						randomNotes={randomNotes}
						setShareButtonText={setShareButtonText}
						shareButtonText={shareButtonText}
						SaveToMidi={SaveToMidi}
						setRandomNotes={setRandomNotes}
						saveAndShare={saveAndShare}
					/>

					{/* This would be cool as an animated line moving left to right as the notes play */}
					<div className="w-full h-px bg-gradient-to-r from-pink-500 to-purple-500" />

					<NotesUsed
						notesInScale={notesInScale}
						randomNotes={randomNotes}
						setRandomNotes={setRandomNotes}
						currentIndex={currentIndex}
						selectedOctaves={inputState.octaves}
						tieTogether={controlState.tieTogether}
					/>

					<MessageBoxes
						selectedTempo={controlState.tempo}
						selectedNumberOfNotes={inputState.numberOfNotes}
					/>
				</div>

				<div className="md:col-span-2 lg:col-span-6 space-y-6">
					<TabbedControls
						KEYS={KEYS}
						scales={scales}
						notesInScale={notesInScale}
						inputState={inputState}
						setInputState={setInputState}
						handleInputChange={handleInputChange}
						selectedPanelsToShow={selectedPanelsToShow}
						setSelectedPanelsToShow={setSelectedPanelsToShow}
						controlState={controlState}
						handleControlChange={handleControlChange}
						setInstrumentName={setInstrumentName}
					/>
				</div>
			</div>

			<ShowMePanels
				selectedPanelsToShow={selectedPanelsToShow}
				currentIndex={currentIndex}
				randomNotes={randomNotes}
				notesInScale={notesInScale}
				selectedOctaves={inputState.octaves}
			/>

			{controlState && (
				<Loop
					notes={randomNotes}
					bpm={controlState.tempo}
					isPlaying={isPlaying}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					instrument={controlState.instrument}
					volume={controlState.volume}
					notePlayLength={controlState.noteLength}
					tieTogether={controlState.tieTogether}
				/>
			)}

			<div className="debug-info-block">
				isPlaying: {isPlaying.toString()} <br />
				loadedFromUrl: {loadedFromUrl.toString()} <br />
				inputState: {JSON.stringify(inputState)} <br />
				controlState: {JSON.stringify(controlState)} <br />
				stateModified: {stateModified.toString()} <br />
				instrumentName: {instrumentName} <br />
				randomNotes: {JSON.stringify(randomNotes)} <br />
				selectedPanelsToShow: {JSON.stringify(selectedPanelsToShow)} <br />
			</div>
		</div>
	);
}

export default App;