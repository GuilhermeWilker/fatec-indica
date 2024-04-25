import express from 'express';
import cors from 'cors';
import db from './app/database/db.js';

import api from './app/routes/api.js';
import auth from './app/routes/auth.js';
import favoritos from './app/routes/favoritos.js'
import relatorio from './app/routes/relatorio.js'

const app = express();

app.use(cors());

app.use(express.json());

app.use(api);
app.use(auth);
app.use(favoritos);
app.use(relatorio);

app.get('/', (req, res) => {
    res.json({ foo: 'bar' });
});

app.listen(4000);
