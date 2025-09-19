import React, {
	useEffect,
	useRef,
	useState,
	useCallback,
	useMemo,
} from "react";
import * as Tone from "tone";

const ClickFirst = React.memo(({ onClick }) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClick = () => {
		setIsVisible(false);
		onClick();
	};

	if (!isVisible) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-primary-900/95 to-black/95 backdrop-blur-sm"
			onClick={handleClick}
			onKeyUp={handleClick}
			type="button"
		>
			<div className="relative text-center p-8">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-full blur-3xl opacity-20" />
				<div
					className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-500/20 to-transparent"
					style={{
						backgroundImage:
							"linear-gradient(0deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}
				/>
				<div className="relative">
					<h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
						Hello!
					</h1>
					<p className="text-3xl mb-4 font-medium text-primary-200">
						Let's click somewhere to get things going!
					</p>
					<p className="text-sm text-secondary-300">
						(You have to interact with the page to start the sound engine)
					</p>
				</div>
			</div>
		</div>
	);
});

const Loop = ({
	notes,
	bpm,
	isPlaying,
	currentIndex,
	setCurrentIndex,
	volume,
	notePlayLength = 2,
	instrument = "Synth",
	tieTogether,
}) => {
	const [toneStarted, setToneStarted] = useState(false);
	const instrumentRef = useRef(null);
	const partRef = useRef(null);

	const envelopeSettings = useMemo(
		() => ({
			attack: 0.01,
			decay: 0.1,
			sustain: 1,
			release: 10.1,
		}),
		[],
	);

	const createInstrument = useCallback(
		(type) => {
			const options = { envelope: envelopeSettings };

			switch (type) {
				case "DuoSynth":
					return new Tone.DuoSynth({
						voice0: { envelope: envelopeSettings },
						voice1: { envelope: envelopeSettings },
					}).toDestination();
				case "PolySynth":
					return new Tone.PolySynth(Tone.Synth, options).toDestination();
				default: {
					const SynthClass = Tone[type];
					return new SynthClass(options).toDestination();
				}
			}
		},
		[envelopeSettings],
	);

	const setupLoop = useCallback(() => {
		if (partRef.current) {
			partRef.current.dispose();
		}

		const beatDuration = 60 / bpm;
		const fixedDuration = beatDuration * (notePlayLength / 10);

		const part = new Tone.Part(
			(time, { note, index }) => {
				Tone.Draw.schedule(() => {
					setCurrentIndex(index);
				}, time);

				if (!note) return;

				const shouldTie = tieTogether && index > 0 && note === notes[index - 1];

				if (!shouldTie) {
					instrumentRef.current.triggerAttackRelease(note, fixedDuration, time);
				}
			},
			notes.map((note, index) => ({
				time: index * beatDuration,
				note,
				index,
			})),
		);

		part.loop = true;
		part.loopEnd = notes.length * beatDuration;
		partRef.current = part;
	}, [bpm, notePlayLength, notes, tieTogether, setCurrentIndex]);

	const handleOverlayClick = async () => {
		await Tone.start();
		setToneStarted(true);
	};

	useEffect(() => {
		const checkContext = () => {
			if (Tone.context.state === "running") {
				setToneStarted(true);
			}
		};

		checkContext();
		return () => {
			if (instrumentRef.current) {
				instrumentRef.current.dispose();
			}
			if (partRef.current) {
				partRef.current.dispose();
			}
		};
	}, []);

	useEffect(() => {
		if (!toneStarted) return;

		const setup = async () => {
			const newInstrument = createInstrument(instrument);
			const volumeValue =
				volume === 0 ? Number.NEGATIVE_INFINITY : Tone.gainToDb(volume / 100);
			newInstrument.volume.value = volumeValue;

			if (instrumentRef.current) {
				instrumentRef.current.triggerRelease("+0");
				instrumentRef.current.dispose();
			}

			instrumentRef.current = newInstrument;

			if (!partRef.current && isPlaying) {
				setupLoop();
				partRef.current.start(0);
			}
		};

		setup();
	}, [instrument, volume, toneStarted, createInstrument, isPlaying, setupLoop]);

	useEffect(() => {
		if (!toneStarted || !notes?.length) return;

		Tone.Transport.bpm.value = bpm;
		if (partRef.current && notes !== partRef.current.notes) {
			partRef.current.stop();
			partRef.current.dispose();

			if (isPlaying) {
				setupLoop();
				Tone.Transport.stop();
				Tone.Transport.cancel(0);
				Tone.Transport.start();
				partRef.current.start(0);
			}
		} else if (isPlaying && !partRef.current) {
			setupLoop();
			Tone.Transport.start();
			partRef.current.start(0);
		} else if (!isPlaying) {
			if (partRef.current) {
				partRef.current.stop();
			}
			Tone.Transport.stop();
			if (instrumentRef.current) {
				instrumentRef.current.triggerRelease("+0");
			}
		}

		return () => {
			if (partRef.current) {
				partRef.current.dispose();
			}
			if (instrumentRef.current) {
				instrumentRef.current.triggerRelease("+0");
			}
		};
	}, [
		notes,
		bpm,
		isPlaying,
		tieTogether,
		toneStarted,
		setupLoop,
		notePlayLength,
		setCurrentIndex,
	]);

	if (!toneStarted) {
		return <ClickFirst onClick={handleOverlayClick} />;
	}

	return null;
};

export default React.memo(Loop);
