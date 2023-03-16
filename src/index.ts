var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.redirect("https://expressjs.com/");
});

app.listen(3000, () => {
  console.log(`Express listening on port 3000`);
});
