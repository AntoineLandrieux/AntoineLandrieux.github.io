const text = document.querySelector("span.explain");
let textContent = text.textContent;
let index = 0;
let loop = 0;
let x = null;

const nav = document.querySelector("nav");
const btn = document.querySelector("button");

btn.addEventListener('click', function (f) {
    nav.classList.toggle("enable");
    nav.classList.toggle("disable");
    btn.classList.toggle("enable");
    btn.classList.toggle("disable");
});

function animation() {
    loop++;
    if (loop <= textContent.length) {
        index = (index + 1) % (textContent.length + 1);
    } else if (loop > textContent.length) {
        clearInterval(x);
        var styleSheet = document.styleSheets[0];
    }
    text.innerText = textContent.substring(0, index);
}

window.addEventListener('load', function () {
    x = setInterval(animation, 100);
});

var language = document.querySelectorAll("img.lang");
var projectSection = document.querySelector("section#projects");
var loaded = [];

function update() {
    let data = "";
    if (loaded.length != 0) {
        let filtered_projects = projects.filter(function(project) {
            return project.language.some(function(lang) {
                return loaded.includes(lang);
            });
        });
        let matching_project = filtered_projects.map(function(project) {
            return project;
        });
        matching_project.forEach(function (Item) {
            data += `
<div class="project">
    <div class="proj">
        <span class="name">${Item.name}</span>
        <span class="lang">Language : ${Item.language}</span>
        <span class="desc">${Item.desc}</span>
    </div>
    <div class="btns">
        <a href="${Item.href}" target="_blank" class="btn">projet</a>`;
            if (Item.eula == true) {
                data += `
        <a href="${Item.eulaRel}" target="_blank" class="btn">eula</a>
                `;
            } else {
                data += `
        <span class="btn">eula</span>
                `;
            }
            data += ` 
    </div>
</div>`;
        });
    } else {
        projects.forEach(function (Item) {
            data += `
<div class="project">
    <div class="proj">
        <span class="name">${Item.name}</span>
        <span class="lang">Language : ${Item.language}</span>
        <span class="desc">${Item.desc}</span>
    </div>
    <div class="btns">
        <a href="${Item.href}" target="_blank" class="btn">project</a>`;
            if (Item.eula == true) {
                data += `
        <a href="${Item.eulaRel}" target="_blank" class="btn">eula</a>
                `;
            } else {
                data += `
        <span class="btn">eula</span>
                `;
            }
            data += ` 
    </div>
</div>`;
        });
    }
    if (data == "") {
        data = `
<div class="error">
    <span class="errmsg">Nothing</span>
</div>
        `;
    }
    projectSection.innerHTML = data;
}

language.forEach(function (lang) {
    lang.addEventListener('click', function() {
        lang.classList.toggle("active");
        if (lang.classList.toString().toLowerCase() == "lang active") {
            loaded.push(lang.getAttribute("alt"));
        } else {
            let index = loaded.indexOf(lang.getAttribute("alt"));
            loaded.splice(index, 1);
        }
        update();
    })
});

update();