import React, { useEffect, useRef } from "react";
import "./LineRenderer.css";
import { KEYS } from "../useful";

const LINE_COLOR = "white";
const DOT_COLOR = "#794bc4";
const DOT_RADIUS = 0;

const getNoteNumber = (note) => {
  const octave = parseInt(note.slice(-1)) + 1;
  const noteName = note.slice(0, -1);
  return octave * 12 + KEYS.indexOf(noteName);
};

const LineRenderer = ({ notes, tempo }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const renderNotesOnCanvas = (time) => {
    if (previousTimeRef.current !== undefined) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const noteNumbers = notes.map((note) => getNoteNumber(note));
      const minNote = Math.min(...noteNumbers);
      const maxNote = Math.max(...noteNumbers);
      const noteRange = maxNote - minNote;

      const linePath = noteNumbers.map((noteNumber, i) => {
        const y = ((noteNumber - minNote) / noteRange) * canvas.height; // Adding the plus 4 to not cut off the dots
        const x = (i / (notes.length - 1)) * canvas.width;
        return { x, y };
      });

      ctx.beginPath();
      ctx.moveTo(linePath[0].x, linePath[0].y);

      for (let i = 1; i < linePath.length; i++) {
        const currentPoint = linePath[i];
        ctx.lineTo(currentPoint.x, currentPoint.y);

        if (i < linePath.length - 1) {
          ctx.arc(currentPoint.x, currentPoint.y, DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = DOT_COLOR;
          ctx.fill();
        }
      }

      ctx.strokeStyle = LINE_COLOR;
      ctx.stroke();
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(renderNotesOnCanvas);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(renderNotesOnCanvas);
    return () => {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    };
  }, [notes]);

  return (
    <div className="line-container">
      <canvas
        ref={canvasRef}
        className="line-canvas"
      />
    </div>
  );
};

export default LineRenderer;
