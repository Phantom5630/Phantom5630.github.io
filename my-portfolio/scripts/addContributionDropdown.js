function addProject() {
    const sections = document.querySelectorAll(".section");
    const dropdownMenu = document.getElementById("portfolio-dropdown");

    sections.forEach(
        section => 
        {
            const h2 = section.querySelector('h2');
            section.id = h2.textContent;
        
            const list = document.createElement("li");
            const link = document.createElement("a");

            link.href = "#" + h2.textContent;
            link.textContent = h2.textContent;

            dropdownMenu.appendChild(list);
            list.appendChild(link);
        });
}

window.onload = addProject;