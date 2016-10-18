var selenium = require('./selenium.js');
var logName = "webdriverio";

var fb_email = process.env.FB_EMAIL;
var fb_pass = process.env.FB_PASS;

var wishes = [
    'Happy Birthday !!',
    'Happy Birthday! Have a blast.',
    'Many more happy returns of the day',
    'I wish you all the happiness in the world! Happy Birthday.',
    'Just live it out to the fullest and have fun! Happy Birthday',
    'I hope you have the best day ever. Happy Birthday!',
    'Happy Birthday!! May all of your birthday wishes come true.',
    'Happy Birthday! Welcome to the new age.'
];

var getRandomWish = function() {
    var min = 0;
    var max = wishes.length;

    var index = Math.floor(Math.random() * (max - min) + min);
    return wishes[index];
};

selenium.start();

selenium.eventEmitter.on('start', function() {
    console.log('[' + logName + '] start event received.');

    if (fb_email === "" || fb_email === undefined) {
        console.log('[' + logName + '] fb_email env variable not set.');
        selenium.exit();
        return;
    }
    if (fb_pass === "" || fb_pass === undefined) {
        console.log('[' + logName + '] fb_pass env variable not set.');
        selenium.exit();
        return;
    }

    startWebdriverio();
});

function startWebdriverio() {
    var webdriverio = require('webdriverio'),
    client = webdriverio.remote({
        desiredCapabilities: {
            browserName: 'phantomjs',
            'phantomjs.binary.path': require('phantomjs').path,
        },
        logLevel: 'silent',
    }).init();

    client
        .url('https://www.facebook.com')
        .setValue('#email', fb_email)
        .setValue('#pass', fb_pass)
        .click('#loginbutton')
        .pause(300)
        .isExisting('span*=birthday').then(function(isExisting) {
            if(isExisting) {
                return this.element('span*=birthday').click('.fbRemindersTitle')
                    .pause(500)
                    .waitForExist('[name="message_text"]', 1000).then(function() {
                        return this.setValue('[name="message_text"]', getRandomWish());
                    }).keys('Enter')
                    .pause(200);
            } else {
                console.log('[' + logName + '] Looks like there are no birthdays today.');
                return this.pause(100);
            }
        }).then(function() {
            return this.catch(function(e) {
                console.log('[' + logName + ' error] ' + e.message);
            });
        }).then(function() {
            this.end().then(function() {
                selenium.exit();
            });
        }).catch(function(err) {
            console.log(err);
            selenium.exit();
        });
}