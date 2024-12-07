import React, { useState } from 'react';
import { Scale, Note, Chord } from 'tonal';
import Guitar from './components/instruments/Guitar';
import Checkbox from './components/Checkbox';
import { DEFAULT_KEY, DEFAULT_SCALE, DEFAULT_NOTES_MODE, KEYS, OCTAVES } from './useful';

export default function ScaleFretboard() {
	const [selectedKey, setSelectedKey] = useState(DEFAULT_KEY);
	const [selectedScale, setSelectedScale] = useState(DEFAULT_SCALE);
	const [noteMode, setNoteMode] = useState(DEFAULT_NOTES_MODE);
	const [hoveredChord, setHoveredChord] = useState(null);
	const [selectedChords, setSelectedChords] = useState(new Set());
	const [selectedOctaves, setSelectedOctaves] = useState([4]);
	const [hoveredRoot, setHoveredRoot] = useState(null);

	const scale = Scale.get(`${selectedKey} ${selectedScale}`);
	const scaleNotes = scale.notes.map(note =>
		noteMode === 'sharp' ? Note.simplify(note) : Note.enharmonic(note)
	);

	const chords = scaleNotes.map((note, index) => {
		const symbol = selectedScale.includes('minor')
			? ['m', '', 'm', 'm', '', '', 'dim'][index]
			: ['', 'm', 'm', '', '', 'm', 'dim'][index];
		const chordNotes = Chord.get(note + symbol).notes.map(n =>
			noteMode === 'sharp' ? Note.simplify(n) : Note.enharmonic(n)
		);
		return { root: chordNotes[0], symbol, notes: chordNotes, id: `${note}${symbol}` };
	});

	const chordsByRoot = chords.reduce((acc, chord) => {
		(acc[chord.root] = acc[chord.root] || []).push(chord);
		return acc;
	}, {});

	const visibleNotes = selectedChords.size === 0
		? scaleNotes.map(note => note + '4')
		: [...selectedChords].flatMap(id => {
			const chord = chords.find(c => c.id === id);
			return chord ? selectedOctaves.flatMap(oct => chord.notes.map(note => note + oct)) : [];
		});

	return (
		<div className="p-4 flex flex-col h-screen">
			<div className="bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 p-4 rounded-lg mb-4">
				<div className="grid grid-cols-[2fr,1fr] gap-8">
					<div className="flex gap-4 items-start">
						<div>
							<label className="block text-sm text-gray-200 mb-2">Key</label>
							<select value={selectedKey} onChange={e => setSelectedKey(e.target.value)}
								className="bg-gray-700 text-white rounded-md p-2 w-32">
								{KEYS.map(key => (
									<option key={key} value={key}>{noteMode === 'sharp' ? key : Note.enharmonic(key)}</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm text-gray-200 mb-2">Scale</label>
							<select value={selectedScale} onChange={e => setSelectedScale(e.target.value)}
								className="bg-gray-700 text-white rounded-md p-2 w-48">
								{Scale.names().map(scale => <option key={scale} value={scale}>{scale}</option>)}
							</select>
						</div>

						<div>
							<label className="block text-sm text-gray-200 mb-2">Notation</label>
							<select value={noteMode} onChange={e => setNoteMode(e.target.value)}
								className="bg-gray-700 text-white rounded-md p-2 w-32">
								<option value="sharp">Sharp (♯)</option>
								<option value="flat">Flat (♭)</option>
							</select>
						</div>

						<div>
							<label className="block text-sm text-gray-200 mb-2">Octaves</label>
							<div className="flex gap-4">
								{OCTAVES.map(octave => (
									<Checkbox key={octave} id={`octave-${octave}`} label={octave.toString()}
										checked={selectedOctaves.includes(octave)}
										onChange={e => setSelectedOctaves(prev =>
											e.target.checked
												? [...prev, octave].sort()
												: prev.length > 1 ? prev.filter(o => o !== octave) : prev
										)}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<label className="block text-sm text-gray-200">Chords</label>
						<div className="grid grid-cols-1 gap-2">
							{chords.map((chord) => (
								<button key={chord.id}
									className={`p-2 rounded text-left ${selectedChords.has(chord.id)
											? 'bg-blue-600/50 ring-2 ring-blue-400'
											: 'bg-blue-500/20 hover:bg-blue-500/30'
										}`}
									onClick={() => selectedChords.has(chord.id)
										? setSelectedChords(prev => {
											const next = new Set(prev);
											next.delete(chord.id);
											return next;
										})
										: setSelectedChords(prev => new Set([...prev, chord.id]))
									}
								>
									<div className="font-bold">{chord.root}{chord.symbol || 'maj'}</div>
									<div className="text-sm opacity-75">{chord.notes.join(', ')}</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="flex-grow bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 rounded-lg overflow-hidden">
				<Guitar
					notesToPlay={visibleNotes}
					playbackIndex={0}
					scaleNotes={scaleNotes}
					noteMode={noteMode}
				/>
			</div>
		</div>
	);
}