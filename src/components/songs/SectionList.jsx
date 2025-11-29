import React from "react";
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
import { FiPlus } from "react-icons/fi";

function SortableSection({ section, isSelected, onSelect }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: section.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const maxNoteChars = 12;
	const truncatedNotes = section.notes
		? section.notes.length > maxNoteChars
			? `${section.notes.substring(0, maxNoteChars)}...`
			: section.notes
		: "";

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={() => onSelect(section.id)}
			onKeyDown={(e) => e.key === "Enter" && onSelect(section.id)}
			role="button"
			tabIndex={0}
			className={`
				flex-shrink-0 px-3 py-2 rounded cursor-pointer
				transition-all duration-200
				${
					isSelected
						? "bg-primary-600/40 border border-primary-400 shadow-glow-sm"
						: "bg-primary-900/40 border border-primary-500/30 hover:border-primary-500/60 hover:bg-primary-800/40"
				}
			`}
		>
			<div
				className={`text-xs font-medium truncate ${
					isSelected ? "text-primary-100" : "text-primary-300"
				}`}
			>
				{section.name}
			</div>
			{truncatedNotes && (
				<div className="text-[10px] text-primary-500 truncate mt-0.5">
					{truncatedNotes}
				</div>
			)}
		</div>
	);
}

function SectionList({ sections, selectedSectionId, onSelect, onAdd, onReorder }) {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = sections.findIndex((s) => s.id === active.id);
			const newIndex = sections.findIndex((s) => s.id === over.id);
			const newOrder = arrayMove(sections, oldIndex, newIndex);
			onReorder(newOrder.map((s) => s.id));
		}
	};

	return (
		<div className="flex items-center gap-2 overflow-x-auto py-1">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={sections.map((s) => s.id)}
					strategy={horizontalListSortingStrategy}
				>
					{sections.map((section) => (
						<SortableSection
							key={section.id}
							section={section}
							isSelected={selectedSectionId === section.id}
							onSelect={onSelect}
						/>
					))}
				</SortableContext>
			</DndContext>

			<button
				type="button"
				onClick={onAdd}
				className="flex-shrink-0 w-8 h-8 rounded
					border border-dashed border-primary-500/30
					flex items-center justify-center
					text-primary-500 hover:text-primary-400
					hover:border-primary-500/60 hover:bg-primary-900/20
					transition-all duration-200"
				title="Add section"
			>
				<FiPlus size={14} />
			</button>
		</div>
	);
}

export default React.memo(SectionList);
