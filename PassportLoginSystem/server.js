const express = require("express");
const app = express();
var path = require("path");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Issa" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {

});

app.listen(3000);
