import React from "react";

const Button = ({ icon, onClick, text }) => {
	return (
		<div className="relative inline-block">
			<button
				onClick={onClick}
				onKeyUp={onClick}
				type="button"
				className="relative group w-12 h-12 flex items-center justify-center 
                   bg-pink-600 hover:bg-pink-700 text-white text-sm leading-6 
                   rounded-xl transition-all duration-300
                   border-2 border-pink-400
                   shadow-[0_0_15px_rgba(236,72,153,0.5)]
                   hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
                   before:absolute before:inset-0 before:rounded-xl
                   before:border-2 before:border-pink-300 before:opacity-0
                   before:transition-opacity before:duration-300
                   hover:before:opacity-100
                   focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
			>
				{icon && (
					<span className="text-white transition-transform duration-300 group-hover:scale-110">
						{icon}
					</span>
				)}
				{text && (
					<div
						className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                          opacity-0 group-hover:opacity-100 
                          transition-all duration-300 pointer-events-none"
					>
						<div
							className="bg-pink-900/90 backdrop-blur-sm text-white px-3 py-1 
                          rounded-lg text-sm whitespace-nowrap
                          border border-pink-400/50
                          shadow-[0_0_10px_rgba(236,72,153,0.3)]
                          transform translate-y-1 group-hover:translate-y-0"
						>
							{text}
							<div
								className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                              w-2 h-2 bg-pink-900/90 rotate-45
                              border-r border-b border-pink-400/50"
							/>
						</div>
					</div>
				)}
			</button>
		</div>
	);
};

export default React.memo(Button);
