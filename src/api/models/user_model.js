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

const addUser = async (user) => {
  const {name, username, email, role, password} = user;

  const sql = `
    INSERT INTO wsk_users
      (name, username, email, role, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [name, username, email, role, password];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return {user_id: result.insertId};
};

/*

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

*/


const modifyUser = async (user, id) => {
  const sql = promisePool.format(
    'UPDATE wsk_users SET ? WHERE user_id = ?',
    [user, id],
  );

  const [result] = await promisePool.execute(sql);

  if (result.affectedRows === 0) {
    return false;
  }

  return {message: 'User updated'};
};


export { listAllUsers, findUserById, addUser, modifyUser };