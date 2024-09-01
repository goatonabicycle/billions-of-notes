import { useState, useEffect } from "react";
import Soundfont from "soundfont-player";

export const useAudioPlayer = (instrumentName) => {
  const [audioContext] = useState(() => new AudioContext());
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Soundfont.instrument(audioContext, instrumentName, { gain: 1 })
      .then((instrument) => {
        if (currentInstrument) {
          currentInstrument.stop();
        }

        setCurrentInstrument(instrument);
        setIsLoading(false);
      })
      .catch(setError);

    return () => {
      if (currentInstrument) {
        currentInstrument.stop();
      }
    };
  }, [audioContext, instrumentName]);

  return { currentInstrument, isLoading, error };
};
