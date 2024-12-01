import React, { useState } from "react";
import Guitar from "./components/instruments/Guitar";


function Fret() {
	return (
		<>
			<Guitar notesToPlay={["A"]} playbackIndex={0} scaleNotes={["A", "C"]} />
		</ >
	);
}

export default Fret;
