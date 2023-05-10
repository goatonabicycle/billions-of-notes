import { Scale } from "tonal";

import logo from "./logo.svg";
import "./App.css";

//h ttps://github.com/tonaljs/tonal

function App() {
  const musicalNotes = [
    "C",
    "C#",
    "Db",
    "D",
    "D#",
    "Eb",
    "E",
    "F",
    "F#",
    "Gb",
    "G",
    "G#",
    "Ab",
    "A",
    "A#",
    "Bb",
    "B",
  ].map((noteName) => ({
    label: noteName,
    value: noteName,
  }));

  // Scales
  let notes = Scale.get("C major").notes; // => ["C", "D", "E", "F", "G", "A", "B"];
  console.log(notes);

  return (
    <div className="App">
      <label htmlFor="noteSelect">Select a Note:</label>
      <select id="noteSelect">
        {musicalNotes.map((note) => (
          <option
            key={note.value}
            value={note.value}>
            {note.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
