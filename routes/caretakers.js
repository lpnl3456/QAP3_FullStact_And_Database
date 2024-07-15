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

module.exports = router