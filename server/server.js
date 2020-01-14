const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const upload = require('./upload').upload;

const app = express();
const port = 3000;

// const db = require('./models/PostgreSQL.js');

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// require('dotenv').config()
// const express = require('express')
// const cloudinary = require('cloudinary')
// const formData = require('express-form-data')
// const cors = require('cors')
// const { CLIENT_ORIGIN } = require('./config')
//
// const app = express()
//
// cloudinary.config({
//     cloud_name: db4s4zsts,
//     api_key: 857549634856591,
//     api_secret: ksnNIPMX3TUgRVkK4L6mEiHGiR0
// })
//
// app.use(cors({
//     origin: CLIENT_ORIGIN
// }))
//
// app.use(formData.parse())
//
// app.get('/wake-up', (req, res) => res.send('👌'))
//
// app.post('/image-upload', (req, res) => {
//
//     const values = Object.values(req.files)
//     const promises = values.map(image => cloudinary.uploader.upload(image.path))
//
//     Promise
//         .all(promises)
//         .then(results => res.json(results))
//         .catch((err) => res.status(400).json(err))
// })
//
// app.listen(process.env.PORT || 3000, () => console.log('👍'))
