const express = require("express");
const morgan = require("morgan"); // Morgan helps us know what is happening on the server (request details, status codes, response time)

const app = express();
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.post("/api/auth/register", (req, res) => {
  res.send("Register endpoint");
});

app.get("/", (req, res) => {
  res.render("index", {
    message: [
      "Hello EJS",
      "Welcome to the Express view engine",
      "This is a simple message",
      "Enjoy coding with EJS"
    ],
  });

  app.get('/html',(req,res)=>{
    res.render("html", {
        htmls: [
            `<h1>Hello World</h1>`,
            `<h2>This is a simple HTML snippet</h2>`,
            `<p>This ia a paragraph</p>`,
            `<button>Click Me</button>`

        ]
    })
  })



});

module.exports = app;
