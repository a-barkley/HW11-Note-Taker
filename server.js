const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json')
const uuid = require('./helpers/uuid')
const fs = require('fs');

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

app.get("/api/notes", (req, res) => {
    res.json(db);
})

app.post("/api/notes", (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: uuid(),
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response)
        db.push(newNote)

        fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
            if (err) {
                console.log(err)
            }
        })

        res.send(db);
    } else {
        res.send('Error in posting note');
    }
})




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})