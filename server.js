const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB Config;
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database Connected`))
    .catch((err) => console.error(err));

app.use('/', require('./routes/index'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.export = app;
