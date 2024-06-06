import MidiWriter from "midi-writer-js";

const SaveToMidi = (notes, tempo) => {
  let track = new MidiWriter.Track();

  track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));
  track.setTempo(tempo);

  notes.forEach((note) => {
    const pitch = note.replace(/[0-9]/g, "");
    let octave = note.replace(/\D/g, "");
    octave = parseInt(octave) - 1; // subtract 1 to match FLStudio's middle C (Big assumptions that this will mostly be used in FLStudio, oof)
    const fullNote = pitch + octave;

    track.addEvent(
      new MidiWriter.NoteEvent({
        pitch: [fullNote],
        duration: "4",
        velocity: 100,
      })
    );
  });

  let write = new MidiWriter.Writer(track);
  let link = document.createElement("a");
  link.href = write.dataUri();
  link.download = "Billions-of-Notes.mid";
  link.click();
};

export default SaveToMidi;
