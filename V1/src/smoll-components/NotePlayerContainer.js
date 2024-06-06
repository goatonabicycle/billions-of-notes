import React, { useState } from "react";
import NotePlayer from "./NotePlayer";
import Knob from "./Knob";
import "../Smoll.css";

const amSynthNotes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];
const fmSynthNotes = ["F4", "D#4", "C4", "A4", "E4", "B4", "B4", "E5"];

const NotePlayerContainer = () => {
  const [tempo, setTempo] = useState(100);
  const [currentNotes, setCurrentNotes] = useState({
    AMSynth: null,
    FMSynth: null,
  });
  const [volume, setVolume] = useState(50);

  return (
    <div>
      <div
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
      >
        <div>AMSynth: {currentNotes.AMSynth || "None"}</div>
        <NotePlayer
          notes={amSynthNotes}
          tempo={tempo}
          instrumentType="AMSynth"
          volume={volume / 100}
          setCurrentNote={(note) =>
            setCurrentNotes((prev) => ({ ...prev, AMSynth: note }))
          }
        />
      </div>
      <div
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
      >
        <div>FMSynth: {currentNotes.FMSynth || "None"}</div>
        <NotePlayer
          notes={fmSynthNotes}
          tempo={tempo}
          instrumentType="FMSynth"
          volume={volume / 100}
          setCurrentNote={(note) =>
            setCurrentNotes((prev) => ({ ...prev, FMSynth: note }))
          }
        />
      </div>
      <label>
        Tempo:
        <input
          type="number"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
        />
      </label>
      <div>
        <label>Volume: {volume}</label>
        <Knob initialValue={volume} onChange={setVolume} />
      </div>
    </div>
  );
};

export default NotePlayerContainer;
