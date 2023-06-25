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

(async () => {
    const file = await getFile("https://raw.githubusercontent.com/zamsyt/obsidian-snippets/main/Easy%20multi-column%20notes.css");

    const re = /\s*\/\* (.*?) \*\/\s*/g;
    const comments = file.matchAll(re);

    let i = 0;
    for (let comment of comments) {
        console.log(comment);
        addCheckbox("checkbox-" + i, comment[1])
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