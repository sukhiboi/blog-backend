const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.end('hello world'));

const PORT = 4000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
