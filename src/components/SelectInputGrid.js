import React, { useMemo, memo } from "react";
import { mapToSelectOptions } from "../useful";
import OctaveSelector from "./OctaveSelector";
import Select from "./Select";
import ScaleSelector from "./ScaleSelector";

const SelectInputGrid = memo(
	({
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
			const maxEmptyNotes = Math.max(
				0,
				Number.parseInt(inputNumberOfNotes) - 3,
			);
			const emptyNotesOptions = Array.from(
				{ length: maxEmptyNotes + 1 },
				(_, i) => i,
			);
			return mapToSelectOptions(emptyNotesOptions);
		}, [inputNumberOfNotes]);

		return (
			<div className="w-full max-w-4xl mx-auto">
				<div className="p-4">
					<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-8 gap-y-4">
						<div className="space-y-4">
							<div>
								<label className="inline-block min-w-[120px] text-xs font-medium text-pink-300 uppercase tracking-wide mb-1">
									Key:
								</label>
								<Select
									id="key"
									name="key"
									options={keyOptions}
									onChange={handleInputChange}
									selectedValue={inputKey}
									hideLabel={true}
								/>
							</div>

							<div>
								<label className="inline-block min-w-[120px] text-xs font-medium text-pink-300 uppercase tracking-wide mb-1">
									Scale:
								</label>
								<ScaleSelector
									scaleOptions={scaleOptions}
									inputScale={inputScale}
									handleInputChange={handleInputChange}
									notesInScale={notesInScale}
									hideLabel={true}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="inline-block min-w-[120px] text-xs font-medium text-pink-300 uppercase tracking-wide mb-1">
									Notes:
								</label>
								<Select
									id="numberOfNotes"
									name="numberOfNotes"
									options={notesOptions}
									onChange={handleInputChange}
									selectedValue={inputNumberOfNotes}
									hideLabel={true}
								/>
							</div>

							<div>
								<label className="inline-block min-w-[120px] text-xs font-medium text-pink-300 uppercase tracking-wide mb-1">
									Empty Notes:
								</label>
								<Select
									id="emptyNotes"
									name="emptyNotes"
									options={emptyNotesOptions}
									onChange={handleInputChange}
									selectedValue={inputEmptyNotes}
									hideLabel={true}
								/>
							</div>
						</div>

						<div>
							<label className="inline-block min-w-[120px] text-xs font-medium text-pink-300 uppercase tracking-wide mb-1">
								Octaves:
							</label>
							<OctaveSelector
								octaves={inputOctaves}
								setInputState={setInputState}
								hideLabel={true}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
);

export default SelectInputGrid;
