const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;

let count = 0;

app.get('/', (_, res) => {
    count++;
    res.render('index', {clicks: count});
});

app.listen(port, () => console.log('listening on port: ' + port));
