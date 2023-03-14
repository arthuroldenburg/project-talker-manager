const express = require('express');
const { getAllTalkers, getTalkerById, generateToken } = require('./talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// -------------------------------------------------------------------------------------------

app.get('/talker', async (req, res) => {
  const talkers = await getAllTalkers();
  return talkers ? (
    res.status(HTTP_OK_STATUS).json(talkers)) : (
    res.status(HTTP_OK_STATUS).json({ talkers: [] }));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const getTalker = await getTalkerById(Number(id));
  return getTalker ? (
    res.status(HTTP_OK_STATUS).json(getTalker)) : (
    res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' })
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  return (email && password) ? (
    res.status(HTTP_OK_STATUS).json({ token: generateToken() })
  ) : (
    res.status(HTTP_NOT_FOUND).json()
  );
});
