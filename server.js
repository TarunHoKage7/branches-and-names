console.log("May the node be with you");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
//this line is in note
MongoClient.connect(connectionString, (err, client) => {
    if(err) return console.error(err);
    console.log("Connected to Database");
})


app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/branch", (req, res) =>{
    console.log(req.body);
})