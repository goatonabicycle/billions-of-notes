import { create } from "zustand";
import {
	fetchSongs,
	fetchSections,
	createSong as createSongApi,
	updateSong as updateSongApi,
	deleteSong as deleteSongApi,
	createSection as createSectionApi,
	updateSection as updateSectionApi,
	deleteSection as deleteSectionApi,
	reorderSections as reorderSectionsApi,
	fetchIdeas,
	createIdea as createIdeaApi,
	updateIdea as updateIdeaApi,
	deleteIdea as deleteIdeaApi,
	reorderIdeas as reorderIdeasApi,
} from "../services/songService";

const useSongStore = create((set, get) => ({
	songs: [],
	selectedSongId: null,
	selectedSectionId: null,
	sections: {}, // { [songId]: Section[] }
	ideas: {}, // { [sectionId]: Idea[] }
	isLoading: false,
	error: null,

	// ============ SONGS ============

	loadSongs: async () => {
		set({ isLoading: true, error: null });
		const songs = await fetchSongs();
		set({ songs, isLoading: false });
	},

	selectSong: async (id) => {
		set({ selectedSongId: id, selectedSectionId: null });

		// Load sections for this song if not already loaded
		if (id && !get().sections[id]) {
			const sections = await fetchSections(id);
			set((state) => ({
				sections: { ...state.sections, [id]: sections },
			}));
		}
	},

	addSong: async (name, notes) => {
		const newSong = await createSongApi(name, notes);
		if (newSong) {
			set((state) => ({
				songs: [newSong, ...state.songs],
				selectedSongId: newSong.id,
				selectedSectionId: null,
				sections: { ...state.sections, [newSong.id]: [] },
			}));
		}
		return newSong;
	},

	updateSong: async (id, updates) => {
		const updatedSong = await updateSongApi(id, updates);
		if (updatedSong) {
			set((state) => ({
				songs: state.songs.map((song) =>
					song.id === id ? updatedSong : song,
				),
			}));
		}
		return updatedSong;
	},

	deleteSong: async (id) => {
		const success = await deleteSongApi(id);
		if (success) {
			set((state) => {
				const newSections = { ...state.sections };
				delete newSections[id];
				return {
					songs: state.songs.filter((song) => song.id !== id),
					selectedSongId:
						state.selectedSongId === id ? null : state.selectedSongId,
					selectedSectionId:
						state.selectedSongId === id ? null : state.selectedSectionId,
					sections: newSections,
				};
			});
		}
		return success;
	},

	// ============ SECTIONS ============

	loadSections: async (songId) => {
		const sections = await fetchSections(songId);
		set((state) => ({
			sections: { ...state.sections, [songId]: sections },
		}));
	},

	selectSection: async (sectionId) => {
		set({ selectedSectionId: sectionId });

		// Load ideas for this section if not already loaded
		if (sectionId && !get().ideas[sectionId]) {
			const ideas = await fetchIdeas(sectionId);
			set((state) => ({
				ideas: { ...state.ideas, [sectionId]: ideas },
			}));
		}
	},

	addSection: async (songId, name, notes) => {
		const newSection = await createSectionApi(songId, name, notes);
		if (newSection) {
			set((state) => ({
				sections: {
					...state.sections,
					[songId]: [...(state.sections[songId] || []), newSection],
				},
				ideas: { ...state.ideas, [newSection.id]: [] },
			}));
		}
		return newSection;
	},

	updateSection: async (songId, sectionId, updates) => {
		const updatedSection = await updateSectionApi(sectionId, updates);
		if (updatedSection) {
			set((state) => ({
				sections: {
					...state.sections,
					[songId]: state.sections[songId].map((section) =>
						section.id === sectionId ? updatedSection : section,
					),
				},
			}));
		}
		return updatedSection;
	},

	deleteSection: async (songId, sectionId) => {
		const success = await deleteSectionApi(sectionId);
		if (success) {
			set((state) => {
				const newIdeas = { ...state.ideas };
				delete newIdeas[sectionId];
				return {
					sections: {
						...state.sections,
						[songId]: state.sections[songId].filter(
							(section) => section.id !== sectionId,
						),
					},
					selectedSectionId:
						state.selectedSectionId === sectionId
							? null
							: state.selectedSectionId,
					ideas: newIdeas,
				};
			});
		}
		return success;
	},

	reorderSections: async (songId, orderedIds) => {
		// Optimistically update the UI
		set((state) => {
			const currentSections = state.sections[songId] || [];
			const reorderedSections = orderedIds
				.map((id) => currentSections.find((s) => s.id === id))
				.filter(Boolean)
				.map((section, index) => ({ ...section, order_index: index }));

			return {
				sections: {
					...state.sections,
					[songId]: reorderedSections,
				},
			};
		});

		// Persist to database
		await reorderSectionsApi(songId, orderedIds);
	},

	// ============ IDEAS ============

	loadIdeas: async (sectionId) => {
		const ideas = await fetchIdeas(sectionId);
		set((state) => ({
			ideas: { ...state.ideas, [sectionId]: ideas },
		}));
	},

	addIdea: async (sectionId, type, name, content) => {
		const newIdea = await createIdeaApi(sectionId, type, name, content);
		if (newIdea) {
			set((state) => ({
				ideas: {
					...state.ideas,
					[sectionId]: [...(state.ideas[sectionId] || []), newIdea],
				},
			}));
		}
		return newIdea;
	},

	updateIdea: async (sectionId, ideaId, updates) => {
		const updatedIdea = await updateIdeaApi(ideaId, updates);
		if (updatedIdea) {
			set((state) => ({
				ideas: {
					...state.ideas,
					[sectionId]: state.ideas[sectionId].map((idea) =>
						idea.id === ideaId ? updatedIdea : idea,
					),
				},
			}));
		}
		return updatedIdea;
	},

	deleteIdea: async (sectionId, ideaId) => {
		const success = await deleteIdeaApi(ideaId);
		if (success) {
			set((state) => ({
				ideas: {
					...state.ideas,
					[sectionId]: state.ideas[sectionId].filter(
						(idea) => idea.id !== ideaId,
					),
				},
			}));
		}
		return success;
	},

	reorderIdeas: async (sectionId, orderedIds) => {
		// Optimistically update the UI
		set((state) => {
			const currentIdeas = state.ideas[sectionId] || [];
			const reorderedIdeas = orderedIds
				.map((id) => currentIdeas.find((i) => i.id === id))
				.filter(Boolean)
				.map((idea, index) => ({ ...idea, order_index: index }));

			return {
				ideas: {
					...state.ideas,
					[sectionId]: reorderedIdeas,
				},
			};
		});

		// Persist to database
		await reorderIdeasApi(sectionId, orderedIds);
	},

	// ============ HELPERS ============

	getSelectedSong: () => {
		const { songs, selectedSongId } = get();
		return songs.find((song) => song.id === selectedSongId) || null;
	},

	getSelectedSongSections: () => {
		const { sections, selectedSongId } = get();
		return selectedSongId ? sections[selectedSongId] || [] : [];
	},

	getSelectedSection: () => {
		const { sections, selectedSongId, selectedSectionId } = get();
		if (!selectedSongId || !selectedSectionId) return null;
		const songSections = sections[selectedSongId] || [];
		return songSections.find((s) => s.id === selectedSectionId) || null;
	},

	getSelectedSectionIdeas: () => {
		const { ideas, selectedSectionId } = get();
		return selectedSectionId ? ideas[selectedSectionId] || [] : [];
	},
}));

export default useSongStore;
