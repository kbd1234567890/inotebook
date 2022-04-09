
const connectToMongo = require('./db');
const express = require('express')
const app = express()
const port = 4000

connectToMongo();
// To read json sent as a request
app.use(express.json());

//Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Kanifanath!');
})

app.listen(port, () => {
  console.log(`inotebook Server listening at http://localhost:${port}/`)
})
