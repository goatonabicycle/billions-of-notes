import React, { useEffect, useRef } from "react";
import "./LineRenderer.css";
import { KEYS } from "../useful";

const FILL_COLOUR = "rgba(121, 75, 196, 0.5)";
const DOT_RADIUS = 5;
const EDGE_DOT_RADIUS = 0;
const ANIMATION_DOT_COLOUR = "white";
const LINE_COLOUR = "white";
const SECONDARY_LINE_COLOUR = "rgba(121, 75, 196, 0.2)";

const getNoteNumber = (note) => {
  if (note === "") return null;

  const octave = parseInt(note.slice(-1)) + 1;
  const noteName = note.slice(0, -1);
  return octave * 12 + KEYS.indexOf(noteName);
};

const LineRenderer = ({ notes, onClick, activeNote }) => {
  const canvasRef = useRef(null);

  const calculateLinePath = () => {
    const noteNumbers = notes.map(getNoteNumber);
    const validNoteNumbers = noteNumbers.filter((note) => note !== null);

    const minNote = Math.min(...validNoteNumbers);
    const maxNote = Math.max(...validNoteNumbers);
    const noteRange = maxNote - minNote;
    const canvas = canvasRef.current;

    return noteNumbers.map((noteNumber, i) => ({
      x:
        (i / (notes.length - 1)) * (canvas.width - 2 * DOT_RADIUS) + DOT_RADIUS,
      y:
        noteNumber !== null
          ? ((noteNumber - minNote) / noteRange) *
              (canvas.height - 2 * DOT_RADIUS) +
            DOT_RADIUS
          : null,
    }));
  };

  const drawLine = (linePath, ctx) => {
    ctx.beginPath();
    linePath.forEach((point, i) => {
      if (point.y !== null) {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);

        ctx.arc(point.x, point.y, EDGE_DOT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_COLOUR;
        ctx.fill();
      }
    });

    // Go back to the first point
    if (linePath.filter((point) => point.y !== null).length <= 6)
      ctx.lineTo(linePath[0].x, linePath[0].y);
    ctx.strokeStyle = LINE_COLOUR;
    ctx.stroke();
  };

  const drawSecondaryLines = (linePath, ctx) => {
    ctx.strokeStyle = SECONDARY_LINE_COLOUR;
    const validPoints = linePath.filter((point) => point.y !== null);
    validPoints.slice(1).forEach((point) => {
      ctx.beginPath();
      ctx.moveTo(validPoints[0].x, validPoints[0].y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    });
  };

  const drawAnimationDot = (dotPosition, ctx) => {
    if (dotPosition && dotPosition.y !== null) {
      ctx.beginPath();
      ctx.arc(dotPosition.x, dotPosition.y, DOT_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = ANIMATION_DOT_COLOUR;
      ctx.fill();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const linePath = calculateLinePath();
    if (linePath.length > 0) {
      drawLine(linePath, ctx);
      drawSecondaryLines(linePath, ctx);
      drawAnimationDot(linePath[activeNote], ctx);
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, [notes, activeNote]);
  return (
    <div
      onClick={onClick}
      className="line-container">
      <canvas
        ref={canvasRef}
        className="line-canvas"
      />
    </div>
  );
};

export default LineRenderer;
