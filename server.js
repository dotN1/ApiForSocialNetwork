let express = require("express");
let bodyParser = require("body-parser");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;

let app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let items = [
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

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/users", (req, res) => {
  db.collection("items")
    .find()
    .toArray((err, docs) => {
      if (err) throw err;
      res.send(docs);
    });
});

app.get("/users/:id", (req, res) => {
  db.collection("items").findOne(
    { _id: ObjectID(req.params.id) },
    (err, doc) => {
      if (err) throw err;
      res.send(doc);
    }
  );
});

app.post("/users", (req, res) => {
  let user = {
    name: req.body.name,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
  };
  db.collection("items").insertOne(user, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  let user = items.find(function (user) {
    return user.id === Number(req.params.id);
  });
  user.name = req.body.name;
  res.sendStatus(200);
});

app.delete("/users/:id", (req, res) => {
  items = items.filter(function (user) {
    return user.id !== Number(req.params.id);
  });
  res.sendStatus(200);
});

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) throw err;
  db = client.db("myDataBase");

  app.listen(3012, function () {
    console.log("API app started");
  });
});
