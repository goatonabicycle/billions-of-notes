import React, { useEffect, useRef } from "react";
import "./LineRenderer.css";

const LineRenderer = ({ notes, tempo }) => {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const canvas = canvasRef.current;
      const dot = dotRef.current;
      const ctx = canvas.getContext("2d");
      const elapsedTime = time - previousTimeRef.current;
      const progress = (elapsedTime / ((60 * 1000) / tempo)) % 1;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      let minNote = Infinity;
      let maxNote = -Infinity;

      for (const note of notes) {
        const noteNumber = noteToNumber(note);
        minNote = Math.min(minNote, noteNumber);
        maxNote = Math.max(maxNote, noteNumber);
      }

      const noteRange = maxNote - minNote;
      const linePath = [];

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const noteNumber = noteToNumber(note);

        const y = ((noteNumber - minNote) / noteRange) * canvas.height;
        const x = (i / (notes.length - 1)) * canvas.width;

        linePath.push({ x, y });
      }

      ctx.beginPath();
      ctx.moveTo(linePath[0].x, linePath[0].y);

      for (let i = 1; i < linePath.length; i++) {
        const { x, y } = linePath[i];
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "white";
      ctx.stroke();

      const dotPosition =
        linePath[Math.floor(progress * (linePath.length - 1))];
      const dotX = dotPosition.x;
      const dotY = dotPosition.y;

      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null; // Reset previous time on unmount
    };
  }, [notes]);

  return (
    <div className="line-container">
      <canvas
        ref={canvasRef}
        className="line-canvas"
      />
      <div
        ref={dotRef}
        className="line-dot"
      />
    </div>
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
