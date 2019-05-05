const cron = require("node-cron");

//exceute every 1 min
cron.schedule('0 */4 * * *', function(){
    var shell = require('./child_helper');
    var commandList = [
        "node index.js"
    ]
    shell.series(commandList , function(err){
    //    console.log('executed many commands in a row'); 
        console.log('done')
    });
});