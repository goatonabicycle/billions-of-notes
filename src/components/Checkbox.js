import React from "react";
import Tooltip from "./Tooltip";

const Checkbox = ({
	id,
	name,
	checked,
	onChange,
	label,
	value,
	tooltip,
	className = "",
}) => {
	return (
		<Tooltip text={tooltip}>
			<label className={`flex items-center gap-1.5 cursor-pointer group ${className}`}>
				<div className="relative">
					<input
						type="checkbox"
						id={id}
						name={name}
						value={value}
						checked={checked}
						onChange={onChange}
						className="appearance-none w-4 h-4 border-2 border-primary-400/50 bg-primary-950/30 rounded checked:bg-gradient-to-r checked:from-primary-600 checked:to-secondary-600 focus:outline-none focus:border-primary-400 shadow-glow-sm hover:shadow-glow focus:shadow-glow-lg transition-all duration-300 backdrop-blur-sm"
					/>
					{/* Custom checkmark */}
					<div
						className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${checked ? "opacity-100" : "opacity-0"
							}`}
					>
						<svg
							role="graphics-symbol img"
							className="w-3 h-3 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="3"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>
				{label && (
					<span className="text-sm text-primary-100 group-hover:text-primary-300 transition-colors duration-200 leading-none -mt-0.5">
						{label}
					</span>
				)}
			</label>
		</Tooltip>
	);
};

export default React.memo(Checkbox);