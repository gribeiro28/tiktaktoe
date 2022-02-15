# tiktaktoe
Jogo da velha baseado em machine learnig para a partir do basico aprender a tomar as melhores  dentro de jogo

Atraves da tentativa e erro ele rankeia as tentavidas ate perceber quais jogadas são claramente melhores,
e quais com certeza deve se evitar, testando opções novas caso não tenha algo garantidamente bom a se fazer.

Mantendo seus dados por hora em um Json local, fica facil para "reiniciar" a inteligencia apenas pegando
o backup.json e colando em cima de finais.json(json principal utilizado para a aprendizagem).

Em teoria, ao executar 'NPM install' e npm run dev/start, ja esta tudo pronto para jogar ao acessar a URL

localhost:4001.
