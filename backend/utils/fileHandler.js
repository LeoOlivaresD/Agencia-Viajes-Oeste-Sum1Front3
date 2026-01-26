const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
};

const writeUsers = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error escribiendo usuarios:', error);
    return false;
  }
};

const findUserByEmail = (email) => {
  const data = readUsers();
  return data.users.find(user => user.email === email);
};

const findUserById = (id) => {
  const data = readUsers();
  return data.users.find(user => user.id === id);
};

const addUser = (user) => {
  const data = readUsers();
  data.users.push(user);
  return writeUsers(data);
};

const updateUser = (id, updates) => {
  const data = readUsers();
  const userIndex = data.users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return false;
  }
  
  data.users[userIndex] = { ...data.users[userIndex], ...updates };
  return writeUsers(data);
};

module.exports = {
  readUsers,
  writeUsers,
  findUserByEmail,
  findUserById,
  addUser,
  updateUser
};
