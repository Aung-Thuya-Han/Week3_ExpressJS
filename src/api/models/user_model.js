/*

const userItems = [
  {
    user_id: 3609,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 3610,
    name: "Aung",
    username: "aungthuyahan",
    email: "aungthuh@metropolia.fi",
    role: "student",
    password: "plainjane",
  },
];

*/

import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT * FROM wsk_users',
  );

  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id],
  );

  return rows[0];
};

/*

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

*/

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = Math.max(...userItems.map((item) => item.user_id)) + 1;
  userItems.push({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return { user_id: newId };
};

export { listAllUsers, findUserById, addUser };