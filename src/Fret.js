import React, { useCallback, useMemo } from 'react';
import { Scale, Note } from 'tonal';
import Guitar from './components/instruments/Guitar';
import OctaveSelector from './components/OctaveSelector';
import ScaleSelector from './components/ScaleSelector';
import Select from './components/Select';
import { DEFAULT_KEY, DEFAULT_SCALE, KEYS, DEFAULT_OCTAVES, mapToSelectOptions, FLAT_TO_SHARP } from './useful';
import { useStorage } from "./hooks/useLocalStorage";

const scales = Scale.names();

export default function ScaleFretboard() {
	const [inputState, _setInputState] = useStorage("fret-inputState", {
		key: DEFAULT_KEY,
		scale: DEFAULT_SCALE,
		notation: "sharp",
		octaves: [2, 3],
	});
	const setInputState = useCallback(_setInputState, [_setInputState]);

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
		console.log('Before update:', inputState.octaves);
		console.log('Updating to:', newOctaves);
		setInputState(prevState => {
			const updated = {
				...prevState,
				octaves: newOctaves
			};
			console.log('After update:', updated.octaves);
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
		<div className="flex flex-col h-screen gap-4 p-4">
			<div className="flex gap-4">
				<div className="w-full bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 p-4 rounded-lg">
					<div className="flex flex-wrap gap-6">
						<div>
							<div className="block text-sm text-gray-200 mb-2">Key</div>
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
			</div>
		</div>
	);
}