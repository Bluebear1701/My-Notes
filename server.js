const notes = require("./db/db.json")
const express = require("express");
const path = require('path')
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3001;


//Midddlewarec
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// creating GET route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});
//creating post route
app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        req.body.id = uuidv4();
        console.log(noteRequest)

        notes.push(noteRequest);
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), function (err) {
            if (err) throw err;
            res.json(noteRequest);
        });
    });
});
//sending route back to index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});