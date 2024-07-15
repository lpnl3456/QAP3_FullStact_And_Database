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

router.post('/', async (req, res) => {
    if(DEBUG) console.log("animals.POST");
    try {
        await animalsDAL.addAnimal(req.body.name, req.body.age, req.body.speciesName);
        res.redirect('/animals/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

module.exports = router