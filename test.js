const { spawn } = require("node:child_process");

const childProcess=spawn('ls');
// console.log(childProcess);
childProcess.stdout.on('data', (data)=>{
    console.log(data.toString());
});

