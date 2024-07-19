const express = require('express');
const router = express.Router();
const speciesDAL = require('../Services/pg.species.dal')

router.get('/', async (req, res) => {

    try {
        let theSpecie = await speciesDAL.getSpecies(); 
        if(DEBUG) console.table(theSpecie);
        res.render('Species', {theSpecie});
    } catch {
        res.render('503');
    }
});

module.exports = router