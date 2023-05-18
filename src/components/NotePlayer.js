import * as Tone from "tone";
import { Note } from "tonal";

function NotePlayer({ noteName, duration = "4n" }) {
  const synth = new Tone.Synth().toDestination();

  const playNote = async () => {
    await Tone.start();
    const { freq } = Note.get(noteName);
    synth.triggerAttackRelease(freq, duration);
  };

  playNote();
}

export default NotePlayer;
