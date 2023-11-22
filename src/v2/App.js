// App.js (Main Component)
import React, { useState } from "react";
import { INSTRUMENTS, NOTES, DEFAULT_TEMPO, DEFAULT_VOLUME } from "./constants";
import { InstrumentPlayer } from "./components/InstrumentPlayer"; // Assume this is a new component you created
import { InstrumentSelector } from "./components/InstrumentSelector";
import { useAudioPlayer } from "./useAudioPlayer";

const V2App = () => {
  const [instrumentName, setInstrumentName] = useState(INSTRUMENTS[0].value);
  const { currentInstrument, isLoading, error } =
    useAudioPlayer(instrumentName);

  if (error) {
    return <div>Error loading instrument: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InstrumentPlayer
        instrumentName={instrumentName}
        currentInstrument={currentInstrument}
        notes={NOTES}
        defaultTempo={DEFAULT_TEMPO}
        defaultVolume={DEFAULT_VOLUME}
      />
      <InstrumentSelector
        instruments={INSTRUMENTS}
        selected={instrumentName}
        onSelect={setInstrumentName}
      />
    </div>
  );
};

export default V2App;
