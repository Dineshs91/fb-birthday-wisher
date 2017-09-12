### fb-birthday-wisher

Send your birthday wishes, to your friends on Facebook automatically, so you never have to miss wishing
your best one's.

Powered by [webdriverio](http://webdriver.io/)

#### Why virtual browser and browser automation ?

The first thing I looked up to was fb api. There are lot of issues, which made it difficult to use api approach.

1. Getting all your friends. 
  * If you check the document for [friends](https://developers.facebook.com/docs/graph-api/reference/v2.5/user/friends)
    in the permissions section, they have mentioned that "This will only return any friends who have used (via Facebook 
    Login) the app making the request". So we would not be able to get all friends. 
    You can check it in graph [explorer](https://developers.facebook.com/tools/explorer/). Enter ```/me/friends``` and
    see what you get. You will see that not all your friends are returned.

2. Posting on friends wall.

These are the 2 challenges I faced, that forced me to use the virtual and automation approach. If you know a workaround
for these issues, please send a PR or raise an issue. 

#### Getting started

You need to set the below 2 environment variables

FB_EMAIL=email id(associated with fb)<br/>
FB_PASS=fb password

    npm install
    npm run setup
    npm start
    
Make sure you have ```java``` installed. It is requried for running selenium.

If you get an error saying "Selenium server is already running on port 4444"
run 

    npm run fix
    
#### How it works
First selenium standalone server is started. A ```start``` event is triggered after server is started
successfully. Webdriverio code is executed on receiving ```start``` event.

webdriverio code can be found in [index.js](https://github.com/Dineshs91/fb-birthday-wisher/blob/master/index.js)

#### Todo

- [ ] Logout of fb

#### Platform
* Linux
* Mac os X
* Windows

#### Contributions

All kinds of contributions are most welcome.
