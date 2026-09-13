import { addUser, findUserById, listAllUsers, modifyUser, removeUser } from "../models/user_model.js";

/*

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const User = findUserById(req.params.id);
  if (User) {
    res.json(User);
  } else {
    res.sendStatus(404);
  }
};

*/

const getUser = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

/* 

const postUser = (req, res) => {
  console.log("req.body", req.body);
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: "New User added.", result });
  } else {
    res.sendStatus(400);
  }
};

*/

const postUser = async (req, res) => {
  const result = await addUser(req.body);

  if (result) {
    res.status(201).json({
      message: 'New user added.',
      result,
    });
  } else {
    res.sendStatus(400);
  }
};

/*

const putUser = (req, res) => {
  res.json({ message: 'User item updated.' });
  res.sendStatus(200);
};



const deleteUser = (req, res) => {
  res.json({ message: 'User item deleted.' });
  res.sendStatus(200);
};

*/

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);

  if (result) {
    res.json({
      message: 'User and their cats deleted.',
      result,
    });
  } else {
    res.sendStatus(404);
  }
};

const putUser = async (req, res) => {
  const result = await modifyUser(req.body, req.params.id);

  if (result) {
    res.json({
      message: 'User item updated.',
      result,
    });
  } else {
    res.sendStatus(404);
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };