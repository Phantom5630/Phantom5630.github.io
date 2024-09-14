const text = "A game programmer,\ncurrently studying in UOW Malaysia KDU.";
let index1 = 0;
let startCorrection = false;

function typewriter() {
	if (!startCorrection) {
		if (index1 < text.length) {
			const char = text.charAt(index1);
			if (char == "\n") {
				document.getElementById("typewriter").innerHTML += "<br>";
			}
			else {
				document.getElementById("typewriter").innerHTML += char;
			}
			index1++;
			if (index1 == text.length) {
				startCorrection = true;
			}
			if (char == " " || char == "\n") {
				setTimeout(typewriter, 100);
			}
			else if (char == "."){
				setTimeout(typewriter, 200);
			}
			else {
				setTimeout(typewriter, Math.random() * 20 + 40);
			}
		}
	}
	else if (index1 >= text.length - 4) {
		index1--;
		document.getElementById("typewriter").innerHTML = document.getElementById("typewriter").innerHTML.substring(0, index1 + 3);
		setTimeout(typewriter, 40);
	}
	else {
		document.getElementById("typewriter").innerHTML += ".";
		document.getElementById("text-cursor").style.animation = "text-cursor-effect 1s infinite";
	}
}

window.onload = typewriter;