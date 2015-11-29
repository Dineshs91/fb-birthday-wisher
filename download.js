var http = require('http');
var fs = require('fs');


console.log('Starting selenium setup');

var dirExists = function(path) {
    try {
        return fs.statSync(path).isDirectory();
    } catch(err) {
        return false;
    }
};

var fileExists = function(path) {
    try {
        return fs.statSync(path).isFile();
    } catch(err) {
        return false;
    }
};

// Check if support dir exists
var isDir = dirExists('./support');
var downloadSelenium = false;

if (!isDir) {
    console.log('Creating support directory');
    fs.mkdirSync('./support');
    downloadSelenium = true;
} else {
    console.log('support directory already exists');
}

if (isDir) {
    // Check if selenium.jar exists
    var isSeleniumPresent = fileExists('./support/selenium.jar');
    downloadSelenium = !isSeleniumPresent;
}

if (downloadSelenium) {
    console.log('Downloading standalone selenium server');

    var file = fs.createWriteStream("support/selenium.jar");
    var request = http.get("http://selenium-release.storage.googleapis.com/2.47/selenium-server-standalone-2.47.0.jar",
                          function(response) {
                              response.pipe(file);
                          });
    console.log('Donwload complete');
}

console.log('Selenium setup process completed successfully');