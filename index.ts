import express from 'express';
import cors from 'cors';

require('dotenv').config()
const app = express();
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// welcome route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to todo-api" });
});


// set port for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
