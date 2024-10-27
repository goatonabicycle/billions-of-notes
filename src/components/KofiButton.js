// KofiButton.js
import React, { useState, memo } from "react";
import Modal from "./Modal";

const KofiButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="text-pink-100 hover:text-pink-400 transition-colors duration-300"
			>
				Buy me a coffee
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="w-[400px] h-[80vh]">
					<iframe
						id="kofiframe"
						src="https://ko-fi.com/goatonabicycle/?hidefeed=true&widget=true&embed=true&preview=true"
						className="w-full h-full rounded"
						title="goatonabicycle"
					/>
				</div>
			</Modal>
		</>
	);
};

export default memo(KofiButton);
