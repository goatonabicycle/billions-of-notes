import React from "react";

const NotesInScale = ({ notesInScale }) => {
	return (
		<div className="flex flex-col items-center gap-2 m-4">
			<div className="text-xs font-medium text-pink-300 uppercase tracking-wide">
				Notes in this scale
			</div>
			<div className="flex flex-wrap justify-center items-center gap-1">
				{notesInScale.map((note, i) => (
					<div key={i} className="relative group">
						<div
							className="absolute inset-0 rounded bg-gradient-to-r from-pink-600/20 to-purple-600/20 
                          group-hover:from-pink-600/40 group-hover:to-purple-600/40
                          blur-sm transition-all duration-300 -z-10"
						/>

						<div
							className="px-3 py-1.5 rounded
                          border border-pink-400/30 
                          bg-pink-950/30 backdrop-blur-sm
                          group-hover:border-pink-400/60
                          group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                          transition-all duration-300"
						>
							<span className="text-pink-100 font-medium tracking-wider">
								{note || ""}
							</span>

							<div
								className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5
                            bg-gradient-to-r from-pink-500 to-purple-500
                            group-hover:w-full
                            transition-all duration-300"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default React.memo(NotesInScale);
