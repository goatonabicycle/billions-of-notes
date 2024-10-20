import React, { useState } from "react";
import NotePlayerContainer from "./smoll-components/NotePlayerContainer";
function SmolVersion() {
	return (
		<div className="container">
			<h2>Smol player</h2>
			<NotePlayerContainer />
		</div>
	);
}

export default SmolVersion;
