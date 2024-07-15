import express from 'express';
import Router from './routes/router.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', Router)


app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));