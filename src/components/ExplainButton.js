import React, { useState, memo } from "react";
import Modal from "./Modal";
import KofiButton from "./KofiButton";

const ModalContent = memo(() => (
	<div className="w-[400px] max-h-[80vh] overflow-y-auto space-y-6 text-pink-100 text-center">
		<div className="space-y-4">
			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					What is this?
				</div>
				<div className="text-sm opacity-90">
					This is a website that generates a random set of notes for you based
					on your input.
				</div>
			</div>

			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					AI notes?
				</div>
				<div className="text-sm opacity-90">Nope!</div>
			</div>

			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					What about bitcoins?
				</div>
				<div className="text-sm opacity-90">Even less so</div>
			</div>

			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					Why can't I make the tempo 151?
				</div>
				<div className="text-sm opacity-90">
					You can! There's a text box! Click on the number and change it.
				</div>
			</div>

			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					Very cool, you should...
				</div>
				<div className="text-sm opacity-90">
					Please add your ideas{" "}
					<a
						className="text-pink-400 hover:text-pink-300 underline transition-colors"
						href="https://github.com/goatonabicycle/billions-of-notes/issues/new"
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>
					. I'd really appreciate it!
				</div>
			</div>

			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					Shortcuts?
				</div>
				<div className="text-sm opacity-90 space-y-1">
					Yup
					<div className="grid grid-cols-2 gap-2 mt-2">
						<div className="px-2 py-1 bg-pink-950/50 rounded border border-pink-400/20">
							p = Pause
						</div>
						<div className="px-2 py-1 bg-pink-950/50 rounded border border-pink-400/20">
							r = Reset
						</div>
						<div className="px-2 py-1 bg-pink-950/50 rounded border border-pink-400/20">
							n = New Notes
						</div>
						<div className="px-2 py-1 bg-pink-950/50 rounded border border-pink-400/20">
							s = Save to MIDI
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="text-lg font-bold text-pink-300 mb-2">
					Can I help?
				</div>
				<div className="text-sm opacity-90 space-y-1 flex justify-center">
					<a href='https://ko-fi.com/B0B1LV8D9' target='_blank'>
						<img height='36' style={{ border: "0px", height: "36px" }} src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' />
					</a>
				</div>
			</div>


		</div>
	</div>
));

const ExplainButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="text-pink-100 hover:text-pink-400 transition-colors duration-300"
				type="button"
			>
				Wtf?🤷‍♂️
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ModalContent />
			</Modal>
		</>
	);
};

export default memo(ExplainButton);
