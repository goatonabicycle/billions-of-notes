import React from "react";
import Tooltip from "./Tooltip";

const Button = ({ icon, onClick, text, tooltip }) => {
	return (
		<Tooltip text={tooltip}>
			<button
				onClick={onClick}
				type="button"
				className="group relative w-full min-w-[100px] h-9 px-3
					bg-primary-950/30 backdrop-blur-sm
					border border-primary-400/30
					text-primary-100 text-xs font-medium
					rounded-lg
					transition-all duration-300 ease-in-out
					hover:border-primary-400/60
					hover:shadow-glow
					active:scale-95
					focus:outline-none"
			>
				<div
					className="absolute inset-0 rounded bg-gradient-to-r 
					from-primary-600/20 to-secondary-600/20
					group-hover:from-primary-600/40 group-hover:to-secondary-600/40
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

				<div
					className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 
					bg-gradient-to-r from-primary-500 to-secondary-500
					w-0 group-hover:w-full transition-all duration-300"
				/>
			</button>
		</Tooltip>
	);
};

export default React.memo(Button);
