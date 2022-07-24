const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db/db.json')
const uuid = require('./helpers/uuid')


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

})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})