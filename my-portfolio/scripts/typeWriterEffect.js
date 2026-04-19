class Paragraph
{
	constructor(baseText, backSpaceNum)
	{
		this.baseText = baseText;
		this.backSpaceNum = backSpaceNum;
	}
}

const paragraphs = 
[
	new Paragraph("A game development tech stream student,\nstudying under UOW Malaysia KDU.", 5),
	new Paragraph(".", 0),
	new Paragraph("\n\nWill be joining Nimbus Games\nas a Game Programmer Intern.", 0)
];
const typewriterElement = document.getElementById("typewriter");
let indexChar = 0;
let indexArr = 0;
let startCorrection = false;
let printedText;

function typewriter() {
	if (!startCorrection) {
		const baseText = paragraphs[indexArr].baseText;
		if (indexChar < baseText.length) {
			const char = baseText.charAt(indexChar);
			if (char == "\n") {
				typewriterElement.innerHTML += "<br>";
			}
			else {
				typewriterElement.innerHTML += char;
			}

			if (++indexChar == baseText.length) {
				startCorrection = true;
				printedText = typewriterElement.innerHTML;
				indexChar = 0;
			}

			let delay = 80;
			if (char =='.')
			{
				delay = 150.
			}
			else if (char != ' ' && char !='\n') {
				delay = Math.random() * 5 + 35;
			}
			setTimeout(typewriter, delay);
		}
	}
	else {
		if (paragraphs[indexArr].backSpaceNum-- > 0) {
			indexChar++;
			
			typewriterElement.innerHTML = printedText.substring(0, printedText.length - indexChar);
			setTimeout(typewriter, 40);
		}
		else {
			startCorrection = false;
			indexChar = 0;
			if (++indexArr == paragraphs.length) {
				document.getElementById("text-cursor").style.animation = "text-cursor-effect 1s infinite";
			}
			else {
				setTimeout(typewriter, 40);
			}
		}
	}
}

window.onload = typewriter;