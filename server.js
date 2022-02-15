const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const db = require("./app/models");
const todoRouter = require("./app/routes/todo");

const app = express();

require('dotenv').config();
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

app.use("/api/todos", todoRouter);

// routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to TODO Api" });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});