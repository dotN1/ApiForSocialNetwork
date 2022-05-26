var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  res.send(user);
});

app.post("/users", function (req, res) {
  var user = {
    name: req.body.name,
    id: Date.now(),
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
  };
  items.push(user);
  res.send(user);
});

app.put("/users/:id", function (req, res) {
  var user = items.find(function (user) {
    return user.id === Number(req.params.id);
  });
  user.name = req.body.name;
  res.sendStatus(200);
});

app.delete("/users/:id", function (req, res) {
  items = items.filter(function (user) {
    return user.id !== Number(req.params.id);
  });
  res.sendStatus(200);
});

app.listen(3012, function () {
  console.log("API app started");
});
