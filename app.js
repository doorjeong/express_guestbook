var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev")); // 개발자모드로 로깅

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res){
    res.render("index");
    console.log("index", entries);
});
app.get("/new-entry", function(req, res){
    res.render("new-entry");
    console.log("new-entry");
});
app.post("/new-entry", function(req, res){
    if( !req.body.title || !req.body.body ){
        res.status(400).send("Entries must have a title and a body.");
        return;
    }
    entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});

app.use(function(req, res){
    res.status(404).render("404");
    console.log("404");
});

http.createServer(app).listen(3100, function(){
    console.log("Guestbook app stated on port 3100");
});
