const express = require('express');
const router = express.Router();
const speciesDAL = require('../Services/pg.species.dal');

router.get('/', async (req, res) => {

    try {
        let theSpecie = await speciesDAL.getSpecies(); 
        if(DEBUG) console.table(theSpecie);
        res.render('Species', {theSpecie});
    } catch {
        res.render('503');
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("species.POST");
    try {
        await speciesDAL.addSpecies(req.body.speciesName, req.body.scientificName, req.body.caretakerID);
        res.redirect('/Species/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

module.exports = router