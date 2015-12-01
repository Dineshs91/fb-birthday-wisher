var childProcess = require('child_process');
var http = require('http');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var filename = 'support/selenium.jar';
var args = ['-jar', filename];
var seleniumProcess;

var start = function() {
    seleniumProcess = childProcess.spawn('java', args);

    seleniumProcess.on('exit', function(code) {
        console.log('Selenium Standalone has exited with code ' + code);
        process.exit(code);
    });

    seleniumProcess.stderr.on('data', function(data) {
        if(data.indexOf("Selenium Server is up and running") > -1) {
            console.log('Selenium server started successfully');
            console.log('Triggerring start event');
            eventEmitter.emit('start');
        } else if(data.indexOf("Selenium is already running on port 4444") > -1) {
            console.log('Selenium is already running on port 4444');
            console.log('-> Run `npm run fix` to stop already running server');
        }
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
    exit,
    eventEmitter
};