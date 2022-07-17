console.log("May the node be with you");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;

//This line is in mongostr
MongoClient.connect(connectionString, { useUnifiedTopology: true
})
.then(client => {
console.log('Connected to Database');
const db = client.db('branches-and-names');
const branchesCollection = db.collection("branches");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(bodyParser.json())


app.listen(process.env.PORT || PORT, () => {
    console.log("listening on port 3000");
});


app.get("/", (req, res) => {  /*READ*/
    branchesCollection.find().toArray()
        .then(results => {
           // console.log(results)
            res.render('index.ejs',{branches: results})
        })
        .catch(error => console.error(error))
});


app.post("/branches", (req, res) =>{ /*CREATE*/
    branchesCollection.insertOne(req.body)
        .then(result => {
            //console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error));
});


app.put('/branches', (req,res) => { //update
    branchesCollection.findOneAndUpdate(
        {name: "null"},
        {
            $set: {
                name: req.body.name,
                branch: req.body.branch,
            }
        },
        {
            upsert: true
        }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})


    app.delete('/branches', (req,res) => {
        branchesCollection.deleteOne(
        {name: req.body.name }
        )
            .then(result => {
                if(result.deletedCount === 0){
                    return res.json("No null pairs to delete")
                }
                res.json("Deleted a null pair")
            })
            .catch(error => console.error(error))
    })
})
.catch(error => console.error(error));