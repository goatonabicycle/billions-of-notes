import React, { memo } from "react";

const Select = memo(function Select({
	id,
	name,
	label,
	onChange,
	selectedValue,
	options,
}) {
	return (
		<div className="flex items-center justify-center">
			<div key={id} className="relative flex flex-col gap-2">
				<label
					htmlFor={id}
					className="text-sm font-medium text-pink-300 uppercase tracking-wide"
				>
					{label}
				</label>

				<div className="relative">
					<select
						id={id}
						name={name}
						onChange={onChange}
						value={selectedValue}
						className="appearance-none capitalize w-full py-2 px-4 pr-10
                     bg-pink-950/30 text-pink-100
                     border-2 border-pink-400/50 rounded-lg
                     shadow-[0_0_10px_rgba(236,72,153,0.2)]
                     hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]
                     focus:shadow-[0_0_20px_rgba(236,72,153,0.5)]
                     transition-all duration-300
                     focus:outline-none focus:border-pink-400
                     backdrop-blur-sm
                     cursor-pointer"
					>
						{options.map((option) => (
							<option
								key={option.value}
								value={option.value}
								className="bg-pink-950 text-pink-100 capitalize"
							>
								{option.label}
							</option>
						))}
					</select>

					{/* Custom dropdown arrow */}
					<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
						<svg
							className="w-4 h-4 text-pink-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
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
		</div>
	);
});

export default Select;
