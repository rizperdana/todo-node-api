import express from 'express';

require('dotenv').config()
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => res.send('Hello world'));
app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
