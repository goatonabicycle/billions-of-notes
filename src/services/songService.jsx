import { supabase } from "../supabaseClient";

// ============ SONGS ============

export async function fetchSongs() {
	try {
		const { data, error } = await supabase
			.from("songs")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching songs:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error in fetchSongs:", error);
		return [];
	}
}

export async function fetchSong(id) {
	try {
		const { data, error } = await supabase
			.from("songs")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			console.error("Error fetching song:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in fetchSong:", error);
		return null;
	}
}

export async function createSong(name = "Untitled Song", notes = "") {
	try {
		const { data, error } = await supabase
			.from("songs")
			.insert([{ name, notes }])
			.select()
			.single();

		if (error) {
			console.error("Error creating song:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in createSong:", error);
		return null;
	}
}

export async function updateSong(id, updates) {
	try {
		const { data, error } = await supabase
			.from("songs")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating song:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in updateSong:", error);
		return null;
	}
}

export async function deleteSong(id) {
	try {
		const { error } = await supabase.from("songs").delete().eq("id", id);

		if (error) {
			console.error("Error deleting song:", error);
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error in deleteSong:", error);
		return false;
	}
}

// ============ SECTIONS ============

export async function fetchSections(songId) {
	try {
		const { data, error } = await supabase
			.from("song_sections")
			.select("*")
			.eq("song_id", songId)
			.order("order_index", { ascending: true });

		if (error) {
			console.error("Error fetching sections:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error in fetchSections:", error);
		return [];
	}
}

export async function createSection(songId, name = "New Section", notes = "") {
	try {
		// Get the highest order_index for this song
		const { data: existingSections } = await supabase
			.from("song_sections")
			.select("order_index")
			.eq("song_id", songId)
			.order("order_index", { ascending: false })
			.limit(1);

		const nextOrderIndex =
			existingSections && existingSections.length > 0
				? existingSections[0].order_index + 1
				: 0;

		const { data, error } = await supabase
			.from("song_sections")
			.insert([{ song_id: songId, name, notes, order_index: nextOrderIndex }])
			.select()
			.single();

		if (error) {
			console.error("Error creating section:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in createSection:", error);
		return null;
	}
}

export async function updateSection(id, updates) {
	try {
		const { data, error } = await supabase
			.from("song_sections")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating section:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in updateSection:", error);
		return null;
	}
}

export async function deleteSection(id) {
	try {
		const { error } = await supabase
			.from("song_sections")
			.delete()
			.eq("id", id);

		if (error) {
			console.error("Error deleting section:", error);
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error in deleteSection:", error);
		return false;
	}
}

export async function reorderSections(songId, orderedIds) {
	try {
		// Update each section's order_index based on its position in the array
		const updates = orderedIds.map((id, index) =>
			supabase
				.from("song_sections")
				.update({ order_index: index })
				.eq("id", id)
				.eq("song_id", songId),
		);

		await Promise.all(updates);
		return true;
	} catch (error) {
		console.error("Error in reorderSections:", error);
		return false;
	}
}

// ============ IDEAS (Riffs & Chords) ============

export async function fetchIdeas(sectionId) {
	try {
		const { data, error } = await supabase
			.from("section_ideas")
			.select("*")
			.eq("section_id", sectionId)
			.order("order_index", { ascending: true });

		if (error) {
			console.error("Error fetching ideas:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error in fetchIdeas:", error);
		return [];
	}
}

export async function createIdea(sectionId, type, name = "New Idea", content = "") {
	try {
		// Get the highest order_index for this section
		const { data: existingIdeas } = await supabase
			.from("section_ideas")
			.select("order_index")
			.eq("section_id", sectionId)
			.order("order_index", { ascending: false })
			.limit(1);

		const nextOrderIndex =
			existingIdeas && existingIdeas.length > 0
				? existingIdeas[0].order_index + 1
				: 0;

		const { data, error } = await supabase
			.from("section_ideas")
			.insert([{ section_id: sectionId, type, name, content, order_index: nextOrderIndex }])
			.select()
			.single();

		if (error) {
			console.error("Error creating idea:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in createIdea:", error);
		return null;
	}
}

export async function updateIdea(id, updates) {
	try {
		const { data, error } = await supabase
			.from("section_ideas")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating idea:", error);
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error in updateIdea:", error);
		return null;
	}
}

export async function deleteIdea(id) {
	try {
		const { error } = await supabase
			.from("section_ideas")
			.delete()
			.eq("id", id);

		if (error) {
			console.error("Error deleting idea:", error);
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error in deleteIdea:", error);
		return false;
	}
}

export async function reorderIdeas(sectionId, orderedIds) {
	try {
		const updates = orderedIds.map((id, index) =>
			supabase
				.from("section_ideas")
				.update({ order_index: index })
				.eq("id", id)
				.eq("section_id", sectionId),
		);

		await Promise.all(updates);
		return true;
	} catch (error) {
		console.error("Error in reorderIdeas:", error);
		return false;
	}
}
