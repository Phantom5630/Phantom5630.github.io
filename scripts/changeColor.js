let colors = ["blue", "red", "magenta"];
let num = 0;

function changeColor() {
    num = (num + 1) % colors.length;
    let elements = document.querySelectorAll(".bg");
    elements.forEach(element => {
        element.style.background = `repeating-linear-gradient(to right, ${colors[num]}, ${colors[(num + 1) % colors.length]}, ${colors[(num + colors.length + 2) % colors.length]})`;
        element.style.backgroundSize = '200%, 200%';
    });
}