import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Scale, Note } from 'tonal';
import { useParams } from 'react-router-dom';
import Guitar from '../components/instruments/Guitar';
import OctaveSelector from '../components/OctaveSelector';
import ScaleSelector from '../components/ScaleSelector';
import Select from '../components/Select';
import { supabase } from '../supabaseClient';
import {
	DEFAULT_KEY,
	DEFAULT_SCALE,
	KEYS,
	mapToSelectOptions,
	FLAT_TO_SHARP
} from '../useful';
import { useStorage } from "../hooks/useLocalStorage";

const scales = Scale.names();

export default function ScaleFretboard() {
	const { id } = useParams();
	const [shareUrl, setShareUrl] = useState('');

	const [inputState, _setInputState] = useStorage("fret-inputState", {
		key: DEFAULT_KEY,
		scale: DEFAULT_SCALE,
		notation: "sharp",
		octaves: [2, 3],
	});
	const setInputState = useCallback(_setInputState, [_setInputState]);

	useEffect(() => {
		if (id) {
			loadSharedState(id);
		}
	}, [id]);

	const loadSharedState = async (stateId) => {
		const { data, error } = await supabase
			.from('fretboard_states')
			.select('*')
			.eq('id', stateId)
			.single();

		if (error) {
			console.error('Error loading state:', error);
			return;
		}

		if (data) {
			setInputState({
				key: data.key,
				scale: data.scale,
				notation: data.notation,
				octaves: data.octaves,
			});
		}
	};

	const saveAndShare = async () => {
		const stateToSave = {
			key: inputState.key,
			scale: inputState.scale,
			notation: inputState.notation,
			octaves: inputState.octaves,
		};
		const stateHash = btoa(JSON.stringify(stateToSave));

		const { data: existingState } = await supabase
			.from('fretboard_states')
			.select('id')
			.eq('state_hash', stateHash)
			.single();

		if (existingState) {
			const shareableUrl = `${window.location.origin}/fret/${existingState.id}`;
			setShareUrl(shareableUrl);
			navigator.clipboard.writeText(shareableUrl);
			return;
		}

		const { data, error } = await supabase
			.from('fretboard_states')
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

		const shareableUrl = `${window.location.origin}/fret/${data.id}`;
		setShareUrl(shareableUrl);
		navigator.clipboard.writeText(shareableUrl);
	};

	const handleInputChange = useCallback(
		(event) => {
			console.log(event, event.target.name, event.target.value);
			setInputState((prevState) => ({
				...prevState,
				[event.target.name]: event.target.value,
			}));
		},
		[setInputState],
	);

	const handleOctaveChange = useCallback((newOctaves) => {
		setInputState(prevState => {
			const updated = { ...prevState, octaves: newOctaves };
			return updated;
		});
	}, [setInputState, inputState]);

	const keyOptions = useMemo(() => mapToSelectOptions(KEYS), [KEYS]);
	const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);

	const scale = Scale.get(`${inputState.key} ${inputState.scale}`);
	const notesInScale = scale.notes.map((note) => {
		const { pc, oct } = Note.get(Note.simplify(note));
		return (FLAT_TO_SHARP[pc] || pc) + (oct || "");
	});

	const visibleNotes = inputState?.octaves?.flatMap(octave =>
		notesInScale.map(note => {
			const { pc } = Note.get(note);
			return pc + octave;
		})
	);

	return (
		<div className="flex flex-col h-screen gap-6 p-6 pt-6">
			<a href="/" className="text-xs text-pink-100 hover:text-pink-400 transition-colors duration-300">Back home</a>
			<div className="flex justify-center items-center gap-2">
				<div className="text-xl text-pink-300 uppercase">
					Just a fretboard
				</div>
			</div>
			<div className="flex gap-4">
				<div className="w-full bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 p-4 rounded-lg">
					<div className="flex flex-wrap gap-6">
						<div>
							<Select
								id="key"
								name="key"
								label="Key"
								options={keyOptions}
								onChange={handleInputChange}
								selectedValue={inputState.key}
							/>
						</div>

						<ScaleSelector
							scaleOptions={scaleOptions}
							inputScale={inputState.scale}
							handleInputChange={handleInputChange}
							notesInScale={notesInScale}
						/>

						<div>
							<div className="block text-sm text-gray-200 mb-2">Octaves</div>
							<div className="flex gap-4">
								<OctaveSelector
									octaves={inputState.octaves}
									setInputState={handleOctaveChange}
									hideLabel={true}
									isFretComponent={true}
								/>
							</div>
						</div>

						<button
							onClick={saveAndShare}
							className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
						>
							Share
						</button>
						{shareUrl && (
							<div className="text-sm text-gray-200">
								URL copied to clipboard!
							</div>
						)}
					</div>
				</div>

				<div className="w-full bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 p-4 rounded-lg">
					<div className="block text-sm text-gray-200 mb-2">Chords</div>
					Coming soon
				</div>
			</div>

			<div className="flex-grow bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 rounded-lg overflow-hidden">
				<Guitar
					notesToPlay={visibleNotes}
					playbackIndex={0}
					scaleNotes={notesInScale}
				/>
			</div>

			<div className="debug-info-block">
				inputState: {JSON.stringify(inputState)} <br />
				shareUrl: {shareUrl}
			</div>
		</div>
	);
}