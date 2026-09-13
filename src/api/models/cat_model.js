import promisePool from '../../utils/database.js';

const catItems = [
  {
    cat_id: 1,
    cat_name: 'Maung Maung',
    weight: 11,
    owner: 103,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 2,
    cat_name: 'Nyaung',
    weight: 8,
    owner: 104,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id],
  );
  
  return rows[0];
};

/* 
const addCat = (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const newId = Math.max(...catItems.map((item) => item.cat_id)) + 1;
  catItems.push({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return { cat_id: newId };
};
*/

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  const sql = `
    INSERT INTO wsk_cats
      (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [cat_name, weight, owner, filename, birthdate];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return {cat_id: result.insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(
    'UPDATE wsk_cats SET ? WHERE cat_id = ?',
    [cat, id],
  );

  const [result] = await promisePool.execute(sql);

  if (result.affectedRows === 0) {
    return false;
  }

  return {message: 'Cat updated'};
};

const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id],
  );

  if (result.affectedRows === 0) {
    return false;
  }

  return {message: 'Cat deleted'};
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat };