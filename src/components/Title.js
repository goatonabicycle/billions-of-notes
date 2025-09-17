import React, { memo } from "react";

const RainbowText = ({ text, tempo }) => {
	if (!text) return null;

	const colorCycleDuration = Math.max(0.2, 240 / tempo);

	const keyframes = `
    @keyframes textGlow {
      0% {
        color: #FF2D95;
        text-shadow: 2px 2px 0px rgba(255, 45, 149, 0.5);
      }
      33% {
        color: #FF8C2D;
        text-shadow: 2px 2px 0px rgba(255, 140, 45, 0.5);
      }
      66% {
        color: #2DE2FF;
        text-shadow: 2px 2px 0px rgba(45, 226, 255, 0.5);
      }
      100% {
        color: #FF2D95;
        text-shadow: 2px 2px 0px rgba(255, 45, 149, 0.5);
      }
    }
  `;

	return (
		<span>
			<style>{keyframes}</style>
			<link
				href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
				rel="stylesheet"
			/>

			{text.split("").map((char, index) => (
				<span
					key={index}
					style={{
						animationName: 'textGlow',
						animationDuration: `${colorCycleDuration}s`,
						animationTimingFunction: 'linear',
						animationIterationCount: 'infinite',
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

const Title = memo(({ selectedTempo, animationsEnabled }) => {
	return (
		<div className="relative w-full max-w-5xl mx-auto px-4">
			<div className="relative overflow-hidden py-2 px-6">
				<div
					className="relative z-10 flex justify-center items-center whitespace-nowrap"
					style={{
						fontFamily: "Russo One, system-ui, -apple-system, sans-serif",
					}}
				>

					<div className="flex flex-wrap justify-center gap-4" data-intro="Welcome to Billions of Notes!" data-step="1">
						{animationsEnabled && (
							<>
								<RainbowText text="BILLIONS" tempo={selectedTempo} />
								<RainbowText text="OF" tempo={selectedTempo} />
								<RainbowText text="NOTES!" tempo={selectedTempo} />
							</>
						)}

						{!animationsEnabled && (
							<>
								<RainbowText text="BILLIONS" tempo={0} />
								<RainbowText text="OF" tempo={0} />
								<RainbowText text="NOTES!" tempo={0} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

export default Title;
