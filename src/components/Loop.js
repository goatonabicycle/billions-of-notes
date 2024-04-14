import React, { useEffect, useRef, useMemo } from "react";
import ClickFirst from "./ClickFirst";

function calculateInterval(bpm) {
  return 60000 / bpm;
}

const LoopComponent = ({
  notes,
  bpm,
  isPlaying,
  currentIndex,
  setCurrentIndex,
  volume,
  notePlayLength,
  playableInstrument,
  tieTogether,
}) => {
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
  }, []);

  useEffect(() => {
    if (playableInstrument && volume !== undefined) {
      playableInstrument.out.gain.value = Math.round(volume / 10);
    }
  }, [volume, playableInstrument]);

  useEffect(() => {
    if (!isPlaying) return;
    if (
      audioContextRef.current &&
      audioContextRef.current.state === "running"
    ) {
      if (tieTogether && notes[currentIndex] === notes[currentIndex - 1]) {
        return;
      }
      if (playableInstrument) {
        playableInstrument.play(
          notes[currentIndex],
          playableInstrument.currentTime,
          { duration: notePlayLength / 10 }
        );
      }
    }
  }, [
    isPlaying,
    notePlayLength,
    playableInstrument,
    currentIndex,
    notes,
    tieTogether,
  ]);

  useEffect(() => {
    let animationFrameId;

    function animateNotes(startTime) {
      const interval = calculateInterval(bpm);
      let lastNoteTime = startTime;
      let expectedTime = startTime + interval;

      function playNotes(timestamp) {
        if (!isPlaying) return;

        const elapsedTime = timestamp - lastNoteTime;
        if (elapsedTime > interval) {
          const drift = timestamp - expectedTime;
          if (elapsedTime > interval * 2) {
            lastNoteTime = timestamp;
            expectedTime = timestamp + interval;
          } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
            lastNoteTime = timestamp - drift;
            expectedTime += interval;
          }
        }
        animationFrameId = requestAnimationFrame(playNotes);
      }

      animationFrameId = requestAnimationFrame(playNotes);
    }

    animateNotes(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, bpm, notes.length, setCurrentIndex]);

  if (!audioContextRef.current || audioContextRef.current.state !== "running") {
    return (
      <ClickFirst
        onClick={() =>
          audioContextRef.current && audioContextRef.current.resume()
        }
      />
    );
  } else {
    return null;
  }
};

export default LoopComponent;
