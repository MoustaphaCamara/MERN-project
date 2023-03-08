const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;

// connexion à la DB
connectDB();

const app = express();
// allow CORS
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware --> permet de traiter les données du "req"
// lecture en json + urlencoded (body de la req dans postman): x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

// lancer serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));
