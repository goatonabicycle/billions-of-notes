import { Scale, Mode } from "tonal";
import Select from "./components/Select";

import "./App.css";

// https://github.com/tonaljs/tonal

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

  // This is just a sample.
  let notes = Scale.get("C major").notes;
  let modes = Mode.names();
  console.log(notes);

  return (
    <div className="App">
      <Select
        id="noteSelect"
        label="Select a Note:"
        options={musicalNotes}
      />
    </div>
  );
}

export default App;
