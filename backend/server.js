const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;

// connexion à la DB
connectDB();

const app = express();

// Middleware --> permet de traiter les données du "req"
// lecture en json + urlencoded (body de la req dans postman): x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

// lancer serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));
