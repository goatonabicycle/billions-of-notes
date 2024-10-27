import React from "react";

const Select = ({
	id,
	name,
	options,
	onChange,
	selectedValue,
	hideLabel,
	label,
}) => {
	return (
		<div className="relative">
			{!hideLabel && (
				<label
					htmlFor={id}
					className="text-xs font-medium text-pink-300 uppercase tracking-wide"
				>
					{label}
				</label>
			)}
			<div className="relative group">
				<select
					id={id}
					name={name}
					value={selectedValue}
					onChange={onChange}
					className="w-full px-3 py-1.5 rounded border border-pink-400/30 bg-pink-950/30 
                   backdrop-blur-sm text-pink-100 
                   group-hover:border-pink-400/60 
                   group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] 
                   transition-all duration-300 appearance-none 
                   focus:outline-none focus:border-pink-400/60 
                   focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]"
				>
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							className="bg-pink-950 text-pink-100"
						>
							{option.label}
						</option>
					))}
				</select>
				<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					<svg
						role="graphics-symbol img"
						className="h-4 w-4 text-pink-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Select;
