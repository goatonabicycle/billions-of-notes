import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const ClickFirst = ({ onClick }) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClick = () => {
		setIsVisible(false);
		onClick();
	};

	if (!isVisible) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-purple-900/95 to-black/95 backdrop-blur-sm"
			onClick={handleClick}
			onKeyUp={handleClick}
			role="button"
			tabIndex={0}
		>
			<div className="relative text-center p-8">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20" />

				<div
					className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-fuchsia-500/20 to-transparent"
					style={{
						backgroundImage: `linear-gradient(0deg, rgba(255,0,255,0.2) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255,0,255,0.2) 1px, transparent 1px)`,
						backgroundSize: "20px 20px",
					}}
				/>

				<div className="relative">
					<h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
						Hello!
					</h1>

					<p className="text-3xl mb-4 font-medium text-purple-200">
						Let's click somewhere to get things going!
					</p>

					<p className="text-sm text-cyan-300">
						(You have to interact with the page to start the sound engine)
					</p>
				</div>
			</div>
		</div>
	);
};

const Loop = ({
	notes,
	bpm,
	isPlaying,
	currentIndex,
	setCurrentIndex,
	volume,
	notePlayLength,
	instrument = "Synth",
	tieTogether,
}) => {
	const [toneStarted, setToneStarted] = useState(false);
	const instrumentRef = useRef(null);
	const partRef = useRef(null);
	const lastNoteRef = useRef(null);

	useEffect(() => {
		if (Tone.context.state === "running") {
			setToneStarted(true);
		}
	}, []);

	const setupInstrument = async () => {
		console.log("Setting up instrument:", instrument);
		const instruments = {
			Synth: () => new Tone.Synth().toDestination(),
			AMSynth: () => new Tone.AMSynth().toDestination(),
			FMSynth: () => new Tone.FMSynth().toDestination(),
			MonoSynth: () => new Tone.MonoSynth().toDestination(),
			DuoSynth: () => new Tone.DuoSynth().toDestination(),
			PluckSynth: () => new Tone.PluckSynth().toDestination(),
			MembraneSynth: () => new Tone.MembraneSynth().toDestination(),
			MetalSynth: () => new Tone.MetalSynth().toDestination(),
			PolySynth: () => new Tone.PolySynth(Tone.Synth).toDestination(),
		};

		if (instrumentRef.current) {
			await instrumentRef.current.dispose();
		}
		instrumentRef.current = instruments[instrument]();
		instrumentRef.current.volume.value = Tone.gainToDb(volume / 100);
		console.log("Instrument set up:", instrumentRef.current);
	};

	const setupLoop = () => {
		if (partRef.current) {
			partRef.current.dispose();
		}

		const part = new Tone.Part(
			(time, { note, index }) => {
				if (lastNoteRef.current) {
					instrumentRef.current.triggerRelease(time);
					lastNoteRef.current = null;
				}
				if (note) {
					if (!(tieTogether && index > 0 && note === notes[index - 1])) {
						instrumentRef.current.triggerAttack(note, time);
						lastNoteRef.current = note;
						Tone.Transport.schedule(
							(t) => {
								if (lastNoteRef.current === note) {
									instrumentRef.current.triggerRelease(t);
									lastNoteRef.current = null;
								}
							},
							time + notePlayLength / 10,
						);
					}
				}
				Tone.Draw.schedule(() => {
					setCurrentIndex(index);
				}, time);
			},
			notes.map((note, index) => ({ time: index * (60 / bpm), note, index })),
		);

		part.loop = true;
		part.loopEnd = notes.length * (60 / bpm);
		partRef.current = part;
	};

	const handleOverlayClick = async () => {
		if (Tone.context.state !== "running") {
			await Tone.start();
			console.log("Tone started");
		}
		setToneStarted(true);
	};

	useEffect(() => {
		console.log("Instrument or volume changed");
		setupInstrument().then(() => {
			if (isPlaying) {
				Tone.Transport.stop();
				setupLoop();
				Tone.Transport.start();
				partRef.current.start(0);
			}
		});
	}, [instrument, volume]);

	useEffect(() => {
		if (!notes || notes.length === 0) return;

		Tone.Transport.bpm.value = bpm;

		setupLoop();

		if (isPlaying) {
			Tone.Transport.start();
			partRef.current.start(0);
		} else {
			Tone.Transport.stop();
			if (partRef.current) partRef.current.stop();
			if (instrumentRef.current) instrumentRef.current.triggerRelease("+0");
			lastNoteRef.current = null;
		}

		return () => {
			if (partRef.current) {
				partRef.current.stop();
				partRef.current.dispose();
			}
			Tone.Transport.stop();
			if (instrumentRef.current) instrumentRef.current.triggerRelease("+0");
			lastNoteRef.current = null;
		};
	}, [notes, bpm, isPlaying, notePlayLength, tieTogether, setCurrentIndex]);

	if (!toneStarted) {
		return <ClickFirst onClick={handleOverlayClick} />;
	}

	return null;
};

export default Loop;
