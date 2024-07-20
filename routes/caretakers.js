const express = require('express');
const router = express.Router();
const caretakersDAL = require('../Services/pg.caretakers.dal')
console.log("Befor render");
router.get('/', async (req, res) => {

    try {
        let theCaretaker = await caretakersDAL.getCaretakers(); 
        console.log("Befor render");
        if(DEBUG) console.table(theCaretaker);
        
        res.render('Caretakers', {theCaretaker});
    } catch {
        res.render('503');
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("caretakers.POST");
    try {
        await caretakersDAL.addCaretaker(req.body.firstName, req.body.lastName, req.body.age, req.body.email );
        res.redirect('/caretakers/');
    } catch {
        // log this error to an error log file.
        //res.render('503');
    } 
});

// https://localhost:3000/actors/205/edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('caretaker.Edit : ' + req.params.id);
    res.render('caretaker.ejs', {firstName: req.query.FirstName, lastName: req.query.LastName, age: req.query.age, email: req.query.Email, theId: req.params.id});
});
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('caretaker.Edit : ' + req.params.id);
    res.render('putCaretaker.ejs', {firstName: req.query.FirstName, lastName: req.query.LastName, age: req.query.age, email: req.query.Email, theId: req.params.id});
});

router.get('/:id', async (req, res) => {
    try {
        const anCaretaker = await caretakersDAL.getCaretakerByActorId(req.params.id); // from postgresql
        if(DEBUG) console.log(`careTaker.router.get/:id ${anCaretaker}`);
        if (anCaretaker)
            res.render('caretaker', {anCaretaker});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
  });

  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('caretakers.PATCH: ' + req.params.id);
    try {
        await caretakersDAL.patchCaretaker(req.params.id, req.body.firstName, req.body.lastName, req.body.age, req.body.email);
        res.redirect('/caretakers/');
    } catch {
        // log this error to an error log file.
        //res.render('503');
    }
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('caretakers.PUT: ' + req.params.id);
    try {
        await caretakersDAL.putCaretaker(req.params.id, req.body.firstName, req.body.lastName, req.body.age, req.body.email);
        res.redirect('/caretakers/');
    } catch {
        // log this error to an error log file.
        //res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('caretakers.DELETE: ' + req.params.id);
    try {
        await caretakersDAL.deleteCaretaker(req.params.id);
        res.redirect('/caretakers/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // log this error to an error log file.
        //res.render('503');
    }
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('caretaker.delete : ' + req.params.id);
    res.render('deleteCaretaker.ejs', {theId: req.params.id, name: req.params.name, age: req.params.age, species: req.params.species});
});



module.exports = router