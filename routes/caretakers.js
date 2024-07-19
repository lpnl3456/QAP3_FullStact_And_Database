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

module.exports = router