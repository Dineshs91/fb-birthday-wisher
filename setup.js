var childProcess = require('child_process');
var http = require('http');

var filename = 'support/selenium.jar';
var args = ['-jar', filename];
var seleniumProcess;

var start = function() {
    seleniumProcess = childProcess.spawn('java', args, {
        stdio: 'ignore',
        detached: true
    });

    seleniumProcess.on('error', function(err) {
        console.err('Error starting selenium server - ' + err);
    });
};

var exit = function() {
    console.log('Operation complete -- Exiting now...');
    http.get('http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer');
};

module.exports = {
    start,
    exit
};