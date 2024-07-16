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
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('species.Edit : ' + req.params.id);
    res.render('specie.ejs', {caretakerID: req.query.caretakerID, theId: req.params.id});
});

router.get('/:id', async (req, res) => {
    try {
        const aSpecies = await speciesDAL.getSpecieBySpecieName(req.params.speciesName); // from postgresql
        if(DEBUG) console.log(`careTaker.router.get/:id ${aSpecies}`);
        if (anCaretaker)
            res.render('specie', {aSpecies});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
  });

  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('species.PATCH: ' + req.params.id);
    
    try {
        console.log("Passed Patch");
        await speciesDAL.patchSpecie(req.params.id, req.body.caretakerID);
        console.log("Passed Patch");
        res.redirect('/species/');
    } catch {
        // log this error to an error log file.
        //res.render('503');

        
    }
});

module.exports = router