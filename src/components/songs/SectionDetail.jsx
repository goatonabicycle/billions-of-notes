import React, { useState, useEffect, useCallback, useRef } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiTrash2, FiPlus, FiMusic, FiGrid } from "react-icons/fi";

function IdeaBlock({ idea, isSelected, onSelect, onDelete }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: idea.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const isChord = idea.type === "chord";
	const maxChars = 15;
	const truncatedNotes = idea.content
		? idea.content.length > maxChars
			? `${idea.content.substring(0, maxChars)}...`
			: idea.content
		: "";

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={(e) => {
				e.stopPropagation();
				onSelect(idea.id);
			}}
			onKeyDown={(e) => e.key === "Enter" && onSelect(idea.id)}
			role="button"
			tabIndex={0}
			className={`
				group relative flex-shrink-0 px-3 py-2 rounded cursor-pointer
				min-w-[100px] max-w-[160px]
				transition-all duration-200
				${
					isChord
						? isSelected
							? "bg-purple-600/50 border-2 border-purple-400 shadow-glow-sm"
							: "bg-purple-900/40 border border-purple-500/40 hover:border-purple-400/60"
						: isSelected
							? "bg-pink-600/50 border-2 border-pink-400 shadow-glow-sm"
							: "bg-pink-900/40 border border-pink-500/40 hover:border-pink-400/60"
				}
			`}
		>
			<div className="flex items-center gap-1.5">
				{isChord ? (
					<FiGrid size={10} className="text-purple-400 flex-shrink-0" />
				) : (
					<FiMusic size={10} className="text-pink-400 flex-shrink-0" />
				)}
				<span
					className={`text-xs font-medium truncate ${
						isChord ? "text-purple-200" : "text-pink-200"
					}`}
				>
					{idea.name}
				</span>
			</div>
			{truncatedNotes && (
				<div
					className={`text-[10px] mt-0.5 truncate ${
						isChord ? "text-purple-400/70" : "text-pink-400/70"
					}`}
				>
					{truncatedNotes}
				</div>
			)}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onDelete(idea.id);
				}}
				className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100
					w-4 h-4 flex items-center justify-center
					bg-red-500 text-white rounded-full text-[8px]
					hover:bg-red-400 transition-all duration-200"
				title="Delete"
			>
				×
			</button>
		</div>
	);
}

