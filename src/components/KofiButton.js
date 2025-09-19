// KofiButton.js
import React, { useState, memo } from "react";
import Modal from "./Modal";

const KofiButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsModalOpen(true)}
				className="text-primary-100 hover:text-primary-400 transition-colors duration-300"
			>
				☕ Coffee
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="w-[400px] h-[80vh] bg-slate-100">
					<iframe
						id="kofiframe"
						src="https://ko-fi.com/goatonabicycle/?hidefeed=true&widget=true&embed=true&preview=true"
						height="712"
						title="goatonabicycle"
						style={{
							border: "none",
							width: "100%",
							padding: "4px",
							background: "#000000 !imprtant",
						}}
					/>
				</div>
			</Modal>
		</>
	);
};

export default memo(KofiButton);
