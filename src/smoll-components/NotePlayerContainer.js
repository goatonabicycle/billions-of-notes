import React from "react";
import NotePlayer from "./NotePlayer";
import "./NotePlayer.css";
import "../Range.css";

const Synth1 = ["C3", "D4", "E4", "F3", "G4", "A3", "B3", "C4"];
const Synth2 = [
  "F4",
  "D4",
  "C4",
  "A4",
  "E4",
  "B4",
  "B4",
  "E5",
  "D4",
  "A4",
  "G4",
  "F4",
  "A4",
  "B4",
  "C4",
  "A5",
];
const Synth3 = ["C1", "C1", "C1", "C1", "E1", "E1", "E1", "E1"];

const NotePlayerContainer = () => {
  return (
    <div className="smol">
      <NotePlayer
        notes={Synth3}
        initialTempo={150}
        initialVolume={20}
        instrumentType="Synth"
      />
      {/* <NotePlayer
        notes={Synth1}
        initialTempo={400}
        instrumentType="FMSynth"
      />
      <NotePlayer
        notes={Synth2}
        initialTempo={200}
        instrumentType="AMSynth"
      /> */}
    </div>
  );
};

export default NotePlayerContainer;
