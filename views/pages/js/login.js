
function login() {
    objP = {
        login: document.getElementById("inputEmails").value,
        senha: document.getElementById("inputPasswords").value
    };

    //teste
    fetch("http://192.192.1.200:4000/login/" + objP.login + "&" + objP.senha,
            {mode: "cors",
                cache: "default",
                header: {
                    "Access-Control-Allow-Origin": "*"
                }
            }

    ).then(
            function (resp) {
                resp.json().then(function (json) {
                    if (json.length == 0) {
                        window.location.assign("/");
                    } else {
                        if (json[0].idTraccar == 0) {
                            window.location.assign("grafico.html?"
                                    + "kjkszpj=947284835339455718400088&id=" + json[0].id);
                            console.log("Entrou2");
                        } else {
                            console.log("Entrou3");
                            window.location.assign("escolhaAtividade.html?"
                                    + "kjkszpj=947284835339455718400088&id=" + json[0].id);
                        }
                    }
                });
            });

}
