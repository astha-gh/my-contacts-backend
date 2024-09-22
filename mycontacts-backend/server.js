const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const Connectdb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

Connectdb();

app.use(express.json())
app.use('/api/contact', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});