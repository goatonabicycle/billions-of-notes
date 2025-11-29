import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiTrash2, FiMusic, FiGrid } from "react-icons/fi";

function IdeaCard({ idea, onUpdate, onDelete }) {
	const [name, setName] = useState(idea.name);
	const [content, setContent] = useState(idea.content);
	const debounceTimerRef = useRef(null);

	// Sync state when idea changes
	useEffect(() => {
		setName(idea.name);
		setContent(idea.content);
	}, [idea.name, idea.content]);

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

	const handleNameChange = (e) => {
		const value = e.target.value;
		setName(value);
		debouncedUpdate("name", value);
	};

	const handleContentChange = (e) => {
		const value = e.target.value;
		setContent(value);
		debouncedUpdate("content", value);
	};

	const isChord = idea.type === "chord";

	return (
		<div
			className={`
				group relative p-3 rounded-lg border transition-all duration-200
				${
					isChord
						? "bg-purple-900/20 border-purple-500/30 hover:border-purple-500/50"
						: "bg-pink-900/20 border-pink-500/30 hover:border-pink-500/50"
				}
			`}
		>
			{/* Type indicator */}
			<div className="flex items-center gap-2 mb-2">
				{isChord ? (
					<FiGrid size={12} className="text-purple-400" />
				) : (
					<FiMusic size={12} className="text-pink-400" />
				)}
				<span
					className={`text-xs uppercase tracking-wider ${
						isChord ? "text-purple-400" : "text-pink-400"
					}`}
				>
					{idea.type}
				</span>
				<button
					type="button"
					onClick={onDelete}
					className="ml-auto opacity-0 group-hover:opacity-100 p-1 text-primary-500 hover:text-red-400 transition-all duration-200"
					title="Delete idea"
				>
					<FiTrash2 size={12} />
				</button>
			</div>

			{/* Name */}
			<input
				type="text"
				value={name}
				onChange={handleNameChange}
				placeholder="Name..."
				className={`
					w-full px-2 py-1 mb-2 bg-transparent border-b text-sm font-medium
					placeholder-primary-600 focus:outline-none transition-all duration-200
					${
						isChord
							? "text-purple-200 border-purple-500/30 focus:border-purple-400"
							: "text-pink-200 border-pink-500/30 focus:border-pink-400"
					}
				`}
			/>

			{/* Content */}
			<textarea
				value={content}
				onChange={handleContentChange}
				placeholder={isChord ? "e.g., Am - C - G - F" : "e.g., Notes or tab..."}
				rows={3}
				className={`
					w-full px-2 py-1 bg-black/20 rounded text-xs resize-none
					placeholder-primary-600 focus:outline-none transition-all duration-200
					${
						isChord
							? "text-purple-100 border border-purple-500/20 focus:border-purple-500/40"
							: "text-pink-100 border border-pink-500/20 focus:border-pink-500/40"
					}
				`}
			/>
		</div>
	);
}

export default React.memo(IdeaCard);
