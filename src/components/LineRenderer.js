import React, {
	useEffect,
	useRef,
	useMemo,
	useCallback,
	useState,
} from "react";
import "./LineRenderer.css";
import { KEYS } from "../useful";

const DOT_RADIUS = 5;
const EDGE_DOT_RADIUS = 0;
const ANIMATION_DOT_COLOUR = "white";
const LINE_COLOUR = "#666666";
const SECONDARY_LINE_COLOUR = "rgba(255, 255, 255, 0.2)";
const TRAIL_LENGTH = 4;

const getNoteNumber = (note) => {
	if (note === "") return null;
	const octave = Number.parseInt(note.slice(-1)) + 1;
	const noteName = note.slice(0, -1);
	return octave * 12 + KEYS.indexOf(noteName);
};

const LineRenderer = ({
	notes,
	onClick,
	activeNote,
	colour,
	animationsEnabled = true,
}) => {
	const canvasRef = useRef(null);
	const [trail, setTrail] = useState([]);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	const linePath = useMemo(() => {
		if (canvasSize.width === 0 || canvasSize.height === 0) return [];

		const noteNumbers = notes.map(getNoteNumber);
		const validNoteNumbers = noteNumbers.filter((note) => note !== null);

		if (validNoteNumbers.length === 0) return [];

		const minNote = Math.min(...validNoteNumbers);
		const maxNote = Math.max(...validNoteNumbers);
		const noteRange = maxNote - minNote || 1; // Avoid division by zero

		return noteNumbers.map((noteNumber, i) => ({
			x:
				(i / Math.max(notes.length - 1, 1)) *
					(canvasSize.width - 2 * DOT_RADIUS) +
				DOT_RADIUS,
			y:
				noteNumber !== null
					? ((noteNumber - minNote) / noteRange) *
							(canvasSize.height - 2 * DOT_RADIUS) +
						DOT_RADIUS
					: null,
		}));
	}, [notes, canvasSize]);

	const drawLine = useCallback(
		(linePath, ctx) => {
			ctx.beginPath();
			linePath.forEach((point, i) => {
				if (point.y !== null) {
					if (i === 0) ctx.moveTo(point.x, point.y);
					else ctx.lineTo(point.x, point.y);

					ctx.arc(point.x, point.y, EDGE_DOT_RADIUS, 0, 2 * Math.PI);
					ctx.fillStyle = colour;
					ctx.fill();
				}
			});

			if (linePath.filter((point) => point.y !== null).length <= 6)
				ctx.lineTo(linePath[0].x, linePath[0].y);
			ctx.strokeStyle = LINE_COLOUR;
			ctx.stroke();
		},
		[colour],
	);

	const drawSecondaryLines = useCallback((linePath, ctx) => {
		ctx.strokeStyle = SECONDARY_LINE_COLOUR;
		const validPoints = linePath.filter((point) => point.y !== null);
		for (const point of validPoints.slice(1)) {
			ctx.beginPath();
			ctx.moveTo(validPoints[0].x, validPoints[0].y);
			ctx.lineTo(point.x, point.y);
			ctx.stroke();
		}
	}, []);

	const drawAnimationDot = useCallback((dotPosition, ctx) => {
		if (dotPosition && dotPosition.y !== null) {
			ctx.beginPath();
			ctx.arc(dotPosition.x, dotPosition.y, DOT_RADIUS, 0, 2 * Math.PI);
			ctx.fillStyle = ANIMATION_DOT_COLOUR;
			ctx.fill();
		}
	}, []);

	const drawTrail = useCallback(
		(ctx) => {
			if (!animationsEnabled || trail.length < 2) return;

			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.strokeStyle = "white";

			ctx.beginPath();
			for (let i = 1; i < trail.length; i++) {
				if (i === 1) {
					ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
				}
				ctx.lineTo(trail[i].x, trail[i].y);
			}
			ctx.stroke();
		},
		[trail, animationsEnabled],
	);

	useEffect(() => {
		if (!animationsEnabled) return;

		const currentPoint = linePath[activeNote];
		if (currentPoint && currentPoint.y !== null) {
			setTrail((prev) => {
				const newTrail = [...prev, { x: currentPoint.x, y: currentPoint.y }];
				return newTrail.slice(-TRAIL_LENGTH);
			});
		}
	}, [activeNote, linePath, animationsEnabled]);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (linePath.length > 0) {
			drawSecondaryLines(linePath, ctx);
			drawLine(linePath, ctx);
			drawTrail(ctx);
			drawAnimationDot(linePath[activeNote], ctx);
		}
	}, [
		linePath,
		activeNote,
		drawLine,
		drawSecondaryLines,
		drawAnimationDot,
		drawTrail,
	]);

	useEffect(() => {
		draw();
	}, [draw]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		const ctx = canvas.getContext("2d");
		ctx.scale(dpr, dpr);

		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		setCanvasSize({ width: canvas.width, height: canvas.height });
	}, []);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			onClick();
		}
	};

	return (
		<div
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			className="line-container"
		>
			<canvas ref={canvasRef} className="line-canvas" />
		</div>
	);
};

export default React.memo(LineRenderer);
