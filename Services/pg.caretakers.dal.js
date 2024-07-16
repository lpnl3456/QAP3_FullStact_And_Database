const dal = require("./zoo_db");
const DEBUG = true;
//get all caretakers.
var getCaretakers = function() {
  if(DEBUG) console.log("species.pg.dal.getSpecies()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM public.\"Caretakers\"\
ORDER BY \"Caretaker_ID\" ASC ;"
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getCaretakerByActorId = function(id) {
    if(DEBUG) console.log("caretakers.pg.dal.getCaretakerByActorId()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT \"Caretaker_ID\" AS _id, \"First_Name\", \"Last_Name\",\"Age\", \"Email\" FROM \"Caretakers WHERE Caretaker_ID = $1";
      dal.query(sql, [id], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

var addCaretaker = function(fname, lname, age, email) {
    if(DEBUG) console.log("caretakers.pg.dal.addActor()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO public.\"Caretakers\"(\"First_Name\", \"Last_Name\",\"Age\", \"Email\") \
          VALUES ($1, $2, $3, $4);";
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

  var patchCaretaker = function(id, fname, lname, age, email) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.\"Caretakers\" SET \"First_Name\"=$2, \"Last_Name\"=$3, \"Age\" =$4, \"Email\"=$5 WHERE \"Caretaker_ID\"=$1;";
      dal.query(sql, [id, fname, lname, age, email], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  
  var putCaretaker = function(id, fname, lname, age, email) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.\"Caretakers\" SET \"First_Name\"=$2, \"Last_Name\"=$3, \"Age\" =$4, \"Email\"=$5 WHERE \"Caretaker_ID\"=$1;";
      dal.query(sql, [id, fname, lname, age, email], (err, result) => {
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
    getCaretakerByActorId,
    patchCaretaker,
    putCaretaker
}