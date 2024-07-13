const express = require('express');
const router = express.Router();
const animalsDAL = require('../Services/pg.animals.dal')

router.get('/', async (req, res) => {

    try {
        let theAnimal = await animalsDAL.getAnimals(); 
        if(DEBUG) console.table(theAnimal);
        res.render('Animals', {theAnimal});
    } catch {
        res.render('503');
    }
});

module.exports = router