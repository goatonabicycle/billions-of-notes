import React from "react";
import Tooltip from "./Tooltip";

const Select = ({
	id,
	name,
	options,
	onChange,
	selectedValue,
	hideLabel,
	label,
	width = "w-16",
	tooltip,
}) => {
	return (
		<Tooltip text={tooltip}>
			<div className={width}>
				{!hideLabel && (
					<label
						htmlFor={id}
						className="block text-xs font-medium text-primary-300 uppercase mb-1"
					>
						{label}
					</label>
				)}
				<div className="relative">
					<select
						id={id}
						name={name}
						value={selectedValue}
						onChange={onChange}
						className="w-full px-3 py-1.5 rounded border border-primary-400/30 bg-primary-950/30 text-primary-100 appearance-none"
					>
						{options.map((option) => (
							<option
								key={option.value}
								value={option.value}
								className="bg-primary-950 text-primary-100"
							>
								{option.label}
							</option>
						))}
					</select>
					<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
						<svg
							role="graphics-symbol img"
							className="h-4 w-4 text-primary-300"
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
		</Tooltip>
	);
};

export default Select;