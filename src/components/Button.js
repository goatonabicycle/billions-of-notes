import React from "react";
import Tooltip from "./Tooltip";

const Button = ({ icon, onClick, text, tooltip }) => {
	return (
		<Tooltip text={tooltip}>
			<button
				onClick={onClick}
				type="button"
				className="group relative w-full min-w-[100px] h-9 px-3
					bg-pink-950/30 backdrop-blur-sm
					border border-pink-400/30
					text-pink-100 text-xs font-medium
					rounded-lg
					transition-all duration-300 ease-in-out
					hover:border-pink-400/60
					hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
					active:scale-95
					focus:outline-none"
			>
				<div className="absolute inset-0 rounded bg-gradient-to-r 
					from-pink-600/20 to-purple-600/20
					group-hover:from-pink-600/40 group-hover:to-purple-600/40
					blur-sm transition-all duration-300 -z-10"
				/>

				<div className="flex items-center justify-center gap-1.5">
					{icon && (
						<span className="transform transition-all duration-300">
							{icon}
						</span>
					)}
					{text && (
						<span className="transform transition-all duration-300">
							{text}
						</span>
					)}
				</div>

				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 
					bg-gradient-to-r from-pink-500 to-purple-500
					w-0 group-hover:w-full transition-all duration-300"
				/>
			</button>
		</Tooltip>
	);
};

export default React.memo(Button);