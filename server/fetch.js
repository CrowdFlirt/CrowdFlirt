const { client } = require('./models/PostgreSQL.js');


// CREATE TABLE images (
//     image_id serial,
//     url text
// );

const fetchImage = (req, res) => {
    const query = 'SELECT url FROM images WHERE image_id > 0';
    console.log('Here!')
    client
        .query(query)
        .then((data) => {
            res.status(200).send(data.rows);
        })
        .catch(e => console.error(e.stack));
};

const postImage = (req, res) => {
    const url  = req.body.data;
    const insert = `INSERT INTO images(url) values('${url}')`;
    client
        .query(insert)
        .catch(e => console.error(e.stack));

};

module.exports = { fetchImage, postImage };
