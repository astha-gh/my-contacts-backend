const express = require('express');
const dotenv = require('dotenv').config();
const cors = require("cors");
const errorHandler = require('./middleware/errorHandler');
const Connectdb = require('./config/dbConnection');
const app = express();
const port = process.env.PORT || 8080;

Connectdb();

app.use(cors({
    origin: '*'
}));


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running ✅");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use('/api/contact', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
