var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

cluster.setupMaster({exec: __dirname + '/generator.js'});

console.log("CPUs :", numCPUs);

for (var i = 0; i < numCPUs-1 ; i++) {
    cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
});
