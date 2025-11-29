import React, { useEffect, useCallback } from "react";
import { FiPlus, FiMusic } from "react-icons/fi";
import SongList from "../components/songs/SongList";
import SongEditor from "../components/songs/SongEditor";
import SectionList from "../components/songs/SectionList";
import SectionDetail from "../components/songs/SectionDetail";
import useSongStore from "../stores/songStore";

export default function Songs() {
	const {
		songs,
		selectedSongId,
		selectedSectionId,
		sections,
		ideas,
		isLoading,
		loadSongs,
		selectSong,
		addSong,
		updateSong,
		deleteSong,
		selectSection,
		addSection,
		updateSection,
		deleteSection,
		reorderSections,
		addIdea,
		updateIdea,
		deleteIdea,
		reorderIdeas,
	} = useSongStore();

	const selectedSong = songs.find((s) => s.id === selectedSongId);
	const selectedSongSections = selectedSongId
		? sections[selectedSongId] || []
		: [];
	const selectedSection = selectedSongSections.find(
		(s) => s.id === selectedSectionId,
	);
	const selectedSectionIdeas = selectedSectionId
		? ideas[selectedSectionId] || []
		: [];

	// Load songs on mount
	useEffect(() => {
		loadSongs();
	}, [loadSongs]);

	const handleAddSong = useCallback(async () => {
		await addSong("Untitled Song", "");
	}, [addSong]);

	const handleSelectSong = useCallback(
		async (id) => {
			await selectSong(id);
		},
		[selectSong],
	);

	const handleDeleteSong = useCallback(
		async (id) => {
			if (window.confirm("Are you sure you want to delete this song?")) {
				await deleteSong(id);
			}
		},
		[deleteSong],
	);

	const handleUpdateSong = useCallback(
		async (updates) => {
			if (selectedSongId) {
				await updateSong(selectedSongId, updates);
			}
		},
		[selectedSongId, updateSong],
	);

	const handleAddSection = useCallback(async () => {
		if (selectedSongId) {
			await addSection(selectedSongId, "New Section", "");
		}
	}, [selectedSongId, addSection]);

	const handleSelectSection = useCallback(
		async (sectionId) => {
			await selectSection(sectionId);
		},
		[selectSection],
	);

	const handleUpdateSection = useCallback(
		async (updates) => {
			if (selectedSongId && selectedSectionId) {
				await updateSection(selectedSongId, selectedSectionId, updates);
			}
		},
		[selectedSongId, selectedSectionId, updateSection],
	);

	const handleDeleteSection = useCallback(async () => {
		if (selectedSongId && selectedSectionId) {
			if (window.confirm("Are you sure you want to delete this section?")) {
				await deleteSection(selectedSongId, selectedSectionId);
			}
		}
	}, [selectedSongId, selectedSectionId, deleteSection]);

	const handleReorderSections = useCallback(
		async (orderedIds) => {
			if (selectedSongId) {
				await reorderSections(selectedSongId, orderedIds);
			}
		},
		[selectedSongId, reorderSections],
	);

	const handleAddIdea = useCallback(
		async (type, name, content) => {
			if (selectedSectionId) {
				await addIdea(selectedSectionId, type, name, content);
			}
		},
		[selectedSectionId, addIdea],
	);

	const handleUpdateIdea = useCallback(
		async (ideaId, updates) => {
			if (selectedSectionId) {
				await updateIdea(selectedSectionId, ideaId, updates);
			}
		},
		[selectedSectionId, updateIdea],
	);

	const handleDeleteIdea = useCallback(
		async (ideaId) => {
			if (selectedSectionId) {
				await deleteIdea(selectedSectionId, ideaId);
			}
		},
		[selectedSectionId, deleteIdea],
	);

	const handleReorderIdeas = useCallback(
		async (orderedIds) => {
			if (selectedSectionId) {
				await reorderIdeas(selectedSectionId, orderedIds);
			}
		},
		[selectedSectionId, reorderIdeas],
	);

	return (
		<div className="flex flex-col h-screen">
			{/* Header */}
			<div className="flex items-center justify-between px-4 pt-4 pb-2">
				<div className="flex items-center gap-4">
					<a
						href="/"
						className="text-xs text-primary-100 hover:text-primary-400 transition-colors duration-300"
					>
						Back home
					</a>
					<h1 className="text-primary-300 uppercase text-lg">Songs</h1>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-grow flex overflow-hidden px-4 pb-4 gap-4">
				{/* Left sidebar - Song list */}
				<div className="w-48 flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 rounded-lg p-3 flex flex-col">
					<div className="flex items-center justify-between mb-3">
						<h2 className="text-xs text-primary-400 font-medium">My Songs</h2>
						<button
							type="button"
							onClick={handleAddSong}
							className="flex items-center gap-1 px-1.5 py-0.5 text-[10px]
								bg-primary-600/30 hover:bg-primary-600/50
								border border-primary-500/30 hover:border-primary-500/50
								text-primary-200 rounded
								transition-all duration-200"
							title="Add new song"
						>
							<FiPlus size={10} />
							New
						</button>
					</div>

					<div className="flex-grow overflow-y-auto">
						{isLoading ? (
							<div className="text-primary-500 text-xs text-center py-4">
								Loading...
							</div>
						) : (
							<SongList
								songs={songs}
								selectedSongId={selectedSongId}
								onSelect={handleSelectSong}
								onDelete={handleDeleteSong}
							/>
						)}
					</div>
				</div>

				{/* Right panel - Song content */}
				<div className="flex-grow flex flex-col overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-primary-500/20 rounded-lg">
					{selectedSong ? (
						<>
							{/* Song header */}
							<div className="px-4 py-2 border-b border-primary-500/20">
								<SongEditor song={selectedSong} onUpdate={handleUpdateSong} />
							</div>

							{/* Sections row */}
							<div className="px-4 py-2 border-b border-primary-500/20 bg-primary-950/30">
								<div className="flex items-center gap-2 mb-2">
									<h3 className="text-[10px] text-primary-400 font-medium uppercase tracking-wider">
										Sections
									</h3>
								</div>
								{selectedSongSections.length === 0 ? (
									<button
										type="button"
										onClick={handleAddSection}
										className="flex items-center gap-2 px-3 py-2
											border border-dashed border-primary-500/30
											text-primary-500 hover:text-primary-400
											hover:border-primary-500/60 hover:bg-primary-900/20
											rounded transition-all duration-200 text-xs"
									>
										<FiPlus size={12} />
										<span>Add first section</span>
									</button>
								) : (
									<SectionList
										sections={selectedSongSections}
										selectedSectionId={selectedSectionId}
										onSelect={handleSelectSection}
										onAdd={handleAddSection}
										onReorder={handleReorderSections}
									/>
								)}
							</div>

							{/* Section detail */}
							<div className="flex-grow overflow-hidden p-3">
								{selectedSection ? (
									<SectionDetail
										section={selectedSection}
										ideas={selectedSectionIdeas}
										onUpdateSection={handleUpdateSection}
										onDeleteSection={handleDeleteSection}
										onAddIdea={handleAddIdea}
										onUpdateIdea={handleUpdateIdea}
										onDeleteIdea={handleDeleteIdea}
										onReorderIdeas={handleReorderIdeas}
									/>
								) : (
									<div className="flex flex-col items-center justify-center h-full text-primary-500">
										<FiMusic size={32} className="mb-2 opacity-50" />
										<span className="text-sm">
											Select a section to view and edit its ideas
										</span>
									</div>
								)}
							</div>
						</>
					) : (
						<div className="flex flex-col items-center justify-center h-full text-primary-500">
							<FiMusic size={48} className="mb-4 opacity-50" />
							<span className="text-lg mb-2">No song selected</span>
							<span className="text-sm opacity-75">
								Select a song from the list or create a new one
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
