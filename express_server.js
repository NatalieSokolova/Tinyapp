const express = require('express');
const app = express();
const PORT = 8080; // default port 8080

app.set('view engine', 'ejs');

const bodyParser = require('body-parser');

// generates a "unique" shortURL
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8);
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(bodyParser.urlencoded({extended: true}));

// homepage message
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

// list of all URLs
app.get('/urls', (req, res) => {
  let webPage = { urls: urlDatabase };
  res.render('urls_index', webPage);
});

// newURL form
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

//redirects to specific short/longURL page
//templateVars = webPage
app.get('/urls/:shortURL', (req, res) => {
  let webPage = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render('urls_show', webPage);
});

// redirects to longURL
app.get('/u/:shortURL', (req, res) => {
  console.log(req.params.shortURL) // short URL(found in address bar)
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});

// adds new URL to the urlDatabase
app.post('/urls', (req, res) => {
  // console.log('POST req.body: ', req.body); // found in form
  const shortURL = generateRandomString();
  const longURL = req.body.longURL
  // console.log('longURL: ', longURL);
  urlDatabase[shortURL] = longURL; // adds URL to database;
  // console.log('database: ', urlDatabase); 
  res.redirect(`/urls/${shortURL}`); // redirects to the 'TinyURL/Short URL' webpage after clicks Submit;
});

// deletes a URL from urlDatabase
app.post('/urls/:shortURL/delete', (req, res) => {
  // console.log('shortURL: ', req.params.shortURL) 
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.post('/urls/:shortURL', (req, res) =>{
  const longURL = req.body.longURL;
  // console.log('longURL: ', longURL)
  const shortURL = req.params.shortURL;
  // console.log('shortURL: ', shortURL)
  urlDatabase[shortURL] = longURL;
  // console.log('urlDatabase: ', urlDatabase)
  res.redirect(`/urls`);
});



// app.get('/hello', (req, res) => {
//   res.send('<html><body>Hello <b>World</b></body></html>\n');
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


/*
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
const generateRandomString = () => {
  return Math.random().toString(36).substr(2,6);
};

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;

  const shortURL = generateRandomString();

  urlDatabase[shortURL] = longURL;

  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];

  if (longURL === undefined) {
    res.status(404).render("404_error");
    return;
  }

  let templateVars = {
    shortURL: shortURL,
    longURL: longURL
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

*/