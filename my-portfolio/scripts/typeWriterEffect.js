const text = ["A game development tech stream student,\nstudying under UOW Malaysia KDU.", 
				"\n\nCurrently looking for an internship\nto fulfill graduation requirement."];
let indexChar = 0;
let indexArr = 0;
let startCorrection = false;

function typewriter() {
	if (!startCorrection) {
		if (indexChar < text[indexArr].length) {
			const char = text[indexArr].charAt(indexChar);
			if (char == "\n") {
				document.getElementById("typewriter").innerHTML += "<br>";
			}
			else {
				document.getElementById("typewriter").innerHTML += char;
			}
			indexChar++;
			if (indexChar == text[indexArr].length) {
				if(indexArr == 0){
					startCorrection = true;
				}
				else{
					document.getElementById("text-cursor").style.animation = "text-cursor-effect 1s infinite";
				}
			}
			if (char == " " || char == "\n") {
				setTimeout(typewriter, 100);
			}
			else if (char == ".") {
				setTimeout(typewriter, 200);
			}
			else {
				setTimeout(typewriter, Math.random() * 5 + 35);
			}
		}
	}
	else if (indexArr == 0 && indexChar >= text[indexArr].length - 4) {
		indexChar--;
		document.getElementById("typewriter").innerHTML = document.getElementById("typewriter").innerHTML.substring(0, indexChar + 3);
		setTimeout(typewriter, 40);
	}
	else {
		document.getElementById("typewriter").innerHTML += ".";
		indexArr = 1;
		indexChar = 0;
		startCorrection = false;
		setTimeout(typewriter, 40);
	}
}

window.onload = typewriter;