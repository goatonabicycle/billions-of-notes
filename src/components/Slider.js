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
		<div className="relative">
			<label
				htmlFor={id}
				className="text-xs font-medium text-pink-300 uppercase tracking-wide"
			>
				{label}
			</label>

			<div className="relative group mt-1.5">
				<input
					type="text"
					style={{ width: inputWidth }}
					className="w-full px-3 py-1.5 rounded border border-pink-400/30 bg-pink-950/30 backdrop-blur-sm text-pink-100 text-center group-hover:border-pink-400/60 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] focus:outline-none focus:border-pink-400/60 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300"
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

			<div className="relative w-full group mt-1">
				<div className="absolute w-full h-1.5 bg-pink-950/50 rounded-full overflow-hidden top-1/2 -translate-y-1/2">
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
					className="relative w-full h-6 pt-4 appearance-none bg-transparent cursor-pointer focus:outline-none 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-2 
            [&::-webkit-slider-thumb]:h-6 
            [&::-webkit-slider-thumb]:bg-pink-400 
            [&::-webkit-slider-thumb]:border 
            [&::-webkit-slider-thumb]:border-pink-300 
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(236,72,153,0.5)] 
            [&::-webkit-slider-thumb]:hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]
            [&::-webkit-slider-thumb]:transition-shadow 
            [&::-webkit-slider-thumb]:-mt-[9px]
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:w-2 
            [&::-moz-range-thumb]:h-6 
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
