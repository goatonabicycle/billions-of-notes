import MidiWriter from "midi-writer-js";

const SaveToMidi = (notes, tempo, key, scale, numberOfNotes) => {
	const track = new MidiWriter.Track();

	track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));
	track.setTempo(tempo);

	notes.forEach((note) => {
		const pitch = note.replace(/[0-9]/g, "");
		let octave = note.replace(/\D/g, "");
		octave = Number.parseInt(octave) - 1; // subtract 1 to match FLStudio's middle C (Big assumptions that this will mostly be used in FLStudio, oof)
		const fullNote = pitch + octave;

		track.addEvent(
			new MidiWriter.NoteEvent({
				pitch: [fullNote],
				duration: "4",
				velocity: 100,
			}),
		);
	});

	const write = new MidiWriter.Writer(track);
	const link = document.createElement("a");
	link.href = write.dataUri();
	link.download = `${numberOfNotes}-notes-in-${key}-${scale}-Billions-of-Notes.mid`;
	link.click();
};

export default SaveToMidi;
