let express = require("express");
let bodyParser = require("body-parser");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;

let app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/users", (req, res) => {
  db.collection("items")
    .find()
    .toArray((err, docs) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      res.send(docs);
    });
});

app.get("/users/:id", (req, res) => {
  db.collection("items").findOne(
    { _id: ObjectID(req.params.id) },
    (err, doc) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
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
  db.collection("items").insert(user, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  db.collection("items").updateOne(
    { _id: ObjectID(req.params.id) },
    { $set: { name: req.body.name } },
    (err, result) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/users/:id", (req, res) => {
  db.collection("items").deleteOne(
    { _id: ObjectID(req.params.id) },
    (err, result) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      res.sendStatus(200);
    }
  );
});

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) throw err;
  db = client.db("myDataBase");

  app.listen(3012, function () {
    console.log("API app started");
  });
});
