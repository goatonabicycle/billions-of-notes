import React from "react";

const Button = ({ icon, onClick, text }) => {
	return (
		<div className="relative inline-block">
			<button
				onClick={onClick}
				onKeyUp={onClick}
				type="button"
				className="relative group min-w-[100px] h-9 px-3 flex items-center justify-center gap-1.5
                 bg-pink-600 hover:bg-pink-700 text-white text-xs leading-5
                 rounded-lg transition-all duration-300
                 border border-pink-400
                 shadow-[0_0_12px_rgba(236,72,153,0.5)]
                 hover:shadow-[0_0_20px_rgba(236,72,153,0.7)]
                 before:absolute before:inset-0 before:rounded-lg
                 before:border before:border-pink-300 before:opacity-0
                 before:transition-opacity before:duration-300
                 hover:before:opacity-100
                 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1"
			>
				{icon && (
					<span className="text-white transition-transform duration-300 group-hover:scale-110">
						{icon}
					</span>
				)}

				{text && (
					<span className="text-white transition-transform duration-300 group-hover:scale-105">
						{text}
					</span>
				)}
			</button>
		</div>
	);
};

export default React.memo(Button);
