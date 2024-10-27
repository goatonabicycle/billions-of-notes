import React, { memo } from "react";

const RainbowText = ({ text, tempo }) => {
	if (!text) return null;

	const colorCycleDuration = Math.max(0.2, 240 / tempo);

	const keyframes = `
    @keyframes textGlow {
      0% { color: #ff00ff; text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #ff00ff; }
      33% { color: #00ffff; text-shadow: 2px 2px 0px #00ffff, -2px -2px 0px #00ffff; }
      66% { color: #ffff00; text-shadow: 2px 2px 0px #ffff00, -2px -2px 0px #ffff00; }
      100% { color: #ff00ff; text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #ff00ff; }
    }
  `;

	return (
		<span>
			<style>{keyframes}</style>
			{text.split("").map((char, index) => (
				<span
					key={index}
					style={{
						animation: `textGlow ${colorCycleDuration}s linear infinite`,
						animationDelay: `${index * (colorCycleDuration / text.length)}s`,
					}}
					className="inline-block font-black tracking-widest text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl"
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</span>
	);
};

const Title = memo(({ selectedTempo }) => {
	return (
		<div className="relative w-full max-w-5xl mx-auto px-4">
			<div className="relative overflow-hidden py-2 px-6" style={{}}>
				<div
					className="relative z-10 flex justify-center items-center whitespace-nowrap"
					style={{
						fontFamily:
							'"Press Start 2P", system-ui, -apple-system, sans-serif',
					}}
				>
					<div className="flex flex-wrap justify-center gap-4">
						<RainbowText text="BILLIONS" tempo={selectedTempo} />
						<RainbowText text="OF" tempo={selectedTempo} />
						<RainbowText text="NOTES!" tempo={selectedTempo} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default Title;
