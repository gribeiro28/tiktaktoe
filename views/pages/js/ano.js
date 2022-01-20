var ano = document.getElementById('ano');
var opt = document.createElement('option');

for (let data = new Date().getYear() + 1900; data >= 1980; data--) {

    ano = document.getElementById("ano");
    opt = document.createElement("option");
    opt.value = data;
    opt.text = data;
    ano.appendChild(opt, ano.options[0]);

}

