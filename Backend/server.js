require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

const authRoutes = require('./routes/auth');

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>CAN BE /GET!</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
