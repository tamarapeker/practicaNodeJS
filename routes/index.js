var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const restaurantsFilePath = path.join(__dirname, '../data/dataBase.json');
const restaurants = JSON.parse(fs.readFileSync(restaurantsFilePath, 'utf-8'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ingresar', function(req,res){
  res.render('ingresarRestaurante')
})
router.post('/ingresar', function(req,res){
  let newRestaurant = req.body
  newRestaurant = {
    name: req.body.name,
    kind: req.body.kind,
    songs: [req.body.song1, req.body.song2, req.body.song3]
  }
  restaurants.push(newRestaurant)
      fs.writeFileSync(restaurantsFilePath, JSON.stringify(restaurants));
      res.send('ingreso exitoso')
})

router.get('/listado', function(req,res){
    res.render('listado', {restaurants})
})

router.get('/:kindOf', function(req,res){
  let kindOf = req.params.kindOf
  res.render("tiposRestaurantes", {restaurants, kindOf})
})

module.exports = router;
