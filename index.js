const fs = require('fs');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

let count = getCount();

app.get('/', (_, res) => {
    count++;
    res.render('index', {clicks: count});
});

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('uncaughtException', exitHandler);

app.listen(8080, () => console.log('listening on port 8080'));

function exitHandler() {
    fs.writeFileSync('counts.txt', `${count}`);
    process.exit();
};

function getCount() {
    try {
        return parseInt(fs.readFileSync('./counts.txt'), 10);
    } catch (e) {
        return 0;
    }
}