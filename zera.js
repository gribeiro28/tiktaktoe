const fs = require('fs');

const json = JSON.parse(fs.readFileSync('inicio.json', 'utf-8'));
const finais = json.finais;

console.log(finais.length);


let t = "{\"finais\":[";
for (let a = 0; a < finais.length; a++) {
    t += "{\"a\":\"" + finais[a].a + "\",\"w\":" + 20 + "}";
    if (a != finais.length - 1) {
        t += ",";
    }



}
t += "]}";
fs.writeFileSync("inicio.json", "" +/* JSON.stringify({ "finais": [t] })*/ t);
console.log(t);