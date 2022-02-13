const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/favicon.ico', express.static('views/favicon.ico'));

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

const port = process.env.PORT || 8080;

let count = 0;

app.get('/', (_, res) => {
    count++;
    res.render('index', {clicks: count});
});

app.listen(port, () => console.log('listening on port: ' + port));
