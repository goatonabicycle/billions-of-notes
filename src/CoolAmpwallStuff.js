import React, { useState } from "react";

function Ampwall() {
	return (
		<div
			style={{
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "20px",
			}}
		>
			<h2 style={{ marginBottom: "20px" }}>llawpma</h2>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "30px",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<p style={{ marginBottom: "10px" }}>Should not work:</p>
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

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<p style={{ marginBottom: "10px" }}>Should work:</p>
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

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<p style={{ marginBottom: "10px" }}>witnesses:</p>
					<iframe
						src="https://ampwall.com/services/PlayerCard/v1/content/exclusive?embedId=0192c034-57d2-7181-85ab-8e4828ba6017&controlStyle=persistent&playerWidth=350"
						style={{
							width: "350px",
							minWidth: "350px",
							height: "501px",
							minHeight: "492px",
						}}
					></iframe>
				</div>
			</div>
		</div>
	);
}

export default Ampwall;
