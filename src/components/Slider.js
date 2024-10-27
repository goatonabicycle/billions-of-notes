import React, { useRef, useEffect, useState } from "react";

const Slider = ({
	id,
	min,
	max,
	step,
	value,
	onChange,
	label,
	editable = true,
	name,
}) => {
	const mirrorRef = useRef(null);
	const [inputWidth, setInputWidth] = useState("0px");
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
		if (mirrorRef.current) {
			setInputWidth(`${mirrorRef.current.offsetWidth + 40}px`);
		}
	}, [value]);

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		const numValue = Number(newValue);
		if (!Number.isNaN(numValue) && numValue >= min && numValue <= max) {
			onChange(e);
		}
	};

	const handleInputBlur = () => {
		const numValue = Number(localValue);
		if (Number.isNaN(numValue) || numValue < min || numValue > max) {
			setLocalValue(value);
		}
	};

	return (
		<div className="flex flex-col w-40 m-6">
			<div className="flex items-center justify-center gap-2">
				<label
					htmlFor={id}
					className="text-xs font-medium text-pink-300 uppercase tracking-wide whitespace-nowrap"
				>
					{label}
				</label>
				<div className="relative">
					<input
						type="text"
						style={{ width: inputWidth }}
						className="bg-pink-950/30 border border-pink-400/50 rounded 
                     px-1.5 py-0.5 text-pink-100 text-center text-sm
                     focus:outline-none focus:border-pink-400
                     shadow-[0_0_10px_rgba(236,72,153,0.2)]
                     hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                     focus:shadow-[0_0_20px_rgba(236,72,153,0.4)]
                     transition-all duration-300 backdrop-blur-sm"
						disabled={!editable}
						value={localValue}
						onChange={handleInputChange}
						onBlur={handleInputBlur}
					/>
					<div
						ref={mirrorRef}
						className="absolute opacity-0 pointer-events-none whitespace-nowrap"
						aria-hidden="true"
					>
						{localValue}
					</div>
				</div>
			</div>

			<div className="relative w-full group">
				<div className="absolute w-full h-1 bg-pink-950/50 rounded-full overflow-hidden top-1/2 -translate-y-1/2">
					<div
						className="h-full bg-gradient-to-r from-pink-600 to-purple-600"
						style={{
							width: `${((Number(value) - min) / (max - min)) * 100}%`,
						}}
					/>
				</div>

				<input
					type="range"
					id={id}
					name={name}
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					className="relative w-full h-4 appearance-none bg-transparent cursor-pointer
                   focus:outline-none
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-0.5
                   [&::-webkit-slider-thumb]:h-3
                   [&::-webkit-slider-thumb]:bg-pink-400
                   [&::-webkit-slider-thumb]:border
                   [&::-webkit-slider-thumb]:border-pink-300
                   [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(236,72,153,0.5)]
                   [&::-webkit-slider-thumb]:hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]
                   [&::-webkit-slider-thumb]:transition-shadow
                   [&::-webkit-slider-thumb]:-mt-[4px]
                   [&::-moz-range-thumb]:appearance-none
                   [&::-moz-range-thumb]:w-0.5
                   [&::-moz-range-thumb]:h-3
                   [&::-moz-range-thumb]:bg-pink-400
                   [&::-moz-range-thumb]:border
                   [&::-moz-range-thumb]:border-pink-300
                   [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(236,72,153,0.5)]
                   [&::-moz-range-thumb]:hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]
                   [&::-moz-range-thumb]:transition-shadow"
				/>
			</div>
		</div>
	);
};

export default React.memo(Slider);
