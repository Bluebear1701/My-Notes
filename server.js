const express = require("express");
const notes = require("./db/db.json")
const path = require ('path')

const PORT = process.env.PORT || 3001;
const app = express();


//Midddlewarec
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


app.get('/notes', (req,res) => {
    res.sendFile(__dirname + "/public/notes.html");
});


app.get('/api/notes', (req,res) => {
    res.json(notes);
    console.log("reach")
});

app.post('/api/notes', (req,res) => {
    req.body.id = notes.length.toString();
    console.log(req.body)
});


app.get('*', (req,res) => {
   res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(3001, () => {
    console.log (`API server now on port 3001`)
})