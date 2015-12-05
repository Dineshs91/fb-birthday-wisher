var http = require('http');
var fs = require('fs');
var progressBar = require('progress');

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

    request.on('response', function(res) {
        var len = parseInt(res.headers['content-length'], 10);

        console.log();
        var bar = new progressBar('  downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        });

        res.on('data', function(chunk) {
            bar.tick(chunk.length);
        });

        res.on('end', function() {
            console.log('\n');
        });
    });

    file.on('finish', function() {
        file.close(cb);
    });
}

if (downloadSelenium) {
    download(seleniumUrl, dest, function() {
        console.log('Selenium setup process completed successfully');
    });
} else {
    console.log('Selenium standalone server exists. Skipping download...');
    console.log('Selenium setup process completed successfully');
}