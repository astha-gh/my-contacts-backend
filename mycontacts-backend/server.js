const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const Connectdb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");


Connectdb();

app.use(cors());
app.use(express.json())
app.use('/api/contact', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Server is running ✅");
});
  

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});