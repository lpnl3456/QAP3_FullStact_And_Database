const express = require('express');
const router = express.Router();
const animalsDAL = require('../Services/pg.animals.dal')

//Method to get aninaml data from database and display onto the website
router.get('/', async (req, res) => {

    try {
        //Call the getAnimals method from animalsDAL to get the animals in the database
        let theAnimal = await animalsDAL.getAnimals(); 
        if(DEBUG) console.table(theAnimal);
        //Render the animals ejs page with the animal data from the database
        res.render('Animals', {theAnimal});
    } catch {
        //Render if there is an error with getting the data
        res.render('503');
    }
});

//Method to add an animal to the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("animals.POST");
    try {
        //Call the addAnimal method using the data the user submitted from the form
        await animalsDAL.addAnimal(req.body.name, req.body.age, req.body.speciesName);
        //Direct the user to the animals page
        res.redirect('/animals/');
    } catch {
        //Render if there is an error with adding the data
        res.render('503');
    } 
});

//Method to get the data of the animal the user wishes to edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('animals.Edit : ' + req.params.id);
    //Render the animal ejs file with the data of the animal the user wishes to edit
    res.render('patchAnimal.ejs', {name: req.query.name, age: req.query.age, theId: req.params.id});
});

//Method to get the data of the animal the user wishes to replace
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('animals.Edit : ' + req.params.id);
    //Render the putAnimals ejs file with the data of the animal the user wishes to replace
    res.render('putAnimals.ejs', {name: req.query.name, age: req.query.age, specieName: req.query.specieName, theId: req.params.id});
});

//Method to get the data of the animal the user wishes to delete
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('animals.delete : ' + req.params.id);
    //Render the deleteAnimal ejs file with the data of the animal the user wishes to delete
    res.render('deleteAnimal.ejs', {theId: req.params.id, name: req.query.name, age: req.query.age, specieName: req.query.specieName});
});



  //Method to edit an animal with inputed data
  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('animals.PATCH: ' + req.params.id);
    
    try {
        //Call the patchAnimals method to edit the animal data with the data the user inputed in a form
        await animalsDAL.patchAnimals(req.params.id, req.body.name, req.body.age);
        //direct the user to the animals page
        res.redirect('/animals/');
    } catch (err){
        console.log(err)
        // Enter if there is an error with editing the data
        res.render('503');

        
    }
});

//Method to replace an animal
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('animals.Put: ' + req.params.id);
    
    try {
        //Call upon the putAnimal method and replace the animal's data with the data the user inputed in the form
        await animalsDAL.putAnimals(req.params.id, req.body.name, req.body.age, req.body.specieName);
        //Direct the user back to the animals page
        res.redirect('/animals/');
    } catch {
        // Enter if there is an error with replacing the data
        res.render('503');

        
    }
});

//Method to delete the data from the databased
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('animals.DELETE: ' + req.params.id);
    try {
        //Call upon the deleteAnimals method to delete the animal
        await animalsDAL.deleteAnimals(req.params.id);
        //Direct the user to the animals page
        res.redirect('/animals/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // Enter if there is an error with deleting the data
        res.render('503');
    }
});



module.exports = router