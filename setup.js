var childProcess = require('child_process');
var http = require('http');

var filename = 'support/selenium.jar';
var args = ['-jar', filename];
var seleniumProcess;

var start = function() {
    seleniumProcess = childProcess.spawn('java', args, {
        stdio: 'inherit',
    });

    seleniumProcess.on('exit', function(code) {
        console.log('Selenium Standalone has exited with code ' + code);
        process.exit(code);
    });

    process.stdin.resume();
    process.stdin.on('data', function(chunk) {
        console.log('Attempting to shut down selenium nicely');
        http.get('http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer');
    });

    seleniumProcess.on('error', function(err) {
        console.err('Error starting selenium server - ' + err);
    });
};

var exit = function() {
    console.log('Operation complete -- Exiting now...');
    try {
        http.get('http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer');
    } catch(err) {
        console.err(err);
    }
};

module.exports = {
    start,
    exit
};