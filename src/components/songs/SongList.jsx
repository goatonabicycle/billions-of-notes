import React from "react";
import { FiMusic, FiTrash2 } from "react-icons/fi";

function SongList({ songs, selectedSongId, onSelect, onDelete }) {
	if (songs.length === 0) {
		return (
			<div className="text-primary-400 text-xs text-center py-4">
				No songs yet
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0.5">
			{songs.map((song) => (
				<div
					key={song.id}
					className={`group flex items-center gap-1.5 px-2 py-1.5 rounded cursor-pointer transition-all duration-200
						${
							selectedSongId === song.id
								? "bg-primary-600/30 border border-primary-500/50"
								: "hover:bg-primary-900/30 border border-transparent"
						}`}
					onClick={() => onSelect(song.id)}
					onKeyDown={(e) => e.key === "Enter" && onSelect(song.id)}
					role="button"
					tabIndex={0}
				>
					<FiMusic
						size={10}
						className={`flex-shrink-0 ${
							selectedSongId === song.id
								? "text-primary-400"
								: "text-primary-600"
						}`}
					/>
					<span
						className={`flex-grow text-xs truncate ${
							selectedSongId === song.id
								? "text-primary-100"
								: "text-primary-300"
						}`}
					>
						{song.name}
					</span>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onDelete(song.id);
						}}
						className="opacity-0 group-hover:opacity-100 p-0.5 text-primary-500 hover:text-red-400 transition-all duration-200"
						title="Delete song"
					>
						<FiTrash2 size={10} />
					</button>
				</div>
			))}
		</div>
	);
}

export default React.memo(SongList);
