// * waits for the DOM to be fully loaded before executing the code

document.addEventListener("DOMContentLoaded", () => {
	// Function to draw a character on the canvas
	const drawCharacter = (char, ctx, canvas) => {
		const fontSize = 20;
		const font = `${fontSize}px Arial`;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.font = font;
		ctx.textBaseline = "top";
		ctx.textAlign = "start";

		// X-coordinate position for the character
		const x = 1;
		// Y-coordinate position for the character
		const y = 8;

		// Set the fill style to white
		ctx.fillStyle = "white";

		// Draw the character on the canvas if the input is not empty
		if (char.trim() !== "") {
			ctx.fillText(char, x, y);
			updatePixelDataDisplay(ctx);
		}
	};

	// Function to convert a single component of a color to its hexadecimal representation
	const componentToHex = (c) => {
		const hex = c.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};

	// Function to convert RGB color values to a hexadecimal representation
	const rgbToHex = (r, g, b) => {
		return componentToHex(r) + componentToHex(g) + componentToHex(b);
	};

	// Function to convert pixel data to hexadecimal format
	const convertToHex = (pixelData) => {
		let hexData = "";
		for (let i = 0; i < pixelData.length; i += 4) {
			const hex = rgbToHex(pixelData[i], pixelData[i + 1], pixelData[i + 2]);
			hexData += `0x${hex}, `;
			if ((i + 4) % (16 * 4) === 0) {
				// Break the line for better readability
				hexData += "\n";
			}
		}
		return hexData;
	};

	// Function to display updated pixel data
	const updatePixelDataDisplay = (ctx) => {
		const pixelData = ctx.getImageData(0, 0, 16, 34).data;
		const hexData = convertToHex(pixelData);
		document.getElementById("pixelDisplay").innerText = hexData;
	};

	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d", { willReadFrequently: true });

	// Event listener for input changes in the "charInput" field
	document.getElementById("charInput").addEventListener("input", () => {
		const char = document.getElementById("charInput").value;
		const btn = document.getElementById("downloadLink");

		// Handling the behavior when the input character changes.
		if (char.trim() === "") {
			// btn.innerHTML = `<button id='downloadLink' class='downloadLink'>Download Pixel Data</button>`;
			// btn.style.visibility = "hidden";

			btn.removeAttribute("href");
			btn.style.color = "gray";

			document.getElementById("pixelDisplay").innerText = ``;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		} else {
			btn.setAttribute("href_bak", "href");
			btn.style.color = "white";
			drawCharacter(char, ctx, canvas);
		}
	});

	// Event listener for the download link
	const downloadLink = document.getElementById("downloadLink");
	downloadLink.addEventListener("click", () => {
		const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		const hexData = convertToHex(pixelData);

		// Prepare the data as a text file for download
		const data = "data:text/plain;charset=utf-8," + encodeURIComponent(hexData);

		// Set the download link's href attribute
		downloadLink.setAttribute("href", data);
	});
});

// Thanks ❤
