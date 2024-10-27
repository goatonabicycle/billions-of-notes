import React, { memo } from "react";

const RainbowText = ({ text, tempo }) => {
	if (!text) return null;

	const colorCycleDuration = Math.max(0.2, 240 / tempo);

	const synthwaveKeyframes = `
    @keyframes synthwaveGlow {
      0% { color: #ff10f0; }
      25% { color: #10b4ff; }
      50% { color: #ffeb3b; }
      75% { color: #10b4ff; }
      100% { color: #ff10f0; }
    }
  `;

	return (
		<span>
			<style>{synthwaveKeyframes}</style>
			{text.split("").map((char, index) => (
				<span
					key={index}
					style={{
						animation: `synthwaveGlow ${colorCycleDuration}s linear infinite`,
						animationDelay: `${index * (colorCycleDuration / text.length)}s`,
					}}
					className="inline-block text-4xl font-bold tracking-wider"
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</span>
	);
};

const Title = memo(({ selectedTempo }) => {
	return (
		<div className="relative flex justify-center items-center gap-2 whitespace-nowrap py-6 px-4">
			<RainbowText text="Billions" tempo={selectedTempo} />
			<RainbowText text="of" tempo={selectedTempo} />
			<RainbowText text="Notes!" tempo={selectedTempo} />
		</div>
	);
});

export default Title;
