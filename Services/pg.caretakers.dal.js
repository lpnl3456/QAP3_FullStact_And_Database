const dal = require("./zoo_db");
const DEBUG = true;
//get all caretakers.
var getCaretakers = function() {
  if(DEBUG) console.log("caretakers.pg.dal.getSpecies()");
  return new Promise(function(resolve, reject) {
    //The sql statement to get all the caretakers 
    const sql = "SELECT * FROM public.\"Caretakers\"\
ORDER BY \"Caretaker_ID\" ASC ;"
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
  //Add a caretaker
var addCaretaker = function(fname, lname, age, email) {
    if(DEBUG) console.log("caretakers.pg.dal.addActor()");
    return new Promise(function(resolve, reject) {
      //The sql statement to  insert a caretaker
      const sql = "INSERT INTO public.\"Caretakers\"(\"First_Name\", \"Last_Name\",\"Age\", \"Email\") \
          VALUES ($1, $2, $3, $4);";
          //query the data using  sql and data from the form
      dal.query(sql, [fname, lname, age, email], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  //Edit a caretaker
  var patchCaretaker = function(id, fname, lname, age, email) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      //The sql statement to  update the caretaker
      const sql = "UPDATE public.\"Caretakers\" SET \"First_Name\"=$2, \"Last_Name\"=$3, \"Age\" =$4, \"Email\"=$5 WHERE \"Caretaker_ID\"=$1;";
      //query the data using  sql and data from the form
      dal.query(sql, [id, fname, lname, age, email], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  
  //Replace a caretaker
  var putCaretaker = function(id, fname, lname, age, email) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      //The sql statement to  update the caretaker
      const sql = "UPDATE public.\"Caretakers\" SET \"First_Name\"=$2, \"Last_Name\"=$3, \"Age\" =$4, \"Email\"=$5 WHERE \"Caretaker_ID\"=$1;";
      //query the data using  sql and data from the form
      dal.query(sql, [id, fname, lname, age, email], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  //Delete caretaker
  var deleteCaretaker = function(id) {
    if(DEBUG) console.log("caretaker.pg.dal.deleteSpecies()");
    return new Promise(function(resolve, reject) {
      //The sql statement to  delete the caretake
      const sql = "DELETE FROM public.\"Caretakers\" WHERE \"Caretaker_ID\" = $1;";
      //query the data using  sql and id from the URL
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
    getCaretakers,
    addCaretaker,
    patchCaretaker,
    putCaretaker,
    deleteCaretaker
}