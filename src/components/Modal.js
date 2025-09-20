// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const handleBackdropKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
			onClose();
		}
	};

	const handleContentKeyDown = (e) => {
		e.stopPropagation();
	};

	return (
		<dialog
			className="fixed inset-0 bg-black/75 backdrop-blur-sm
                 flex justify-center items-center z-[9999] m-0 p-0 w-full h-full max-w-full max-h-full"
			onClick={onClose}
			onKeyDown={handleBackdropKeyDown}
			open
		>
			<div
				className="bg-primary-950/90 p-6 rounded-lg border border-primary-400/50
                   shadow-glow-xl
                   backdrop-blur-sm"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={handleContentKeyDown}
			>
				{children}
			</div>
		</dialog>
	);
};

export default Modal;
