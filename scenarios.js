var setup = require('./setup.js')

var fb_email = process.env.FB_EMAIL;
var fb_pass = process.env.FB_PASS;

var wishes = [
    'Happy Birthday !!',
    'Happy Birthday! Have a blast.',
    'Many more happy returns of the day'
];

var getRandomWish = function() {
    var min = 0;
    var max = wishes.length;

    var index = Math.floor(Math.random() * (max - min) + min);
    return wishes[index];
};

setup.start();

var webdriverio = require('webdriverio'),
    client = webdriverio.remote({
        desiredCapabilities: {
            browserName: 'phantomjs',
            'phantomjs.binary.path': require('phantomjs').path,
            resolution : '1024x768'
        },
        logLevel: 'verbose',
    }).init();

client
    .url('127.0.0.1')
        .setValue('#email', fb_email)
        .setValue('#pass', fb_pass)
        .click('#loginbutton')
        .pause(1000)
        .element('span*=birthday').click('.fbRemindersTitle')
        .pause(1000)
        .setValue('[name="message_text"]', getRandomWish())
        .keys('Enter')
        .pause(500)
        .catch(function(e) {
            console.log('caught error:' + e);
        })
        .end().then(function() {
            setup.exit();
        });