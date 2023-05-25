import React, { useEffect, useRef } from "react";

const LineRenderer = ({ notes, tempo }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      let minNote = Infinity;
      let maxNote = -Infinity;

      for (const note of notes) {
        const noteNumber = noteToNumber(note);
        minNote = Math.min(minNote, noteNumber);
        maxNote = Math.max(maxNote, noteNumber);
      }

      const noteRange = maxNote - minNote;

      ctx.beginPath();

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const noteNumber = noteToNumber(note);

        const y = ((noteNumber - minNote) / noteRange) * canvas.height;
        const x = (i / (notes.length - 1)) * canvas.width;

        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "white";
      ctx.stroke();
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [notes]);

  return (
    <canvas
      ref={canvasRef}
      className="line-canvas"
    />
  );
};

export default LineRenderer;

function noteToNumber(note) {
  const scale = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octave = parseInt(note.slice(-1)) + 1;
  const noteName = note.slice(0, -1);
  return octave * 12 + scale.indexOf(noteName);
}