function IdeaRow({ type, ideas, selectedIdeaId, onSelect, onDelete, onReorder, onAdd }) {
	const isChord = type === "chord";
	const filteredIdeas = ideas.filter((i) => i.type === type);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = filteredIdeas.findIndex((i) => i.id === active.id);
			const newIndex = filteredIdeas.findIndex((i) => i.id === over.id);
			const newOrder = arrayMove(filteredIdeas, oldIndex, newIndex);
			// For now, just reorder within the type - full reorder would need all ideas
			onReorder(newOrder.map((i) => i.id));
		}
	};

	return (
		<div className="flex items-center gap-2">
			<div
				className={`flex-shrink-0 w-16 text-[10px] uppercase tracking-wider font-medium ${
					isChord ? "text-purple-400" : "text-pink-400"
				}`}
			>
				{isChord ? "Chords" : "Riffs"}
			</div>
			<div className="flex-grow flex items-center gap-2 overflow-x-auto py-1">
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={filteredIdeas.map((i) => i.id)}
						strategy={horizontalListSortingStrategy}
					>
						{filteredIdeas.map((idea) => (
							<IdeaBlock
								key={idea.id}
								idea={idea}
								isSelected={selectedIdeaId === idea.id}
								onSelect={onSelect}
								onDelete={onDelete}
							/>
						))}
					</SortableContext>
				</DndContext>
				<button
					type="button"
					onClick={() => onAdd(type)}
					className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center
						border border-dashed transition-all duration-200
						${
							isChord
								? "border-purple-500/30 text-purple-500 hover:border-purple-400 hover:text-purple-400 hover:bg-purple-900/20"
								: "border-pink-500/30 text-pink-500 hover:border-pink-400 hover:text-pink-400 hover:bg-pink-900/20"
						}
					`}
					title={`Add ${type}`}
				>
					<FiPlus size={14} />
				</button>
			</div>
		</div>
	);
}

function IdeaEditor({ idea, onUpdate, onClose }) {
	const [name, setName] = useState(idea?.name || "");
	const [content, setContent] = useState(idea?.content || "");
	const debounceTimerRef = useRef(null);

	useEffect(() => {
		setName(idea?.name || "");
		setContent(idea?.content || "");
	}, [idea?.id, idea?.name, idea?.content]);

	const debouncedUpdate = useCallback(
		(field, value) => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
			debounceTimerRef.current = setTimeout(() => {
				onUpdate(idea.id, { [field]: value });
			}, 500);
		},
		[onUpdate, idea?.id],
	);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
		};
	}, []);

	if (!idea) return null;

	const isChord = idea.type === "chord";

	return (
		<div
			className={`p-3 rounded-lg border ${
				isChord
					? "bg-purple-900/20 border-purple-500/30"
					: "bg-pink-900/20 border-pink-500/30"
			}`}
		>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2">
					{isChord ? (
						<FiGrid size={14} className="text-purple-400" />
					) : (
						<FiMusic size={14} className="text-pink-400" />
					)}
					<input
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							debouncedUpdate("name", e.target.value);
						}}
						className={`bg-transparent border-b text-sm font-medium focus:outline-none ${
							isChord
								? "text-purple-200 border-purple-500/30 focus:border-purple-400"
								: "text-pink-200 border-pink-500/30 focus:border-pink-400"
						}`}
					/>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="text-primary-500 hover:text-primary-300 text-xs"
				>
					Close
				</button>
			</div>
			<textarea
				value={content}
				onChange={(e) => {
					setContent(e.target.value);
					debouncedUpdate("content", e.target.value);
				}}
				placeholder={isChord ? "e.g., Am - C - G - F" : "Notes, tabs, description..."}
				rows={4}
				className={`w-full px-2 py-1 bg-black/20 rounded text-sm resize-none focus:outline-none ${
					isChord
						? "text-purple-100 border border-purple-500/20 focus:border-purple-500/40 placeholder-purple-600"
						: "text-pink-100 border border-pink-500/20 focus:border-pink-500/40 placeholder-pink-600"
				}`}
			/>
		</div>
	);
}

function SectionDetail({
	section,
	ideas,
	onUpdateSection,
	onDeleteSection,
	onAddIdea,
	onUpdateIdea,
	onDeleteIdea,
	onReorderIdeas,
}) {
	const [name, setName] = useState(section?.name || "");
	const [notes, setNotes] = useState(section?.notes || "");
	const [selectedIdeaId, setSelectedIdeaId] = useState(null);
	const debounceTimerRef = useRef(null);

	const selectedIdea = ideas.find((i) => i.id === selectedIdeaId);

	useEffect(() => {
		setName(section?.name || "");
		setNotes(section?.notes || "");
		setSelectedIdeaId(null);
	}, [section?.id, section?.name, section?.notes]);

	const debouncedUpdate = useCallback(
		(field, value) => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
			debounceTimerRef.current = setTimeout(() => {
				onUpdateSection({ [field]: value });
			}, 500);
		},
		[onUpdateSection],
	);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
		};
	}, []);

	const handleAddIdea = (type) => {
		const defaultName = type === "chord" ? "New Chord" : "New Riff";
		onAddIdea(type, defaultName, "");
	};

	if (!section) {
		return (
			<div className="flex items-center justify-center h-full text-primary-500 text-sm">
				Select a section to view details
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 h-full">
			{/* Section Header - compact */}
			<div className="flex items-center gap-3">
				<input
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						debouncedUpdate("name", e.target.value);
					}}
					placeholder="Section name..."
					className="flex-shrink-0 w-32 px-2 py-1 bg-transparent border-b border-primary-500/30
						text-primary-100 text-sm font-medium placeholder-primary-600
						focus:outline-none focus:border-primary-400 transition-all duration-200"
				/>
				<input
					type="text"
					value={notes}
					onChange={(e) => {
						setNotes(e.target.value);
						debouncedUpdate("notes", e.target.value);
					}}
					placeholder="Notes..."
					className="flex-grow px-2 py-1 bg-primary-950/30 border border-primary-500/20 rounded
						text-primary-300 text-xs placeholder-primary-600
						focus:outline-none focus:border-primary-400/50 transition-all duration-200"
				/>
				<button
					type="button"
					onClick={onDeleteSection}
					className="p-1.5 text-primary-500 hover:text-red-400 transition-colors"
					title="Delete section"
				>
					<FiTrash2 size={14} />
				</button>
			</div>

			{/* Timeline rows */}
			<div className="flex flex-col gap-2 py-2 border-y border-primary-500/10">
				<IdeaRow
					type="chord"
					ideas={ideas}
					selectedIdeaId={selectedIdeaId}
					onSelect={setSelectedIdeaId}
					onDelete={onDeleteIdea}
					onReorder={onReorderIdeas}
					onAdd={handleAddIdea}
				/>
				<IdeaRow
					type="riff"
					ideas={ideas}
					selectedIdeaId={selectedIdeaId}
					onSelect={setSelectedIdeaId}
					onDelete={onDeleteIdea}
					onReorder={onReorderIdeas}
					onAdd={handleAddIdea}
				/>
			</div>

			{/* Selected idea editor */}
			<div className="flex-grow overflow-y-auto">
				{selectedIdea ? (
					<IdeaEditor
						idea={selectedIdea}
						onUpdate={onUpdateIdea}
						onClose={() => setSelectedIdeaId(null)}
					/>
				) : (
					<div className="flex items-center justify-center h-full text-primary-600 text-xs">
						Click a chord or riff to edit
					</div>
				)}
			</div>
		</div>
	);
}

export default React.memo(SectionDetail);
