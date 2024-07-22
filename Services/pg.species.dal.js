const dal = require("./zoo_db");
const DEBUG = true;
//get all species
var getSpecies = function() {
  if(DEBUG) console.log("species.pg.dal.getSpecies()");
  return new Promise(function(resolve, reject) {
    //The sql statement to get all the speciess
    const sql = "SELECT * FROM public.\"Species\"\
ORDER BY \"Species_Name\" ASC;"
//query the data using  sql
    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};
//Add species
var addSpecies = function(spName, scName, caretaker) {
    if(DEBUG) console.log("species.pg.dal.addSpecies()");
    return new Promise(function(resolve, reject) {
       //The sql statement to insert a new species
      const sql = "INSERT INTO public.\"Species\"(\"Species_Name\", \"Scientific_Name\",\"Caretaker_ID\") \
          VALUES ($1, $2, $3)";
          //query the data using  sql and data from the form
      dal.query(sql, [spName, scName, caretaker], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  //Edit a species
  var patchSpecie = function(id, caretakerID) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      //The sql statement to update a  species
      const sql = "UPDATE public.\"Species\" SET \"Caretaker_ID\"=$2 WHERE \"Species_Name\"=$1;";
      //query the data using  sql and data from the form
      dal.query(sql, [id, caretakerID], (err, result) => {
        if (err) {
          console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  //Replace a species
  var putSpecies = function(id, scName, caretakerID, ) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      //The sql statement to update a species
      const sql = "UPDATE public.\"Species\" SET \"Scientific_Name\"=$2, \"Caretaker_ID\" =$3 WHERE \"Species_Name\"=$1;";
      //query the data using  sql and data from the form
      dal.query(sql, [id, scName, caretakerID], (err, result) => {
        if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  //Delete a species
  var deleteSpecies = function(id) {
    if(DEBUG) console.log("species.pg.dal.deleteSpecies()");
    return new Promise(function(resolve, reject) {
      //The sql statement to delete a species
      const sql = "DELETE FROM public.\"Species\" WHERE \"Species_Name\" = $1;";
      //query the data using  sql and the ID from the URL
      dal.query(sql, [id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

module.exports = {
    getSpecies,
    addSpecies,
    patchSpecie,
    putSpecies,
    deleteSpecies
}