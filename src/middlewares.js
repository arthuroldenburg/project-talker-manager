const { validateEmail, validateDate, getTalkerById } = require('./talker');

const HTTP_UNAUTHORIZED = 401;
// const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const SIX = 6;

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const validEmail = validateEmail(email);
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!validEmail) {
    return res.status(HTTP_BAD_REQUEST).json({
       message: 'O "email" deve ter o formato "email@email.com"' }); 
}
    next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório' }); 
  }
  if (password.length < SIX) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
next();
};

const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' }); 
}
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const ageN = Number(age);
  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (ageN < 18 || ageN !== Math.floor(ageN)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  // const { watchedAt } = talk;
  if (!talk.watchedAt) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!validateDate(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRateUndefined = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate && rate !== 0) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  next();
};

const validateRateNum = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const rateN = Number(rate);
  if (rateN < 1 || rateN > 5 || rateN !== Math.floor(rateN)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  next();
};

const attTalker = async (req, res, next) => {
  const { id } = req.params;
  const getTalkerId = await getTalkerById(Number(id));
  if (!getTalkerId) {
    return res.status(HTTP_NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  authToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRateUndefined,
  validateRateNum,
  validateRate,
  attTalker,
};