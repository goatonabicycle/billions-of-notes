import React, { useState } from "react";

function Ampwall() {
	return (
		<div className="container">
			<h2>llawpma</h2>
			Should not work:
			<iframe
				src="https://ampwall.com/services/PlayerCard/v1/content/exclusive?embedId=0192c035-5f68-7650-a225-97db82245d75&controlStyle=persistent&playerWidth=350"
				style={{
					width: "350px",
					minWidth: "350px",
					height: "501px",
					minHeight: "492px",
				}}
			></iframe>
			<br />
			Should work:
			<iframe
				src="https://ampwall.com/services/PlayerCard/v1/content/exclusive?embedId=0192c051-6f2b-7f70-85b9-59f6900c3038&controlStyle=persistent&playerWidth=350"
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
