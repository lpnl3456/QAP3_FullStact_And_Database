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
    res.render('specie.ejs', {caretakerID: req.query.CaretakerID, theId: req.params.id});
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

router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('species.replace : ' + req.params.id);
    res.render('putSpecie.ejs', {theId: req.params.id, scientificName: req.query.scientificName, caretakerID: req.query.CaretakerID});
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('species.PUT: ' + req.params.id);
    try {
        await speciesDAL.putSpecies(req.params.id, req.body.scientificName, req.body.caretakerID);
        res.redirect('/species/');
    } catch (error) {
        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('species.DELETE: ' + req.params.id);
    try {
        await speciesDAL.deleteSpecies(req.params.id);
        res.redirect('/species/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // log this error to an error log file.
        //res.render('503');
    }
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('species.delete : ' + req.params.id);
    res.render('deleteSpecies.ejs', {theId: req.params.id, scientificName: req.query.scientificName, caretakerID: req.query.CaretakerID});
});

module.exports = router