const express = require('express');
const { authToken, emailValidation, passwordValidation, validateName,
  validateAge, validateTalk, validateWatchedAt, validateRateUndefined,
  validateRateNum, 
  attTalker } = require('./middlewares');
const { getAllTalkers, getTalkerById, generateToken, createTalker,
  deleteTalker, 
  updateTalker } = require('./talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
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

app.post('/login', emailValidation, passwordValidation, (req, res) => {
  const token = generateToken();
  res.setHeader('Authorization', token);
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', authToken, validateName, validateAge,
validateTalk, validateWatchedAt, validateRateUndefined, validateRateNum,
async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalker = await createTalker(name, age, talk);
  return res.status(HTTP_CREATED).json(newTalker);
});

app.put('/talker/:id', authToken, validateName, validateAge, validateTalk,
validateWatchedAt, validateRateUndefined, validateRateNum, attTalker, async (req, res) => {
  const newTalker = req.body;
  const { id } = req.params;
  const talkerUpdated = await updateTalker(Number(id), newTalker);
  return res.status(HTTP_OK_STATUS).json(talkerUpdated);
  });

app.delete('/talker/:id', authToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  return res.status(HTTP_NO_CONTENT).end();
});

app.get('/talker/search', (req, res) => {
  const xablau = req.query;
  return res.status(HTTP_OK_STATUS).json({ message: xablau }); 
});
