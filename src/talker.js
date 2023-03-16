const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = './talker.json';
  const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
  return JSON.parse(contentFile);
};

const writeTalkerFile = async (talker) => {
  const path = './talker.json';
  await fs.writeFile(join(__dirname, path), JSON.stringify(talker));
};

const createTalker = async (name, age, talk) => {
  const file = await readTalkerFile();
  const newTalker = { id: file.length + 1, name, age, talk };
  file.push(newTalker);
  await writeTalkerFile(file);
  return newTalker;
};

const updateTalker = async (id, newTalker) => {
  const file = await readTalkerFile();
  const findTalker = file.find((talker) => talker.id === id);
  findTalker.name = newTalker.name;
  findTalker.age = newTalker.age;
  findTalker.talk = newTalker.talk;
  file[id - 1] = findTalker;
  await writeTalkerFile(file);
  return findTalker;
};

const deleteTalker = async (id) => {
  const data = await readTalkerFile();
  const talkerExist = data.some((talker) => talker.id === id);
  if (talkerExist) {
    const newFile = data.filter((talker) => talker.id !== id);
    await writeTalkerFile(newFile);
    return true;
  }
  return false;
};

const getAllTalkers = async () => {
  const readFile = await readTalkerFile();
  return readFile;
};

const getTalkerById = async (talkerId) => {
  const readFile = await readTalkerFile();
  return readFile.find(({ id }) => id === talkerId);
};

const generateToken = () => {
  const length = 16;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateDate = (date) => {
  const regex = /(\d{2})[/](\d{2})[/](\d{4})/.exec(date);
  if (regex === null) {
    return false;
  }

  const day = regex[1];
  const month = regex[2];
  const year = regex[3];
  const data = new Date(year, month, day);
  return data.getDate() === Number(day)
  && data.getMonth() === Number(month) && data.getFullYear() === Number(year);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  generateToken,
  validateEmail,
  validateDate,
  createTalker,
  updateTalker,
  deleteTalker,
};