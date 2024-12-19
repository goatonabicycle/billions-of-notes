// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/75 backdrop-blur-sm
                 flex justify-center items-center z-[9999]"
			onClick={onClose}
		>
			<div
				className="bg-pink-950/90 p-6 rounded-lg border border-pink-400/50
                   shadow-[0_0_500px_rgba(236,72,153,0.7)]
                   backdrop-blur-sm"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
