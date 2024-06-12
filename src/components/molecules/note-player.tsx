import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store";
import * as Tone from "tone";

interface NotePlayerProps {
  id: string;
  tempo: number;
}

const NotePlayer: React.FC<NotePlayerProps> = ({ id, tempo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { inputStates } = useStore();
  const inputState = inputStates.find((state) => state.id === id);

  const notes = (inputState?.generatedNotes ?? []).map((note) => {
    if (note.note) {
      return `${note.note}${note.octave ?? ""}`;
    } else {
      return null;
    }
  });

  const synthRef = useRef<Tone.Synth | null>(null);
  const sequenceRef = useRef<Tone.Sequence<string | null> | null>(null);

  useEffect(() => {
    const initializeTone = async () => {
      await Tone.start();
      const synth = new Tone.Synth().toDestination();
      synthRef.current = synth;

      const noteDuration = `${60 / tempo}n`;

      const sequence = new Tone.Sequence<string | null>(
        (time, note) => {
          if (note) {
            synth.triggerAttackRelease(note, noteDuration, time);
          }
        },
        notes,
        noteDuration
      ).start(0);

      sequenceRef.current = sequence;
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.start();
    };

    if (isPlaying) {
      initializeTone().catch(console.error);
    } else {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    }

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [isPlaying, notes, tempo]);

  if (!inputState || notes.length === 0) return null;

  return (
    <div>
      <p>Playing notes for input: {id}</p>
      <button
        onClick={() => setIsPlaying(true)}
        className="mt-2 bg-blue-500 text-white px-4 py-2"
      >
        Start Playing
      </button>
      <button
        onClick={() => setIsPlaying(false)}
        className="mt-2 bg-red-500 text-white px-4 py-2"
      >
        Stop Playing
      </button>
    </div>
  );
};

export default NotePlayer;
