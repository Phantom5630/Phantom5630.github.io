class ProjectContents {
    constructor(coverSrc, coverType, gifSrc, title, genre, platform, engine, time, role) {
        this.coverSrc = coverSrc;
        this.coverType = coverType;
        this.gifSrc = gifSrc;
        this.title = title;
        this.genre = genre;
        this.platform = platform;
        this.engine = engine;
        this.time = time;
        this.role = role;
    }
}

let index = 0, elementID, allIcons, projectSwitchInterval,
    coverElement = document.getElementById("cover"),
    gifElement = document.getElementById("gif"),
    projectElement = document.getElementById("displayed-project"),
    allProjectPaths = ["infamy/"],//, "rapture-reign/"],
    preload = [], allProjectContents = [];

function showPreviousProject() {
    index = (index + allProjectContents.length - 1) % allProjectContents.length;
    setProject();
}

function showNextProject() {
    index = (index + 1) % allProjectContents.length;
    setProject();
}

function setProject() {
    if (arguments.length === 1) {
        index = arguments[0];
    }

    if (projectSwitchInterval) {
        stopSwitching();
    }

    allIcons.forEach(icon => {
        icon.style.backgroundColor = "";
        icon.style.height = "max(1vh, 1vw)";
        icon.style.width = "max(1vh, 1vw)";
    })
    elementID = `project-${index}`;
    console.log(elementID);
    document.getElementById(elementID).style.backgroundColor = "rgb(84, 84, 240)";
    document.getElementById(elementID).style.height = "max(1.6vh, 1.6vw)";
    document.getElementById(elementID).style.width = "max(1.6vh, 1.6vw)";
    coverElement.src = allProjectContents[index].coverSrc;
    gifElement.src = allProjectContents[index].gifSrc;
    document.getElementById("title").innerHTML = allProjectContents[index].title.toUpperCase();
    document.getElementById("genre").innerHTML = allProjectContents[index].genre;
    document.getElementById("platform").innerHTML = allProjectContents[index].platform;
    document.getElementById("engine").innerHTML = allProjectContents[index].engine;
    document.getElementById("time").innerHTML = allProjectContents[index].time;
    document.getElementById("role").innerHTML = allProjectContents[index].role;
    document.getElementById("project-link").href = allProjectPaths[index];
    document.getElementById("project-link").title = allProjectContents[index].title;

    startSwitching();
}

function startSwitching() {
    projectSwitchInterval = setInterval(showNextProject, 5000);
}

function stopSwitching() {
    clearInterval(projectSwitchInterval);
}

function createIcons() {
    let newProject = document.createElement("div");
    newProject.className = "prev";
    newProject.onclick = showPreviousProject;
    document.getElementById("selection").appendChild(newProject);

    for (let i = 0; i < allProjectContents.length; i++) {
        newProject = document.createElement("div");
        newProject.className = "project";
        newProject.id = `project-${i}`;
        newProject.title = allProjectContents[i].title;
        newProject.onclick = function () { setProject(i); };
        document.getElementById("selection").appendChild(newProject);
    }

    newProject = document.createElement("div");
    newProject.className = "next";
    newProject.onclick = showNextProject;
    document.getElementById("selection").appendChild(newProject);
}

function preloadImages() {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;

        allProjectPaths.forEach((path) => {
            fetch(path + "data.txt").then(response => response.text()).then(data => {
                const lines = data.split("\n");
                const title = lines.find(line => line.startsWith("Title")).split(":")[1].trim();
                const genre = lines.find(line => line.startsWith("Genre")).split(":")[1].trim();
                const platform = lines.find(line => line.startsWith("Platform")).split(":")[1].trim();
                const engine = lines.find(line => line.startsWith("Engine")).split(":")[1].trim();
                const time = lines.find(line => line.startsWith("Time")).split(":")[1].trim();
                const role = lines.find(line => line.startsWith("Role")).split(":")[1].trim();
                const coverSrc = path + lines.find(line => line.startsWith("Cover Src")).split(":")[1].trim();
                const coverType = lines.find(line => line.startsWith("Cover Type")).split(":")[1].trim();
                const gifSrc = path + lines.find(line => line.startsWith("Gif Src")).split(":")[1].trim();

                const cover = new Image();
                cover.src = coverSrc;
                cover.onload = () => {
                    preload.push(cover);
                    gif = new Image();
                    gif.src = gifSrc;
                    gif.onload = () => {
                        preload.push(gif)

                        allProjectContents.push(new ProjectContents(coverSrc, coverType, gifSrc, title, genre, platform, engine, time, role));
                        loadedCount++;

                        if (loadedCount == allProjectPaths.length) {
                            resolve();
                        }
                    }
                }
                cover.onerror = () => {
                    console.log(`failed to load at "${coverSrc}"`)
                    reject();
                }
                gif.onerror = () => {
                    console.log(`failed to load at "${gifSrc}"`)
                    reject();
                }
            })
        });
    });
}


preloadImages().then(function () {
    createIcons();
    allIcons = document.querySelectorAll("#portfolio>div#selection>div.project");
    setProject();
});

projectElement.addEventListener('mouseenter', stopSwitching);
projectElement.addEventListener('mouseleave', startSwitching);