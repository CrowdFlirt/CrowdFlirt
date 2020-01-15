const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const upload = require('./upload').upload;
const { fetchImage, postImage } = require('./fetch');

const app = express();
const port = 3000;


// app.get('/', (req, res) => res.send(''));
app.use(express.static(`${__dirname}/../public/dist`));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/upload', upload);

app.get('/db', fetchImage);
app.post('/db', postImage);
app.get('/images', (req, res) => {
    res.redirect(301, '/')
});
app.get('/post', (req, res) => {
    res.redirect(301, '/');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

