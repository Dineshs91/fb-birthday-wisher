var http = require('http');
var fs = require('fs');


console.log('Starting selenium setup');

var seleniumUrl = "http://selenium-release.storage.googleapis.com/2.47/selenium-server-standalone-2.47.0.jar";
var dest = "support/selenium.jar";

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

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
    });

    file.on('finish', function() {
        file.close(cb);
    });
}

if (downloadSelenium) {
    console.log('Downloading standalone selenium server');
    download(seleniumUrl, dest, function() {
        console.log('Donwload complete');
        console.log('Selenium setup process completed successfully');
    });
} else {
    console.log('Selenium setup process completed successfully');
}