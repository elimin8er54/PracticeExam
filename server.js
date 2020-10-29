const express = require('express');
const app = express();
const port = 80;
data = [];

app.use(express.json());

require('./routes/book.route.js')(app); 


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})