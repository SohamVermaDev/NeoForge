require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>CAN BE /GET!</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
