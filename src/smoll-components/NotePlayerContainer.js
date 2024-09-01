import React, { useState } from "react";
import NotePlayer from "./NotePlayer";

import "../Smoll.css";

const Synth1 = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];
const Synth2 = ["F4", "D#4", "C4", "A4", "E4", "B4", "B4", "E5"];
const Synth3 = ["C2", "C2", "C2", "C2", "E3", "E3", "E3", "E3"];

const NotePlayerContainer = () => {
  const [setCurrentNotes] = useState({
    Synth1: null,
    Synth2: null,
    Synth3: null,
  });

  return (
    <div>
      <div
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
        <NotePlayer
          notes={Synth1}
          initialTempo={100}
          instrumentType="AMSynth"
          setCurrentNote={(note) =>
            setCurrentNotes((prev) => ({ ...prev, Synth1: note }))
          }
        />
      </div>

      <div
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
        <NotePlayer
          notes={Synth2}
          initialTempo={200}
          instrumentType="FMSynth"
          setCurrentNote={(note) =>
            setCurrentNotes((prev) => ({ ...prev, Synth2: note }))
          }
        />
      </div>

      <div
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
        <NotePlayer
          notes={Synth3}
          initialTempo={50}
          instrumentType="MonoSynth"
          setCurrentNote={(note) =>
            setCurrentNotes((prev) => ({ ...prev, Synth3: note }))
          }
        />
      </div>
    </div>
  );
};

export default NotePlayerContainer;
