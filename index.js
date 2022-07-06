const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const getStatus = require('./apis/getStatus');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: "*",
    methods: ["*"]
}));

app.use('/api/getStatus', getStatus);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));