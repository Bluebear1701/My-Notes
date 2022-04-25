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

// creating GET routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
//     console.log("reach")
// });

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
    // res.json(notes);
});

// function createNewNote(body, notes) {
//     const note = body;
//     notes.push(note);
//     fs.writeFileSync(
//       path.join(__dirname, "./db/db.json"),
//       JSON.stringify({ notes: note }, null, 2)
//     );
//     return note;
//   }

app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        uuidv4();
        console.log (noteRequest)

        // const newNoteID = notes.length + 1;
        // const newNote = {
        //     id: newNoteID,
        //     title: noteRequest.title,
        //     text: noteRequest.text
        // };
        notes.push(noteRequest);
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), function (err) {
            if (err) throw err;
            res.json(noteRequest);
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});