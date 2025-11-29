import React, { useState, useEffect, useCallback, useRef } from "react";

function SongEditor({ song, onUpdate }) {
	const [name, setName] = useState(song?.name || "");
	const [notes, setNotes] = useState(song?.notes || "");
	const debounceTimerRef = useRef(null);

	useEffect(() => {
		setName(song?.name || "");
		setNotes(song?.notes || "");
	}, [song?.id, song?.name, song?.notes]);

	const debouncedUpdate = useCallback(
		(field, value) => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
			debounceTimerRef.current = setTimeout(() => {
				onUpdate({ [field]: value });
			}, 500);
		},
		[onUpdate],
	);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	if (!song) {
		return null;
	}

	return (
		<div className="flex items-center gap-3">
			<input
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
					debouncedUpdate("name", e.target.value);
				}}
				placeholder="Song name..."
				className="flex-shrink-0 w-48 px-2 py-1 bg-transparent border-b-2 border-primary-500/30
					text-primary-100 text-lg font-medium placeholder-primary-600
					focus:outline-none focus:border-primary-400 transition-all duration-200"
			/>
			<input
				type="text"
				value={notes}
				onChange={(e) => {
					setNotes(e.target.value);
					debouncedUpdate("notes", e.target.value);
				}}
				placeholder="Song notes..."
				className="flex-grow px-2 py-1 bg-primary-950/30 border border-primary-500/20 rounded
					text-primary-300 text-sm placeholder-primary-600
					focus:outline-none focus:border-primary-400/50 transition-all duration-200"
			/>
		</div>
	);
}

export default React.memo(SongEditor);
