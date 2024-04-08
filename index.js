const express = require('express')
const cors = require('cors')
const path = require("path");
require("./conn/conn");
const app = express()
const port = 5050;


app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`iNoteBook Backend app listening at http://localhost:${port}`)
})