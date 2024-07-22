const express = require('express');
const router = express.Router();
const caretakersDAL = require('../Services/pg.caretakers.dal')
console.log("Befor render");
router.get('/', async (req, res) => {

    //Method to get caretaker data from database and display onto the website
    try {
        //Call the getCaretakers method from caretakersDAL to get the caretakers in the database
        let theCaretaker = await caretakersDAL.getCaretakers(); 
        if(DEBUG) console.table(theCaretaker);
        //Render the Caretakers ejs page with the caretaker data from the database
        res.render('Caretakers', {theCaretaker});
    } catch {
        //Render if there is an error with getting the data
        res.render('503');
    }
});

//Method to add a caretakers to the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("caretakers.POST");
    try {
        //Call the addCaretaker method with the data the user submitted from the form
        await caretakersDAL.addCaretaker(req.body.firstName, req.body.lastName, req.body.age, req.body.email );
        res.redirect('/caretakers/');
    } catch {
        //Render if there is an error with adding the data
        res.render('503');
    } 
});

//Method to get the data of the caretaker the user wishes to edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('caretaker.Edit : ' + req.query.Age);
        //Render the caretaker ejs file with the data of the caretaker the user wishes to edit
    res.render('patchCaretaker.ejs', {firstName: req.query.FirstName, lastName: req.query.LastName, age: req.query.Age, email: req.query.Email, theId: req.params.id});
});

//Method to get the data of the caretaker the user wishes to replace
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('caretaker.Edit : ' + req.params.id);
    //Render the putCaretaker ejs file with the data of the caretaker the user wishes to replace
    res.render('putCaretaker.ejs', {firstName: req.query.FirstName, lastName: req.query.LastName, age: req.query.Age, email: req.query.Email, theId: req.params.id});
});

//Method to get the data of the caretaker the user wishes to delete
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('caretaker.delete : ' + req.params.id);
    //Render the deleteCaretaker ejs file with the data of the caretaker the user wishes to delete
    res.render('deleteCaretaker.ejs', {theId: req.params.id, firstName: req.query.FirstName, lastName: req.query.LastName, age: req.query.Age, email: req.query.Email});
});

    //Method to edit a caretaker with inputed data
  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('caretakers.PATCH: ' + req.params.id);
    try {
        //Call the patchCaretaker method to edit the caretaker data with the data the user inputed in a form
        await caretakersDAL.patchCaretaker(req.params.id, req.body.firstName, req.body.lastName, req.body.age, req.body.email);
         //direct the user to the caretakers page
        res.redirect('/caretakers/');
    } catch {
        //Enter if there is an error with editing the data
        res.render('503');
    }
});

//Method to replace a caretaker
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('caretakers.PUT: ' + req.params.id);
    try {
        //Call upon the putCaretaker method and replace the caretaker's data with the data the user inputed in the form
        await caretakersDAL.putCaretaker(req.params.id, req.body.firstName, req.body.lastName, req.body.age, req.body.email);
        //Direct the user back to the caretakers page
        res.redirect('/caretakers/');
    } catch {
        // Enter if there is an error with replacing the data
        res.render('503');
    }
});

//Method to delete the data from the databased
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('caretakers.DELETE: ' + req.params.id);
    try {
        //Call upon the deleteCaretaker and delete the caretaker
        await caretakersDAL.deleteCaretaker(req.params.id);
         //Direct the user to the animals page
        res.redirect('/caretakers/');
    } catch (err) {
        if(DEBUG) console.error(err);
        if(err = 23503){
            // Enter if there is a 23503 error 
            res.render('23503caretaker');
        }
        else{
    res.render('503');
        // Enter if there is an error with deleting the data
        res.render('503');
        }
    }
});





module.exports = router