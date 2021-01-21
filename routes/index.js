var express = require('express');
var router = express.Router();

var text = {
  "title": "Marco Parrone",
  "description": "Home page of Marco Parrone",
  "home": "HOME",
  "about": "ABOUT",
  "apps": "APPS",
  "contact": "CONTACT",
  "homepage": " - home page",
  "about_title": "About",
  "about_content": "Hello, I am Marco Parrone, welcome to my home page, here you can find some apps which I developed.",
  "apps_title": "Apps",
  "apps_content": "You can try the apps directly in the browser <i class=\"material-icons w3-xxlarge\">open_in_browser</i>, and you can install them from within there too, or you can install them on Android from Google Play <i class=\"material-icons w3-xxlarge\">get_app</i>.",
  "notes": "Notes: an app to save and organize notes.",
  "bookmarks": "Bookmarks Manager: a browser-independent bookmarks manager.",
  "reminder": "Looping Reminder: an app that sends notifications at defined intervals of time.",
  "tictactoe": "Tic Tac Toe: a tic-tac-toe game.",
  "contact_title": "Contact",
  "email": "Email: ",
  "location": "Turin, Italy"
  };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  { 
    baseurl: 'http://localhost:3000',
    title: text['title'],
    description: text['description'],
    home: text['home'],
    about: text['about'],
    apps: text['apps'],
    contact: text['contact'],
    homepage: text['homepage'],
    about_title: text['about_title'],
    about_content: text['about_content'],
    apps_title: text['apps_title'],
    apps_content: text['apps_content'],
    notes: text['notes'],
    bookmarks: text['bookmarks'],
    reminder: text['reminder'],
    tictactoe: text['tictactoe'],
    contact_title: text['contact_title'],
    email: text['email'],
    location: text['location']
 });
});

module.exports = router;
