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
		<div
			className="fixed inset-0 bg-black/75 backdrop-blur-sm
                 flex justify-center items-center z-[9999]"
			onClick={onClose}
			onKeyDown={handleBackdropKeyDown}
			role="dialog"
			aria-modal="true"
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
		</div>
	);
};

export default Modal;
