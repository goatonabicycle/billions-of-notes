import { useEffect, useRef, useState } from "react";

const animations = [
	{
		name: "pulse-field",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			const seededRandom = (seed) => {
				const x = Math.sin(seed * 12.9898) * 43758.5453;
				return x - Math.floor(x);
			};

			// Create a field of pulsing dots with varying phases and sizes
			const spacing = 40;
			let i = 0;
			for (let x = 0; x < w + spacing; x += spacing) {
				for (let y = 0; y < h + spacing; y += spacing) {
					i++;
					const seed = i * 7.3;
					const phase = seededRandom(seed) * Math.PI * 2;
					const baseSize = 1 + seededRandom(seed + 1) * 2;
					const hue = 200 + seededRandom(seed + 2) * 80; // Blue to purple range

					// Distance to mouse affects pulse intensity
					const distToMouse = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
					const mouseEffect = Math.max(0, 1 - distToMouse / 300);

					// Pulsing size
					const pulse = Math.sin(time * 2 + phase) * 0.5 + 0.5;
					const size = baseSize * (0.5 + pulse * 0.5 + mouseEffect * 2);

					// Pulsing brightness
					const alpha = 0.3 + pulse * 0.4 + mouseEffect * 0.3;

					ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
					ctx.beginPath();
					ctx.arc(x, y, size, 0, Math.PI * 2);
					ctx.fill();

					// Add glow near mouse
					if (mouseEffect > 0.3) {
						const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
						gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${mouseEffect * 0.3})`);
						gradient.addColorStop(1, `hsla(${hue}, 80%, 70%, 0)`);
						ctx.fillStyle = gradient;
						ctx.beginPath();
						ctx.arc(x, y, size * 3, 0, Math.PI * 2);
						ctx.fill();
					}
				}
			}
		},
	},
	{
		name: "fireflies",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			const seededRandom = (seed) => {
				const x = Math.sin(seed * 12.9898) * 43758.5453;
				return x - Math.floor(x);
			};

			// Create organic firefly movement
			const numFireflies = 60;
			for (let i = 0; i < numFireflies; i++) {
				const seed = i * 13.7;

				// Each firefly has its own wandering path
				const baseX = seededRandom(seed) * w;
				const baseY = seededRandom(seed + 1) * h;
				const wanderRadius = 50 + seededRandom(seed + 2) * 100;
				const speed = 0.3 + seededRandom(seed + 3) * 0.4;
				const phase = seededRandom(seed + 4) * Math.PI * 2;

				// Organic wandering motion using multiple sine waves
				const x = baseX + Math.sin(time * speed + phase) * wanderRadius * 0.6
					+ Math.sin(time * speed * 1.7 + phase * 2) * wanderRadius * 0.4;
				const y = baseY + Math.cos(time * speed * 0.8 + phase) * wanderRadius * 0.5
					+ Math.sin(time * speed * 1.3 + phase * 1.5) * wanderRadius * 0.3
					- time * 10 % (h + 100); // Gentle upward drift

				// Wrap around
				const wrappedY = ((y % (h + 100)) + h + 100) % (h + 100) - 50;
				const wrappedX = ((x % (w + 100)) + w + 100) % (w + 100) - 50;

				// Mouse attraction
				const distToMouse = Math.sqrt((wrappedX - mouse.x) ** 2 + (wrappedY - mouse.y) ** 2);
				const attracted = distToMouse < 200;
				const attractX = attracted ? (mouse.x - wrappedX) * 0.02 : 0;
				const attractY = attracted ? (mouse.y - wrappedY) * 0.02 : 0;

				const finalX = wrappedX + attractX;
				const finalY = wrappedY + attractY;

				// Flickering glow
				const flicker = Math.sin(time * 8 + seed * 5) * 0.3 + 0.7;
				const hue = 45 + seededRandom(seed + 5) * 30; // Warm yellows/oranges

				// Glow
				const glowSize = (8 + seededRandom(seed + 6) * 8) * flicker;
				const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, glowSize);
				gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${0.8 * flicker})`);
				gradient.addColorStop(0.3, `hsla(${hue}, 100%, 60%, ${0.4 * flicker})`);
				gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(finalX, finalY, glowSize, 0, Math.PI * 2);
				ctx.fill();

				// Bright core
				ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${flicker})`;
				ctx.beginPath();
				ctx.arc(finalX, finalY, 1.5, 0, Math.PI * 2);
				ctx.fill();
			}
		},
	},
	{
		name: "diagonal-sweep",
		draw: (ctx, w, h, time, mouse) => {
			// Smooth mouse influence based on position (no atan2 discontinuity)
			const mouseXNorm = (mouse.x - w / 2) / (w / 2); // -1 to 1
			const mouseYNorm = (mouse.y - h / 2) / (h / 2); // -1 to 1
			const baseOffset = time * 10;

			ctx.clearRect(0, 0, w, h);

			// Blue diagonal lines - angle shifts smoothly with mouse X
			ctx.strokeStyle = "hsla(211, 100%, 51%, 0.15)";
			ctx.lineWidth = 1;
			const spacing = 60;
			const angle1 = Math.PI / 4 + mouseXNorm * 0.15;

			for (let i = -w; i < w + h; i += spacing) {
				const offset = (baseOffset % spacing);
				ctx.beginPath();
				ctx.moveTo(i + offset, 0);
				ctx.lineTo(i + offset + Math.cos(angle1) * (h + w), Math.sin(angle1) * (h + w));
				ctx.stroke();
			}

			// Yellow diagonal lines - angle shifts with mouse Y
			ctx.strokeStyle = "hsla(48, 100%, 51%, 0.15)";
			const angle2 = -Math.PI / 4 + mouseYNorm * 0.15;

			for (let i = -w; i < w + h; i += spacing) {
				const offset = (baseOffset % spacing);
				ctx.beginPath();
				ctx.moveTo(i + offset, 0);
				ctx.lineTo(i + offset + Math.cos(angle2) * (h + w), -Math.sin(angle2) * (h + w));
				ctx.stroke();
			}
		},
	},
	{
		name: "starfield",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			const seededRandom = (seed) => {
				const x = Math.sin(seed * 12.9898) * 43758.5453;
				return x - Math.floor(x);
			};

			const parallaxX = (mouse.x - w / 2) * 0.1;
			const parallaxY = (mouse.y - h / 2) * 0.1;

			// Generate many random stars with different properties
			const numStars = 150;
			for (let i = 0; i < numStars; i++) {
				const seed = i * 17.3;

				// Random position
				const baseX = seededRandom(seed) * (w + 200);
				const baseY = seededRandom(seed + 1) * (h + 200);

				// Depth layer (0-1, affects speed and size)
				const depth = seededRandom(seed + 2);
				const speed = 0.3 + depth * 2;
				const size = 0.5 + depth * 2;

				// Parallax based on depth
				const px = (baseX + time * speed + parallaxX * (1 + depth * 2)) % (w + 200) - 100;
				const py = (baseY + time * speed * 0.3 + parallaxY * (1 + depth * 2)) % (h + 200) - 100;

				// Twinkle
				const twinkleSpeed = 1 + seededRandom(seed + 3) * 3;
				const twinklePhase = seededRandom(seed + 4) * Math.PI * 2;
				const twinkle = Math.sin(time * twinkleSpeed + twinklePhase) * 0.4 + 0.6;

				// Color variation
				const hue = seededRandom(seed + 5) < 0.7
					? 200 + seededRandom(seed + 6) * 40  // Most are blue-ish
					: seededRandom(seed + 6) < 0.5
						? 30 + seededRandom(seed + 7) * 30  // Some warm
						: 280 + seededRandom(seed + 7) * 40; // Some purple
				const saturation = 50 + seededRandom(seed + 8) * 50;

				// Draw glow for brighter stars
				if (depth > 0.6) {
					const glowSize = size * 4 * twinkle;
					const gradient = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
					gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, 80%, ${0.3 * twinkle})`);
					gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, 80%, 0)`);
					ctx.fillStyle = gradient;
					ctx.beginPath();
					ctx.arc(px, py, glowSize, 0, Math.PI * 2);
					ctx.fill();
				}

				// Star core
				ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${70 + depth * 30}%, ${twinkle})`;
				ctx.beginPath();
				ctx.arc(px, py, size * twinkle, 0, Math.PI * 2);
				ctx.fill();
			}

			// Occasional shooting star
			const shootingStarPhase = (time * 0.1) % 1;
			if (shootingStarPhase < 0.15) {
				const progress = shootingStarPhase / 0.15;
				const startX = w * 0.8;
				const startY = h * 0.1;
				const endX = w * 0.2;
				const endY = h * 0.5;

				const currentX = startX + (endX - startX) * progress;
				const currentY = startY + (endY - startY) * progress;

				// Trail
				const gradient = ctx.createLinearGradient(
					currentX + 50, currentY - 25,
					currentX - 30, currentY + 15
				);
				gradient.addColorStop(0, "hsla(200, 100%, 90%, 0)");
				gradient.addColorStop(0.5, `hsla(200, 100%, 90%, ${0.6 * (1 - progress)})`);
				gradient.addColorStop(1, "hsla(200, 100%, 90%, 0)");

				ctx.strokeStyle = gradient;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(currentX + 50, currentY - 25);
				ctx.lineTo(currentX - 30, currentY + 15);
				ctx.stroke();
			}
		},
	},
	{
		name: "electric-web",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			const seededRandom = (seed) => {
				const x = Math.sin(seed * 12.9898) * 43758.5453;
				return x - Math.floor(x);
			};

			// Create nodes that form an electric web
			const nodes = [];
			const numNodes = 40;

			for (let i = 0; i < numNodes; i++) {
				const seed = i * 11.7;
				const baseX = seededRandom(seed) * w;
				const baseY = seededRandom(seed + 1) * h;
				const wanderSpeed = 0.2 + seededRandom(seed + 2) * 0.3;
				const phase = seededRandom(seed + 3) * Math.PI * 2;

				// Gentle wandering
				const x = baseX + Math.sin(time * wanderSpeed + phase) * 30
					+ Math.cos(time * wanderSpeed * 1.3 + phase) * 20;
				const y = baseY + Math.cos(time * wanderSpeed * 0.7 + phase) * 30
					+ Math.sin(time * wanderSpeed * 1.1 + phase) * 20;

				nodes.push({ x, y, seed });
			}

			// Draw connections between nearby nodes
			ctx.lineWidth = 1;
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dist = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
					const maxDist = 150;

					if (dist < maxDist) {
						// Check if line is near mouse
						const midX = (nodes[i].x + nodes[j].x) / 2;
						const midY = (nodes[i].y + nodes[j].y) / 2;
						const distToMouse = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
						const mouseEffect = Math.max(0, 1 - distToMouse / 200);

						const alpha = (1 - dist / maxDist) * 0.3 + mouseEffect * 0.4;
						const hue = 200 + mouseEffect * 80; // Blue to purple when mouse is near

						// Electric flicker
						const flicker = Math.sin(time * 15 + i + j) * 0.2 + 0.8;

						ctx.strokeStyle = `hsla(${hue}, 80%, ${50 + mouseEffect * 30}%, ${alpha * flicker})`;
						ctx.beginPath();
						ctx.moveTo(nodes[i].x, nodes[i].y);
						ctx.lineTo(nodes[j].x, nodes[j].y);
						ctx.stroke();

						// Bright spark near mouse
						if (mouseEffect > 0.5 && Math.random() < 0.1) {
							const sparkX = midX + (Math.random() - 0.5) * 20;
							const sparkY = midY + (Math.random() - 0.5) * 20;
							ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${mouseEffect})`;
							ctx.beginPath();
							ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
							ctx.fill();
						}
					}
				}
			}

			// Draw nodes with glow
			for (const node of nodes) {
				const distToMouse = Math.sqrt((node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2);
				const mouseEffect = Math.max(0, 1 - distToMouse / 150);
				const size = 3 + mouseEffect * 4;
				const hue = 200 + mouseEffect * 80;

				// Glow
				const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3);
				gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${0.4 + mouseEffect * 0.4})`);
				gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);
				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
				ctx.fill();

				// Core
				ctx.fillStyle = `hsla(${hue}, 80%, ${70 + mouseEffect * 20}%, ${0.8 + mouseEffect * 0.2})`;
				ctx.beginPath();
				ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
				ctx.fill();
			}
		},
	},
	{
		name: "water-drops",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			// Draw expanding ripple rings from random drop points
			const seededRandom = (seed) => {
				const x = Math.sin(seed * 12.9898) * 43758.5453;
				return x - Math.floor(x);
			};

			// Multiple drop sources
			const numDrops = 8;
			for (let d = 0; d < numDrops; d++) {
				const seed = d * 23.7;
				const dropX = seededRandom(seed) * w;
				const dropY = seededRandom(seed + 1) * h;
				const dropPhase = seededRandom(seed + 2) * 10;
				const dropSpeed = 0.8 + seededRandom(seed + 3) * 0.4;

				// Each drop creates multiple expanding rings
				for (let ring = 0; ring < 4; ring++) {
					const ringTime = (time * dropSpeed + dropPhase + ring * 2) % 8;
					const radius = ringTime * 60;
					const alpha = Math.max(0, 1 - ringTime / 8) * 0.4;

					if (alpha > 0) {
						ctx.strokeStyle = `hsla(200, 80%, 60%, ${alpha})`;
						ctx.lineWidth = 2 - ringTime * 0.2;
						ctx.beginPath();
						ctx.arc(dropX, dropY, radius, 0, Math.PI * 2);
						ctx.stroke();
					}
				}
			}

			// Mouse creates its own ripples
			const mouseRipples = 5;
			for (let r = 0; r < mouseRipples; r++) {
				const ringTime = (time * 1.5 + r * 1.5) % 7;
				const radius = ringTime * 50;
				const alpha = Math.max(0, 1 - ringTime / 7) * 0.5;

				if (alpha > 0) {
					const hue = 280 - ringTime * 20;
					ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
					ctx.lineWidth = 3 - ringTime * 0.3;
					ctx.beginPath();
					ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
					ctx.stroke();
				}
			}

			// Subtle water surface texture
			ctx.fillStyle = "hsla(200, 80%, 70%, 0.03)";
			for (let x = 0; x < w; x += 30) {
				for (let y = 0; y < h; y += 30) {
					const distToMouse = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
					const wave = Math.sin(x * 0.02 + time) * Math.cos(y * 0.02 + time * 0.7);
					const mouseWave = Math.sin(distToMouse * 0.05 - time * 3) * Math.max(0, 1 - distToMouse / 300);

					const offsetX = wave * 5 + mouseWave * 10;
					const offsetY = wave * 3 + mouseWave * 10;

					ctx.beginPath();
					ctx.arc(x + offsetX, y + offsetY, 2, 0, Math.PI * 2);
					ctx.fill();
				}
			}
		},
	},
	{
		name: "matrix-rain",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			// Seeded random for consistent columns but varied behavior
			const seededRandom = (seed) => {
				const x = Math.sin(seed * 12.9898) * 43758.5453;
				return x - Math.floor(x);
			};

			const numColumns = Math.floor(w / 14);

			for (let col = 0; col < numColumns; col++) {
				const x = col * 14 + 7;
				const seed = col * 7.3;

				// Each column has different speed, length, and phase
				const speed = 40 + seededRandom(seed) * 80;
				const streamLength = 5 + Math.floor(seededRandom(seed + 1) * 15);
				const phase = seededRandom(seed + 2) * 1000;
				const brightness = 0.5 + seededRandom(seed + 3) * 0.5;

				// Mouse influence - columns near mouse speed up
				const distToMouse = Math.abs(x - mouse.x);
				const mouseBoost = Math.max(0, 1 - distToMouse / 200) * 30;

				const y = ((time + phase) * (speed + mouseBoost)) % (h + streamLength * 18);

				// Draw the falling stream
				for (let i = 0; i < streamLength; i++) {
					const charY = y - i * 18;
					if (charY < -18 || charY > h + 18) continue;

					// Head is brightest, tail fades
					const fade = 1 - (i / streamLength);
					const alpha = fade * brightness;

					if (i === 0) {
						// Leading character - bright white-green
						ctx.fillStyle = `hsla(140, 100%, 85%, ${alpha})`;
						ctx.font = "14px monospace";
						// Random character that changes
						const charCode = 0x30A0 + Math.floor((time * 10 + col + i) % 96);
						ctx.fillText(String.fromCharCode(charCode), x, charY);
					} else {
						// Trail - green with fading
						ctx.fillStyle = `hsla(140, 100%, 50%, ${alpha * 0.7})`;
						ctx.font = "14px monospace";
						const charCode = 0x30A0 + Math.floor(seededRandom(seed + i * 13 + Math.floor(time * 0.5)) * 96);
						ctx.fillText(String.fromCharCode(charCode), x, charY);
					}
				}
			}
		},
	},
	{
		name: "aurora-waves",
		draw: (ctx, w, h, time, mouse) => {
			const mouseX = mouse.x / w;
			const mouseY = mouse.y / h;

			ctx.clearRect(0, 0, w, h);

			// Create flowing aurora bands
			const bands = [
				{ color: "hsla(280, 80%, 50%, 0.12)", freq: 0.003, amp: 100, speed: 0.5, yOffset: 0.3 },
				{ color: "hsla(180, 80%, 50%, 0.12)", freq: 0.004, amp: 80, speed: 0.7, yOffset: 0.5 },
				{ color: "hsla(320, 80%, 50%, 0.08)", freq: 0.002, amp: 120, speed: 0.3, yOffset: 0.7 },
			];

			bands.forEach((band, i) => {
				ctx.fillStyle = band.color;
				ctx.beginPath();
				ctx.moveTo(0, h);

				for (let x = 0; x <= w; x += 5) {
					const baseY = h * band.yOffset;
					const wave1 = Math.sin(x * band.freq + time * band.speed) * band.amp;
					const wave2 = Math.sin(x * band.freq * 2 + time * band.speed * 1.5) * band.amp * 0.5;
					const mouseWave = Math.sin((x - mouse.x) * 0.01) * (150 - Math.abs(x - mouse.x) * 0.3) * mouseY;
					const y = baseY + wave1 + wave2 + Math.max(0, mouseWave);
					ctx.lineTo(x, y);
				}

				ctx.lineTo(w, h);
				ctx.closePath();
				ctx.fill();
			});
		},
	},
	{
		name: "lava-lamp",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			const mouseXNorm = mouse.x / w;
			const mouseYNorm = mouse.y / h;

			// Draw flowing blobs
			const blobs = [
				{ hue: 280, x: 0.2, y: 0.3, size: 200, speed: 0.4, phase: 0 },
				{ hue: 320, x: 0.7, y: 0.6, size: 180, speed: 0.5, phase: 2 },
				{ hue: 200, x: 0.5, y: 0.4, size: 220, speed: 0.3, phase: 4 },
				{ hue: 260, x: 0.3, y: 0.7, size: 160, speed: 0.6, phase: 1 },
				{ hue: 180, x: 0.8, y: 0.3, size: 190, speed: 0.35, phase: 3 },
			];

			blobs.forEach(blob => {
				const blobX = w * blob.x + Math.sin(time * blob.speed + blob.phase) * 100 + (mouse.x - w / 2) * 0.1;
				const blobY = h * blob.y + Math.cos(time * blob.speed * 0.7 + blob.phase) * 80 + (mouse.y - h / 2) * 0.1;

				// Create radial gradient for soft blob
				const gradient = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blob.size);
				gradient.addColorStop(0, `hsla(${blob.hue}, 80%, 50%, 0.15)`);
				gradient.addColorStop(0.5, `hsla(${blob.hue}, 80%, 50%, 0.08)`);
				gradient.addColorStop(1, `hsla(${blob.hue}, 80%, 50%, 0)`);

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(blobX, blobY, blob.size, 0, Math.PI * 2);
				ctx.fill();
			});

			// Add mouse-following glow
			const mouseGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
			mouseGradient.addColorStop(0, `hsla(${280 + mouseXNorm * 60}, 80%, 60%, 0.1)`);
			mouseGradient.addColorStop(1, `hsla(${280 + mouseXNorm * 60}, 80%, 60%, 0)`);
			ctx.fillStyle = mouseGradient;
			ctx.beginPath();
			ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
			ctx.fill();
		},
	},
	{
		name: "nebula",
		draw: (ctx, w, h, time, mouse) => {
			ctx.clearRect(0, 0, w, h);

			// Create layered nebula clouds
			const layers = [
				{ hue: 280, opacity: 0.06, scale: 1.0, speed: 0.2 },
				{ hue: 200, opacity: 0.05, scale: 0.8, speed: 0.3 },
				{ hue: 320, opacity: 0.04, scale: 1.2, speed: 0.15 },
			];

			layers.forEach(layer => {
				// Draw multiple overlapping cloud shapes
				for (let i = 0; i < 5; i++) {
					const baseX = (w / 4) * (i % 3) + Math.sin(time * layer.speed + i) * 50;
					const baseY = (h / 3) * Math.floor(i / 2) + Math.cos(time * layer.speed * 0.8 + i * 2) * 40;

					// Mouse influence
					const dx = (mouse.x - baseX) * 0.05;
					const dy = (mouse.y - baseY) * 0.05;

					const gradient = ctx.createRadialGradient(
						baseX + dx, baseY + dy, 0,
						baseX + dx, baseY + dy, 300 * layer.scale
					);
					gradient.addColorStop(0, `hsla(${layer.hue + i * 20}, 70%, 50%, ${layer.opacity})`);
					gradient.addColorStop(0.4, `hsla(${layer.hue + i * 20 + 30}, 70%, 40%, ${layer.opacity * 0.5})`);
					gradient.addColorStop(1, `hsla(${layer.hue}, 70%, 30%, 0)`);

					ctx.fillStyle = gradient;
					ctx.beginPath();
					ctx.arc(baseX + dx, baseY + dy, 300 * layer.scale, 0, Math.PI * 2);
					ctx.fill();
				}
			});

			// Scattered stars
			ctx.fillStyle = "hsla(220, 100%, 90%, 0.6)";
			for (let i = 0; i < 30; i++) {
				const x = (i * 137.5) % w;
				const y = (i * 89.3) % h;
				const twinkle = Math.sin(time * 2 + i) * 0.5 + 0.5;
				ctx.globalAlpha = twinkle * 0.8;
				ctx.beginPath();
				ctx.arc(x, y, 1, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
		},
	},
	{
		name: "constellation",
		draw: (ctx, w, h, time, mouse) => {
			const parallaxX = (mouse.x - w / 2) * 0.03;
			const parallaxY = (mouse.y - h / 2) * 0.03;

			ctx.clearRect(0, 0, w, h);

			// Store star positions for connections
			const stars = [];

			// Bright stars
			ctx.fillStyle = "hsla(220, 100%, 80%, 0.8)";
			for (let x = 0; x < w + 120; x += 120) {
				for (let y = 0; y < h + 120; y += 120) {
					const px = (x + time * 1.5 + parallaxX * 2) % (w + 120) - 60;
					const py = (y + time * 0.8 + parallaxY * 2) % (h + 120) - 60;
					stars.push({ x: px, y: py, layer: 0 });
					ctx.beginPath();
					ctx.arc(px, py, 2, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			// Medium stars
			ctx.fillStyle = "hsla(220, 100%, 70%, 0.5)";
			for (let x = 40; x < w + 80; x += 80) {
				for (let y = 40; y < h + 80; y += 80) {
					const px = (x + time * 1 + parallaxX * 1.5) % (w + 80) - 40;
					const py = (y + time * 0.5 + parallaxY * 1.5) % (h + 80) - 40;
					stars.push({ x: px, y: py, layer: 1 });
					ctx.beginPath();
					ctx.arc(px, py, 1.5, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			// Draw connections near mouse
			ctx.strokeStyle = "hsla(220, 80%, 60%, 0.15)";
			ctx.lineWidth = 0.5;
			const connectionRadius = 150;

			stars.forEach((star, i) => {
				const distToMouse = Math.sqrt((star.x - mouse.x) ** 2 + (star.y - mouse.y) ** 2);
				if (distToMouse < connectionRadius) {
					stars.slice(i + 1).forEach(other => {
						const dist = Math.sqrt((star.x - other.x) ** 2 + (star.y - other.y) ** 2);
						if (dist < 100) {
							const alpha = (1 - distToMouse / connectionRadius) * (1 - dist / 100) * 0.3;
							ctx.strokeStyle = `hsla(220, 80%, 60%, ${alpha})`;
							ctx.beginPath();
							ctx.moveTo(star.x, star.y);
							ctx.lineTo(other.x, other.y);
							ctx.stroke();
						}
					});
				}
			});

			// Faint distant stars
			ctx.fillStyle = "hsla(200, 100%, 90%, 0.3)";
			for (let x = 100; x < w + 200; x += 200) {
				for (let y = 50; y < h + 200; y += 200) {
					const px = (x + time * 0.5 + parallaxX) % (w + 200) - 100;
					const py = (y + time * 0.3 + parallaxY) % (h + 200) - 100;
					ctx.beginPath();
					ctx.arc(px, py, 1, 0, Math.PI * 2);
					ctx.fill();
				}
			}
		},
	},
];

export default function AnimatedBackground({ showSelector = false }) {
	const canvasRef = useRef(null);
	const [animationIndex, setAnimationIndex] = useState(() => Math.floor(Math.random() * animations.length));
	const [isOpen, setIsOpen] = useState(false);
	const mouseRef = useRef({ x: 0, y: 0 });
	const animationFrameRef = useRef(null);

	const animation = animations[animationIndex];

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		let startTime = performance.now();

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const handleMouseMove = (e) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};

		const animate = (currentTime) => {
			const elapsed = (currentTime - startTime) / 1000;
			animation.draw(ctx, canvas.width, canvas.height, elapsed, mouseRef.current);
			animationFrameRef.current = requestAnimationFrame(animate);
		};

		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", handleMouseMove);

		// Initialize mouse to center
		mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", handleMouseMove);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [animation]);

	const handleSelect = (index) => {
		setAnimationIndex(index);
		setIsOpen(false);
	};

	const handleRandom = () => {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * animations.length);
		} while (newIndex === animationIndex && animations.length > 1);
		setAnimationIndex(newIndex);
		setIsOpen(false);
	};

	return (
		<>
			<canvas
				ref={canvasRef}
				className="fixed inset-0 pointer-events-none"
				style={{ zIndex: -1 }}
			/>
			{showSelector && (
				<div className="fixed bottom-4 right-4 z-50">
					{isOpen && (
						<div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-sm border border-primary-500/30 rounded-lg shadow-lg overflow-hidden min-w-[180px]">
							<button
								type="button"
								onClick={handleRandom}
								className="w-full px-4 py-2 text-left text-sm text-primary-300 hover:bg-primary-500/20 transition-colors border-b border-primary-500/20 flex items-center gap-2"
							>
								<span className="text-primary-500">↻</span> Random
							</button>
							<div className="max-h-[300px] overflow-y-auto">
								{animations.map((anim, index) => (
									<button
										key={anim.name}
										type="button"
										onClick={() => handleSelect(index)}
										className={`w-full px-4 py-2 text-left text-sm transition-colors ${
											index === animationIndex
												? "bg-primary-500/30 text-primary-200"
												: "text-primary-400 hover:bg-primary-500/20 hover:text-primary-300"
										}`}
									>
										{anim.name}
									</button>
								))}
							</div>
						</div>
					)}
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center gap-2 px-3 py-2 bg-gray-900/90 backdrop-blur-sm border border-primary-500/30 rounded-lg text-sm text-primary-400 hover:text-primary-300 hover:border-primary-500/50 transition-all shadow-lg"
					>
						<span className="text-primary-500">✦</span>
						<span>{animation.name}</span>
						<span className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>▲</span>
					</button>
				</div>
			)}
		</>
	);
}
