const fs = require("fs");
 
module.exports = {
    cert: fs.readFileSync(__dirname + "/cert/CA/localhost/localhost.crt"),
    key: fs.readFileSync(__dirname + "/cert/CA/localhost/localhost.decrypted.key"),
    passphrase: "feijugerald0?"
};