var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

console.log('CPUs :', numCPUs);

cluster.setupMaster({exec: __dirname + '/generator.js'});

for (var i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
});
