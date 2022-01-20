function tira() {
    var table = document.getElementById("table");
    var but = document.getElementById("gera");
    var tub = document.getElementById("pes");
    for (let k = 0; k < table.children.length; k++) {
        if (table.children[k].children !== undefined) {
            table.children[k].length;
            for (let l = 0; l < table.children[k].children.length; l++) {
                if (table.children[0].children[1] !== undefined) {
                    if (table.children[k].children[l].textContent === "+") {
                        table.children[k].children[l].textContent = "";
                    } else if (table.children[k].children[l].style.color !== "") {
                        table.children[k].children[l].textContent = "";
                    }
                }
            }
        }
    }
    but.textContent = "";
    tub.textContent = "";
}
