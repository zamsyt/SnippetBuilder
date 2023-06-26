//console.log(window.location.pathname)

async function getFile(url) {
    let response = await fetch(url);
    //let file = await response.blob()
    let fileText = await response.text();
    return fileText;
}

function addCheckbox(id, label) {
    let liEl = document.createElement("li");

    let inputEl = document.createElement("input");
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("id", id);
    inputEl.setAttribute("checked", true);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.appendChild(document.createTextNode(label));

    liEl.appendChild(inputEl);
    liEl.append(labelEl);

    document.querySelector("ul").appendChild(liEl);
}

let sections = [];
const parseHeading = (match) => ({title: match[1], index: match.index});

(async () => {
    //const file = await getFile("https://raw.githubusercontent.com/zamsyt/obsidian-snippets/main/Easy%20multi-column%20notes.css");
    const file = myCss;

    const filename = decodeURIComponent(window.location.pathname.split("/").slice(-1));
    document.querySelector("h1").textContent = filename;

    const headingRe = /^[ \t]*\/\* *#+ +(.*?)(?: +#+)? *\*\/[ \t]*$/gm;
    let headings = file.matchAll(headingRe);

    let i = 0;
    let iter = headings.next();
    const commentRe = /^[ \t]*\/\* *(.*) *\*\/[ \t]*$/gm;
    if (!iter.done) {
        let h = parseHeading(iter.value);
        //if (h.index > 0) { sections.push({title: "", index: 0}) }
        sections.push(h);
        if (h.title != "") {
            addCheckbox("checkbox-" + i, h.title);
            i++;
        }
    } else {
        document.getElementById("log").textContent += "No headings found. Listing all single line comments.\n"
        headings = file.matchAll(commentRe);
    }
    for (let heading of headings) {
        let h = parseHeading(heading);
        sections.push(h);
        if (h.title == "") continue;
        addCheckbox("checkbox-" + i, h.title);
        i++;
    }
})();

function saveSnippet() {
    const a = document.createElement("a");
    const file = new Blob(["test content"], {type: "text/css"});

    a.href= URL.createObjectURL(file);
    a.download = "myFile.css";
    a.click();
    
    URL.revokeObjectURL(a.href);
};

document.getElementById("btn-save").addEventListener('click', saveSnippet);