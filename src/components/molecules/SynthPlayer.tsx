import React from "react";
import { Song, Track, Instrument, StepType } from "reactronica";

interface SynthPlayerProps {
  notes: StepType[];
  tempo: number;
  isPlaying: boolean;
}

const SynthPlayer: React.FC<SynthPlayerProps> = ({
  notes,
  tempo,
  isPlaying,
}) => {
  return (
    <Song isPlaying={isPlaying} bpm={tempo}>
      <Track steps={notes}>
        <Instrument type="synth" />
      </Track>
    </Song>
  );
};

export default SynthPlayer;
