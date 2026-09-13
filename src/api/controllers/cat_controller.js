import {addCat, findCatById, listAllCats, modifyCat, removeCat} from '../models/cat_model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
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

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);

  if (result) {
    res.json({
      message: 'Cat item updated.',
      result,
    });
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);

  if (result) {
    res.json({
      message: 'Cat item deleted.',
      result,
    });
  } else {
    res.sendStatus(404);
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
