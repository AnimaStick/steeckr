#Front-end Steeckr

Para usar live-server usando https, e atualizando a cada alteração no front:

1) Instale o live-server: npm install -g live-server
2) Rode usando o run.bat(windows) ou o run.sh(linux)

Obs.: caso não funcione, terás que seguir o passo a passo para gerar key e .crt,(ou, no arquivo run, remover a opção --https) e se colocar um passhprase diferente, terá que alterar o passphrase no https-front.js: 

https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/

Obs. 2: Se o browser disser que não é seguro, terá que importar o CA.pem, na pasta cert, para o browser (em gerenciar certificados, escolher a aba "Autoridades")
