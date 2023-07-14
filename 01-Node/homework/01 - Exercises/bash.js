const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

function print(output){
    process.stdout.write(output)
    process.stdout.write("\nprompt > ")
}

function bash(){
    process.stdout.write("prompt > ")
    process.stdin.on("data", (data) => {
        let args = data.toString().split(" ").slice(1).join(" ").trim()
        let cmd = data.split(" ")[0]

        if (commands.hasOwnProperty(cmd)) commands[cmd](print, args);
        else print(`command not found: ${cmd}`)
    })
}

bash();

module.exports = {
   print,
   bash,
};
