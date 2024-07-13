const express = require('express');
const router = express.Router();
const animalsDAL = require('../Services/pg.animals.dal')
console.log("Enter animals");
router.get('/', async (req, res) => {
    console.log("Enter animals");
    try {
        let theAnimal = await animalsDAL.getAnimals(); 
        if(DEBUG) console.table(theAnimal);
        res.render('Animals', {theAnimal});
    } catch {
        res.render('503');
    }
});

module.exports = router