import { addCat, findCatById, listAllCats } from '../models/cat_model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);



  const newCat = {
  ...req.body,
  weight: Number(req.body.weight),
  owner: Number(req.body.owner),
  filename: req.file.filename,
};



  const result = addCat(newCat);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  res.json({ message: 'Cat item updated.' });
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  res.json({ message: 'Cat item deleted.' });
  res.sendStatus(200);
};

export { getCat, getCatById, postCat, putCat, deleteCat };
