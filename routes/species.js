const express = require('express');
const router = express.Router();
const speciesDAL = require('../Services/pg.species.dal');

//Method to get species data from database and display onto the website
router.get('/', async (req, res) => {

    try {
        //Call the getSpecies method from caretakersDAL to get the species in the database
        let theSpecie = await speciesDAL.getSpecies(); 
        if(DEBUG) console.table(theSpecie);
        //Render the Species ejs page with the species data from the database
        res.render('Species', {theSpecie});
    } catch {
        //Render if there is an error with getting the dat
        res.render('503');
    }
});

//Method to add a species to the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("species.POST");
    try {
        //Call the addSpecies method with the data the user submitted from the form
        await speciesDAL.addSpecies(req.body.speciesName, req.body.scientificName, req.body.caretakerID);
        res.redirect('/Species/');
    } catch {
        //Render if there is an error with adding the data
        res.render('503');
    } 
});

//Method to get the data of the species the user wishes to edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('species.Edit : ' + req.params.id);
     //Render the specie ejs file with the data of the species the user wishes to edit
    res.render('patchSpecie.ejs', {caretakerID: req.query.CaretakerID, theId: req.params.id});
});

//Method to get the data of the speices the user wishes to replace
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('species.replace : ' + req.params.id);
    //Render the putSpecie ejs file with the data of the species the user wishes to replace
    res.render('putSpecie.ejs', {theId: req.params.id, scientificName: req.query.scientificName, caretakerID: req.query.CaretakerID});
});

//Method to get the data of the species the user wishes to delete
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('species.delete : ' + req.params.id);
    //Render the deleteSpecies ejs file with the data of the species the user wishes to delete
    res.render('deleteSpecies.ejs', {theId: req.params.id, scientificName: req.query.scientificName, caretakerID: req.query.CaretakerID});
});
   //Method to edit a species with inputed data
  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('species.PATCH: ' + req.params.id);
    try {
        //Call the patchSpecie method to edit the species data with the data the user inputed in a form
        await speciesDAL.patchSpecie(req.params.id, req.body.caretakerID);
        //direct the user to the species page
        res.redirect('/species/');
    } catch {
        //Enter if there is an error with editing the data
        res.render('503');

        
    }
});


//Method to replace a species
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('species.PUT: ' + req.params.id);
    try {
         //Call upon the putSpecies method and replace the species's data with the data the user inputed in the form
        await speciesDAL.putSpecies(req.params.id, req.body.scientificName, req.body.caretakerID);
        //Direct the user back to the species page
        res.redirect('/species/');
    } catch (error) {
        // Enter if there is an error with replacing the data
        res.render('503');
    }
});

//Method to delete the data from the databased
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('species.DELETE: ' + req.params.id);
    try {
         //Call upon the deleteSpecies and delete the species
        await speciesDAL.deleteSpecies(req.params.id);
        res.redirect('/species/');
    } catch (err) {
        if(DEBUG) console.error(err);
        if(err = 23503){
            // Enter if there is a 23503 error 
            res.render('23503Species');
        }
        else{
        // Enter if there is an error with deleting the data
        res.render('503');
        }
      
        
       
    }
});


module.exports = router