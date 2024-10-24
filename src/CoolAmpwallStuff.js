import React, { useState } from "react";

function Ampwall() {
	return (
		<div className="container">
			<h2>Ampwall is cooler than Bandcamp</h2>
			<iframe
				src="https://ampwall.com/services/PlayerCard/v1/content/exclusive?embedId=0192c035-5f68-7650-a225-97db82245d75&controlStyle=persistent&playerWidth=350"
				style={{
					width: "350px",
					minWidth: "350px",
					height: "501px",
					minHeight: "492px",
				}}
			></iframe>
		</div>
	);
}

export default Ampwall;
