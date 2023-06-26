async function getFile(url) {
    let response = await fetch(url);
    //let file = await response.blob()
    return await response.text();
}

function addElement(parent, type, attributes = {}, text) {
    let el = document.createElement(type);
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    el.textContent = text;
    parent.appendChild(el);
    return el;
}

const $ = (s) => document.querySelector(s);

function addCheckbox(id, label) {
    let liEl = addElement($("ul"), "li");
    addElement(liEl, "input", {"type": "checkbox", "id": id, "checked": true})
    addElement(liEl, "label", {"for": id}, label)
}

const parseHeading = (match) => ({title: match[1], index: match.index});

const rootPath = "/snippetbuilder/";
const url = window.location.pathname.slice(rootPath.length);

//console.log(url);

let file;
const filename = decodeURIComponent(window.location.pathname.split("/").slice(-1));
const fileExt = filename.split(".").pop();
$("h1").textContent = filename;

const headingRe = /^[ \t]*\/\* *#+ +(.*?)(?: +#+)? *\*\/[ \t]*$/gm;
const commentRe = /^[ \t]*\/\* *(.*) *\*\/[ \t]*$/gm;

let sections = [];

function parseHeadings(headings) {
    let i = 0;
    for (let heading of headings) {
        let h = parseHeading(heading);
        sections.push(h);
        if (h.title != "") {
            addCheckbox(`section-${i}`, h.title);
        }
        i++;
    }
}

getFile(url).then((responseText) => {
    file = responseText;
    //file = myCss;
    parseHeadings(file.matchAll(headingRe));
    if (sections.length == 0) {
        $("#log").textContent += "No headings found. Listing all single line comments instead.\n";
        parseHeadings(file.matchAll(commentRe))
    }
});

function save(content, filename) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: fileExt == "css" ? "text/css" : "text/plain"});

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(a.href);
}

function compile() {
    if (sections.length == 0) { return file; }

    let output = "";
    output += file.slice(0, sections[0].index)
    for (let i = 0; i < sections.length-1; i++) {
        if (sections[i].title != "" && !$(`#section-${i}`).checked) continue;
        output += file.slice(sections[i].index, sections[i+1].index);
    }
    let last = sections.length-1
    if (sections[last].title == "" || $(`#section-${last}`).checked) {
        output += file.slice(sections[last].index);
    }
    return output
}

document.getElementById("btn-save").addEventListener("click", () => {
    save(compile(), filename);
});
