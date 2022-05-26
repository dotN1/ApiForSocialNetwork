var express = require("express");

var app = express();

var items = [
  {
    name: "truealesya",
    id: 24208,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
  },
  {
    name: "Shamaich",
    id: 24207,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
  },
  {
    name: "Oleksandr_Kozak",
    id: 24206,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
  },
];

app.get("/", function (req, res) {
  res.send("Hello API");
});

app.get("/users", function (req, res) {
  res.send(items);
});

app.get("/users/:id", function (req, res) {
  var user = items.find(function (user) {
    return user.id === Number(req.params.id);
  });
  res.send(user)
});

app.listen(3012, function () {
  console.log("API app started");
});
