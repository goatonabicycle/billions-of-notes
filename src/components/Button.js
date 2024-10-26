import React from "react";

const Button = ({ icon, onClick, text }) => {
	return (
		<button
			onClick={onClick}
			className="group flex items-center gap-2 px-4 py-2 text-sm font-medium uppercase transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none active:scale-95"
		>
			{icon && (
				<span className="text-base transition-colors duration-500 group-hover:text-blue-500">
					{icon}
				</span>
			)}
			{text && (
				<span className="transition-colors duration-500 group-hover:text-blue-500">
					{text}
				</span>
			)}
		</button>
	);
};

export default React.memo(Button);
