###Birthday-wisher

Send your birthday wishes, to your friends on Facebook automatically, so you never have to miss wishing
your best one's.

Powered by [webdriverio](http://webdriver.io/)

#### Getting started

You need to set the below 2 environment variables

FB_EMAIL=email id(associated with fb)<br/>
FB_PASS=fb password

    npm run setup
    npm start
    
If you get an error saying "Selenium server is already running on port 4444"
run 

    npm run fix
    
#### How it works
First selenium standalone server is started. A ```start``` event is triggered after server is started
successfully. Webdriverio code is executed on receiving ```start``` event.

webdriverio code can be found in index.js

#### Todo

- [ ] Logout of fb

#### Contributions

All kinds of contributions are most welcome.
