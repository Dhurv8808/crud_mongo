const express = require('express');
const router = express.Router();
const Alien = require('../model/alien');

router.get('/', async (req, res) => {
  // console.log('Get All Aliens');
  // res.send('Got All Aliens');
  try {
    const aliens = await Alien.find({}, { "name": 0 });

    res.json({ data: aliens });
  } catch (err) {
    console.log(err);
    res.send('Error');
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const alien = new Alien({
      name: req.body.name,
      tech: req.body.tech,
      email: req.body.email,
      is_admin: req.body.is_admin,
      date: req.body.date
    });

    const data = await alien.save();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error');
  }
});

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const alien = await Alien.findById(req.params.id);

    res.json(alien);
  } catch (err) {
    console.log(err);
    res.send('Error');
  }
});

router.patch('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const alien = await Alien.findById(req.params.id);
    alien.is_admin = req.body.is_admin;

    const data = await alien.save();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.send('Error');
  }
});

router.delete('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const alien = await Alien.findById(req.params.id);

    if (!alien) res.send('Data not found');

    const data = await alien.remove();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.send('Error');
  }
});

module.exports = router;
