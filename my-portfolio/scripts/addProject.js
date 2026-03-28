const dropdownMenu = document.getElementById("portfolio-dropdown");
const template = document.getElementById("portfolio-template");
const container = document.getElementById("portfolio");

allProjectPaths = 
[
    "workshop-of-wishes/",
    "my-tower-defense/",
    "rapture-reign/",
    "infamy/"
];

window.onload = allProjectPaths.forEach(path =>   
{
    const clone = template.content.cloneNode(true);

    fetch(path + "data.txt")
        .then(res => res.text()) //convert response to JS object
            .then(data =>
            {
                //bind data to elements
                const lines = data.split("\n");
                const wrapper = clone.querySelector(".project-link");
                wrapper.href = path;
                
                const title = lines.find(line => line.startsWith("Title")).split(":")[1].trim();
                wrapper.id = title;

                clone.querySelector(".title").textContent = title;
                clone.querySelector(".genre").textContent = lines.find(line => line.startsWith("Genre")).split(":")[1].trim();
                clone.querySelector(".platform").textContent = lines.find(line => line.startsWith("Platform")).split(":")[1].trim();
                clone.querySelector(".engine").textContent = lines.find(line => line.startsWith("Engine")).split(":")[1].trim();
                clone.querySelector(".time").textContent = lines.find(line => line.startsWith("Time")).split(":")[1].trim();
                clone.querySelector(".role").textContent = lines.find(line => line.startsWith("Role")).split(":")[1].trim();
                const cover = clone.querySelector(".cover");
                cover.src = path + lines.find(line => line.startsWith("Cover Src")).split(":")[1].trim();
                cover.alt = lines.find(line => line.startsWith("Cover Type")).split(":")[1].trim();
                clone.querySelector(".gif").src = path + lines.find(line => line.startsWith("Gif Src")).split(":")[1].trim();

                container.appendChild(clone);


                //add option to dropdown menu
                const list = document.createElement("li");
                const link = document.createElement("a");

                link.href = "#" + title;
                link.textContent = title;

                dropdownMenu.appendChild(list);
                list.appendChild(link);
            }
            )
});