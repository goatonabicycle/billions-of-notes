import React, { useState } from "react";
import Guitar from "./components/Guitar";
import { Midi } from "@tonejs/midi";

function ShowMe() {
  const [midiFile, setMidiFile] = useState(null);
  const [notes, setNotes] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMidiFile(file);
      readMidiFile(file);
    }
  };

  const readMidiFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      parseMidi(data);
    };
    reader.readAsArrayBuffer(file);
  };

  const parseMidi = (data) => {
    const midi = new Midi(data);
    const notes = midi.tracks.flatMap((track) =>
      track.notes.map((note) => `${note.name}${note.octave}`)
    );
    setNotes(notes);
  };

  return (
    <>
      <h1>Show Me Page</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".midi,.mid"
      />
      <div>
        <strong>Notes:</strong>
        {notes.map((note, index) => (
          <div key={index}>{note}</div>
        ))}
      </div>
      <Guitar
        playbackIndex={0}
        notesToPlay={notes}
        scaleNotes={[]}
      />
    </>
  );
}

export default ShowMe;
