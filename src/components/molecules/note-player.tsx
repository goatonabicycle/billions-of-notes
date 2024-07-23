import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store";
import useCurrentNoteStore from "../../currentNoteStore";
import * as Tone from "tone";

interface NotePlayerProps {
  id: string;
  tempo: number;
}

const NotePlayer: React.FC<NotePlayerProps> = ({ id, tempo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { inputStates } = useStore((state) => ({
    inputStates: state.inputStates,
  }));
  const { setCurrentNote } = useCurrentNoteStore();

  const inputState = inputStates.find((state) => state.id === id);

  const notes = (inputState?.generatedNotes ?? []).map((note) =>
    note.note ? `${note.note}${note.octave ?? ""}` : null
  );

  const synthRef = useRef<Tone.Synth | null>(null);
  const sequenceRef = useRef<Tone.Sequence<string | null> | null>(null);

  const initializeTone = async () => {
    await Tone.start();
    synthRef.current = new Tone.Synth().toDestination();
    const noteDuration = `${60 / tempo}n`;

    sequenceRef.current = new Tone.Sequence<string | null>(
      (time, note) => {
        if (note) {
          synthRef.current?.triggerAttackRelease(note, noteDuration, time);
          setCurrentNote(id, note);
        }
      },
      notes,
      noteDuration
    ).start(0);

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.start();
  };

  useEffect(() => {
    if (isPlaying) {
      initializeTone().catch(console.error);
    } else {
      sequenceRef.current?.stop().dispose();
      synthRef.current?.dispose();
      Tone.Transport.stop().cancel();
      setCurrentNote(id, null);
    }

    return () => {
      sequenceRef.current?.stop().dispose();
      synthRef.current?.dispose();
      Tone.Transport.stop().cancel();
      setCurrentNote(id, null);
    };
  }, [isPlaying, tempo]);

  if (!inputState || notes.length === 0) return null;

  return (
    <div>
      <p>Playing notes for input: {id}</p>
      <button onClick={() => setIsPlaying(!isPlaying)} className="mt-2 bg-blue-500 text-white px-4 py-2">
        {isPlaying ? "Stop" : "Start"} Playing
      </button>
    </div>
  );
};

export default NotePlayer;
