const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;


global.DEBUG = true;
app.set('view engine', 'ejs');
//app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!

app.get('/', (req, res) => {
    res.render('Index.ejs', { name: 'Cassian Andor'});
});

const animalsRouter = require('./routes/animals')
app.use('/animals', animalsRouter);

const speciesRouter = require('./routes/species')
app.use('/species', speciesRouter);

const caretakerRouter = require('./routes/caretakers')
app.use('/caretakers', caretakerRouter);

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});