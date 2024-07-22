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

router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('animals.Edit : ' + req.params.id);
    res.render('animal.ejs', {name: req.query.name, age: req.query.age, theId: req.params.id});
});

router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('animals.Edit : ' + req.params.id);
    res.render('putAnimals.ejs', {name: req.query.name, age: req.query.age, specieName: req.query.specieName, theId: req.params.id});
});

router.get('/:id', async (req, res) => {
    try {
        const anAnimal = await animalsDAL.getAnimalById(req.params.Animal_ID); // from postgresql
        if(DEBUG) console.log(`animal.router.get/:id ${anAnimal}`);
        if (anAnimal)
            res.render('animal', {anAnimal});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
  });

  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('animals.PATCH: ' + req.params.id);
    
    try {
        await animalsDAL.patchAnimals(req.params.id, req.body.name, req.body.age);
        res.redirect('/animals/');
    } catch {
        // log this error to an error log file.
        //res.render('503');

        
    }
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('animals.Put: ' + req.params.id);
    
    try {
        await animalsDAL.putAnimals(req.params.id, req.body.name, req.body.age, req.body.specieName);
        res.redirect('/animals/');
    } catch {
        // log this error to an error log file.
        //res.render('503');

        
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('animals.DELETE: ' + req.params.id);
    try {
        await animalsDAL.deleteAnimals(req.params.id);
        res.redirect('/animals/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // log this error to an error log file.
        //res.render('503');
    }
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('animals.delete : ' + req.params.id);
    res.render('deleteAnimal.ejs', {theId: req.params.id, name: req.query.name, age: req.query.age, specieName: req.query.specieName});
});

module.exports = router