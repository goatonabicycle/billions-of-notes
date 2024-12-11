import React, { useMemo, memo } from "react";
import { mapToSelectOptions } from "../useful";
import OctaveSelector from "./OctaveSelector";
import Select from "./Select";
import ScaleSelector from "./ScaleSelector";

const SelectInputGrid = memo(({
	KEYS,
	scales,
	notesInScale,
	inputKey,
	inputScale,
	inputNumberOfNotes,
	inputEmptyNotes,
	inputOctaves,
	setInputState,
	handleInputChange,
}) => {
	const keyOptions = useMemo(() => mapToSelectOptions(KEYS), [KEYS]);
	const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);
	const notesOptions = useMemo(() => {
		const notes = Array.from({ length: 50 }, (_, i) => i + 1);
		return mapToSelectOptions(notes);
	}, []);
	const emptyNotesOptions = useMemo(() => {
		const maxEmptyNotes = Math.max(0, Number.parseInt(inputNumberOfNotes) - 3);
		const emptyNotesOptions = Array.from({ length: maxEmptyNotes + 1 }, (_, i) => i);
		return mapToSelectOptions(emptyNotesOptions);
	}, [inputNumberOfNotes]);

	return (
		<div className="w-full max-w-4xl space-y-4">
			<div className="flex gap-6">
				<Select
					id="key"
					name="key"
					label="Key"
					options={keyOptions}
					onChange={handleInputChange}
					selectedValue={inputKey}
				/>


				<ScaleSelector
					scaleOptions={scaleOptions}
					inputScale={inputScale}
					handleInputChange={handleInputChange}
					notesInScale={notesInScale}
				/>


				<Select
					id="numberOfNotes"
					name="numberOfNotes"
					label="Notes"
					options={notesOptions}
					onChange={handleInputChange}
					selectedValue={inputNumberOfNotes}
				/>

				<Select
					id="emptyNotes"
					name="emptyNotes"
					label="Empty"
					options={emptyNotesOptions}
					onChange={handleInputChange}
					selectedValue={inputEmptyNotes}
				/>

				<div>
					<div className="block text-xs font-medium text-pink-300 uppercase ">
						Octaves
					</div>
					<OctaveSelector
						octaves={inputOctaves}
						setInputState={setInputState}
						hideLabel={true}
					/>
				</div>
			</div>
		</div>
	);
});

export default SelectInputGrid;