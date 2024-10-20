import React, { useState, useCallback, memo } from "react";
import "./KofiButton.css";

const KofiModal = ({ closeModal }) => (
	<div className="kofi-modal-overlay" onClick={closeModal}>
		<div className="kofi-modal-content" onClick={(e) => e.stopPropagation()}>
			<iframe
				id="kofiframe"
				src="https://ko-fi.com/goatonabicycle/?hidefeed=true&widget=true&embed=true&preview=true"
				className="kofi-iframe"
				title="goatonabicycle"
			/>
		</div>
	</div>
);

const KofiButton = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = useCallback(() => setModalIsOpen(true), []);
	const closeModal = useCallback(() => setModalIsOpen(false), []);

	return (
		<>
			<button className="link-looking-button" onClick={openModal}>
				Buy me a coffee
			</button>
			{modalIsOpen && <KofiModal closeModal={closeModal} />}
		</>
	);
};

export default memo(KofiButton);
