const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = './talker.json';
  const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
  return JSON.parse(contentFile);
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

module.exports = {
  getAllTalkers,
  getTalkerById,
  generateToken,
};