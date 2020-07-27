# To-Do

-   End to end encryption on all pages: Endcrypt OR crypto ??Let Encrypt??

-   Retain user input on invalid submission on login.ejs

-   Get current location with Javascript HTML Geolocation API

-   Force Some inputs to be formatted a specific way i.e. 123-456-7890 instead of 1234567890

-   Add red boxes around any invalid inputs along w/ the error messages

-   Create Messages Table in DB (doctorID && patientID foreign keys. ThreadID for message threads)

-   rename Quest Designer -> New Quest on all ejs templates

-   Would like to update all of the placeholders to match the labels

-   Adventure Quest logo should redirect to the records view

-   Rename menu option Home -> Dashboard

# Updates

## Harcourt

-   Patient Records page dynamically fills out fields changes upon a new option being selected

-   **?? I was able to get the session to be stored in the DB, and not in memory any more. This leads to more questions??**

-   _??Should I delete session on logout? Doing so would remove the possibility of retaining any app preferences/settings??_

-   _??I noticed that when logging in and out that the same sessionID was stored in the DB regardless of which account I used, this would then make me assume that the sessions are assigned via IP/MAC addresses. Works perfectly fine from a front facing perspective can login and out things are protected displayed correctly however the sessionID remains the same just some of the cookie data changes. If anyone has a suggestion of how to get to the bottom of this short of deploying it and using multiple machines to create sessions I would be open to them. As for now its 100% fine for development just something I noticed and didn't understand. cheers -Harcourt??_

-   Auth done

-   Logout works

-   Minor redesign on Login && Register pages

-   All pages in the 'index' route are now protected, will redirect to login w/ error msg if an attempt to access is made w/ out auth

-   _Currently sending the entire user object of logged in user for dev while we figure out what fields we need for each page but need to trim for security && performance for deployment._

## Chad

## Robert

# Install all Node Modules

-   In terminal of AdventureQuest Folder

```
npm install
```

# Run Server

-   In terminal

```
npm run dev
```

# Resources

## Node.js (Back-end)

-   https://nodejs.org/dist/latest-v12.x/docs/api/

## Express.js (Back-end Framework)

-   https://expressjs.com/en/4x/api.html

## NPM (Package Manager)

-   https://docs.npmjs.com/

## MySQL Node Module (MySQL Connector)

-   https://github.com/mysqljs/mysql

## Passport (Authentication)

-   http://www.passportjs.org/docs/

## Mapbox (Map API)

-   https://docs.mapbox.com/mapbox-gl-js/api/

## Mapquest (Location API)

-   https://developer.mapquest.com/documentation/mapquest-js/v1.0/

## Bcryptjs (Password hashing)

-   https://www.npmjs.com/package/bcryptjs

## EJS (Templating Engine)

-   https://ejs.co/#docs

## Heroku (Cloud Deployment)

-   https://devcenter.heroku.com/
    ### JawsDB (DB deployment)
    -   https://www.jawsdb.com/
