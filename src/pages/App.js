import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Scale } from "tonal";

import { useStorage } from "../hooks/useLocalStorage";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useInputStateWithTracking, useControlStateWithTracking } from "../hooks/useStateWithTracking";
import * as supabaseService from "../services/supabaseService";
import { generateRandomNotes, validateEmptyNotes } from "../services/notesGenerator";

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
	DEFAULT_INSTRUMENT,
	KEYS,
	randomRGBA,
	DEFAULT_ANIMATIONS_ENABLED,
	DEFAULT_DEBUG_ENABLED
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
import Debug from "../components/Debug";

function App() {
	const scales = useMemo(() => Scale.names(), []);
	const { id } = useParams();
	const [stateModified, setStateModified] = useState(false);

	const [debugEnabled, _setDebugEnabled] = useStorage("debugEnabled", DEFAULT_DEBUG_ENABLED);
	const [animationsEnabled, _setAnimationsEnabled] = useStorage("animationsEnabled", DEFAULT_ANIMATIONS_ENABLED);
	const [isGeneratingLink, setIsGeneratingLink] = useState(false);

	const [inputState, setInputState] = useInputStateWithTracking(
		{
			key: DEFAULT_KEY,
			scale: DEFAULT_SCALE,
			numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
			emptyNotes: DEFAULT_EMPTY_NOTES,
			octaves: DEFAULT_OCTAVES,
		},
		setStateModified
	);

	const [controlState, setControlState] = useControlStateWithTracking(
		{
			tempo: DEFAULT_TEMPO,
			volume: DEFAULT_VOLUME,
			noteMode: DEFAULT_NOTES_MODE,
			noteLength: DEFAULT_NOTE_LENGTH,
			instrument: DEFAULT_INSTRUMENT,
			tieTogether: false,
		},
		setStateModified
	);

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

	const [activeTab, setActiveTab] = useState("settings");

	const [selectedPanelsToShow, _setSelectedPanelsToShow] = useStorage(
		"selectedPanelsToShow",
		DEFAULT_PANELS_TO_SHOW,
	);
	const setSelectedPanelsToShow = useCallback(_setSelectedPanelsToShow, [_setSelectedPanelsToShow]);

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
			key: DEFAULT_KEY,
			scale: DEFAULT_SCALE,
			numberOfNotes: DEFAULT_NUMBER_OF_NOTES,
			emptyNotes: DEFAULT_EMPTY_NOTES,
			octaves: DEFAULT_OCTAVES,
		});

		setSelectedPanelsToShow(DEFAULT_PANELS_TO_SHOW);
		setControlState({
			tempo: DEFAULT_TEMPO,
			volume: DEFAULT_VOLUME,
			noteMode: DEFAULT_NOTES_MODE,
			noteLength: DEFAULT_NOTE_LENGTH,
			instrument: DEFAULT_INSTRUMENT,
			tieTogether: false,
		});
	}, [setInputState, setControlState, setSelectedPanelsToShow, setCurrentIndex, setStateModified]);

	useEffect(() => {
		async function loadInitialState() {
			if (!id) return;

			const data = await supabaseService.loadSharedState(id);
			if (data) {
				const parsed = supabaseService.parseStateData(data);
				setLoadedFromUrl(true);
				setInputState(parsed.inputState);
				setControlState(parsed.controlState);
				setRandomNotes(parsed.randomNotes);
				setSelectedPanelsToShow(parsed.panelsToShow);
				setStateModified(false);
			}
		}

		loadInitialState();
	}, [id, setInputState, setControlState, setSelectedPanelsToShow]);

	const saveAndShare = async () => {
		setIsGeneratingLink(true);

		try {
			const stateId = await supabaseService.saveState({
				inputState,
				controlState,
				randomNotes,
				selectedPanelsToShow
			});

			if (!stateId) {
				throw new Error('Failed to save state');
			}

			const shareableUrl = `${window.location.origin}/${stateId}`;
			await navigator.clipboard.writeText(shareableUrl);
			setShareButtonText("Link copied!");
			setTimeout(() => setShareButtonText("Share notes"), 2000);

			setStateModified(false);

		} catch (error) {
			console.error('Error in saveAndShare:', error);
			setShareButtonText("Error saving state");
			setTimeout(() => setShareButtonText("Share notes"), 2000);
		} finally {
			setIsGeneratingLink(false);
		}
	};



	const generatedNotes = useMemo(() => {
		if (!inputState || loadedFromUrl) return null;
		return generateRandomNotes(inputState);
	}, [inputState, loadedFromUrl, triggerRegenerate]);

	useEffect(() => {
		if (!generatedNotes) return;

		setNotesInScale(generatedNotes.notesInScale);
		setRandomNotes(generatedNotes.randomNotes);
		setCurrentIndex(0);
		setCurrentColour(randomRGBA());
	}, [generatedNotes]);

	useEffect(() => {
		if (!inputState) return;
		const validatedEmptyNotes = validateEmptyNotes(
			inputState.numberOfNotes,
			inputState.emptyNotes
		);
		if (Number.parseInt(inputState.emptyNotes) !== validatedEmptyNotes) {
			setInputState({
				...inputState,
				emptyNotes: validatedEmptyNotes,
			});
		}
	}, [inputState, setInputState]);

	useKeyboardShortcuts({
		setIsPlaying,
		setTriggerRegenerate,
		resetInputs,
		randomNotes,
		tempo: controlState.tempo
	});

	useEffect(() => {
		document.body.classList.toggle('animations-enabled', animationsEnabled);
	}, [animationsEnabled]);

	if (!inputState) return null;
	if (!inputState.octaves) return null;

	return (
		<div className="App">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 p-4">
				<div className="lg:col-span-4">

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
						debugEnabled={debugEnabled}
						setDebugEnabled={_setDebugEnabled}
					/>
				</div>

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
						isGeneratingLink={isGeneratingLink}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>

					<SharedStateIndicator
						stateId={id}
						isModified={stateModified}
					/>

					{/* This would be cool as an animated line moving left to right as the notes play */}
					<div className="w-full h-px bg-gradient-to-r from-primary-500 to-secondary-500" />

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
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						animationsEnabled={animationsEnabled}
						setAnimationsEnabled={_setAnimationsEnabled}
						debugEnabled={debugEnabled}
						setDebugEnabled={_setDebugEnabled}
						setTriggerRegenerate={setTriggerRegenerate}
						triggerRegenerate={triggerRegenerate}
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


			{debugEnabled && (
				<Debug
					isPlaying={isPlaying}
					loadedFromUrl={loadedFromUrl}
					inputState={inputState}
					controlState={controlState}
					stateModified={stateModified}
					randomNotes={randomNotes}
					selectedPanelsToShow={selectedPanelsToShow}
					currentIndex={currentIndex}
				/>
			)}


		</div>
	);
}

export default App;