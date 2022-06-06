const minecraftCommand = document.getElementById("minecraftCommand");
const toJsonBtn = document.getElementById("toJson");
const toMinecraftJsonBtn = document.getElementById("toMinecraftJson");

const editor = ace.edit("editorContainer");
editor.setTheme("ace/theme/monokai");
editor.setShowPrintMargin(false);
editor.session.setMode("ace/mode/json");
editor.clearSelection();

// {Inventory:[{ Slot: 102b, id: "minecraft:elytra", Count: 1b }]}
toJsonBtn.addEventListener("click", () => {
    if (minecraftCommand.value.replace(/ /g, "") == "") return;

    const correctValue = minecraftCommand.value.replaceAll("minecraft:", "").replace((/[0-9]+b/g), "\"$&\"");
    const jsontemp = correctValue.replace((/([\w]+)(:)/g), "\"$1\"$2");
    const correctjson = jsontemp.replace((/'/g), "\"");

    const parsed = JSON.parse(correctjson)
    editor.session.setMode("ace/mode/json");
    editor.setValue(JSON.stringify(parsed, null, "\t"));
});

toMinecraftJsonBtn.addEventListener("click", () => {
    if (editor.getValue().replace(/ /g, "") == "") return;

    
    const correctValue = editor.getValue().replace(/"(\w+)"\s*:/g, "$1:").replace(/"([0-9]+b)"/g, "$1");
    const flatify = correctValue.replace(/(\r\n|\n|\r)/gm,"").replace(/\t/g, " ").replace(/  +/g, " ");
    editor.session.setMode("ace/mode/text");
    editor.setValue(flatify);
});

