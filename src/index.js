require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT;

const url = process.env.URL;
const token = process.env.TOKEN;

const fetchData = () => {
    axios({
        method: 'get',
        url,
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

app.get('/', async (req, res) => {
    fetchData();
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
