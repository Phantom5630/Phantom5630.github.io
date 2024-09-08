const text = "A game programmer,\ncurrently studying in UOW Malaysia KDU.";
let index = 0;
let startCorrection = false;

function typewriter() {
	if (!startCorrection) {
		if (index < text.length) {
			const char = text.charAt(index);
			if (char == "\n") {
				document.getElementById("typewriter").innerHTML += "<br>";
			}
			else {
				document.getElementById("typewriter").innerHTML += char;
			}
			index++;
			if (index == text.length) {
				startCorrection = true;
			}
			if (char == " " || char == "\n") {
				setTimeout(typewriter, 100);
			}
			else {
				setTimeout(typewriter, Math.random() * 20 + 40);
			}
		}
	}
	else if (index >= text.length - 4) {
		index--;
		document.getElementById("typewriter").innerHTML = document.getElementById("typewriter").innerHTML.substring(0, index + 3);
		setTimeout(typewriter, 40);
	}
	else {
		document.getElementById("typewriter").innerHTML += ".";
		document.getElementById("text-cursor").style.animation = "text-cursor-effect 1s infinite";
	}
}

window.onload = typewriter;