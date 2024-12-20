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
		const inputValue = e.target.value;
		setLocalValue(inputValue);

		const numericValue = parseFloat(inputValue);
		if (!Number.isNaN(numericValue) && numericValue >= min && numericValue <= max) {
			onChange({
				target: {
					name: name,
					value: numericValue
				}
			});
		}
	};

	const handleInputBlur = () => {
		const numericValue = parseFloat(localValue);
		if (Number.isNaN(numericValue) || numericValue < min || numericValue > max) {
			setLocalValue(value);
		}
	};

	return (
		<div className="w-full md:w-36">
			<div className="flex items-center gap-2">
				<label htmlFor={id} className="block text-xs text-pink-300 uppercase mb-1">
					{label}
				</label>
				<input
					type="text"
					style={{ width: inputWidth }}
					className="w-full text-xs h-5 rounded border border-pink-400/30 bg-pink-950/30 text-pink-100 text-center"
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

			<div className="relative w-full px-3 py-1.5 rounded border border-pink-400/30 bg-pink-950/30">
				<div className="absolute left-0 right-0 h-1 bg-pink-950/50 rounded-full overflow-hidden mx-3 top-1/2 -translate-y-1/2">
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
					className="relative w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-pink-400 [&::-moz-range-thumb]:appearance-none"
				/>
			</div>
		</div>
	);
};

export default React.memo(Slider);