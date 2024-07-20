const dal = require("./zoo_db");
const DEBUG = true;
//get all actors.
var getSpecies = function() {
  if(DEBUG) console.log("species.pg.dal.getSpecies()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM public.\"Species\"\
ORDER BY \"Species_Name\" ASC;"
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

var addSpecies = function(spName, scName, caretaker) {
    if(DEBUG) console.log("species.pg.dal.addSpecies()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO public.\"Species\"(\"Species_Name\", \"Scientific_Name\",\"Caretaker_ID\") \
          VALUES ($1, $2, $3)";
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

  var getSpecieBySpecieName = function(id) {
    if(DEBUG) console.log("species.pg.dal.getgetSpecieBySpecieName()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT \"Species_Name\" AS _id, \"Caretaker_ID FROM \" Species WHERE Species_Name = $1";
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

  var patchSpecie = function(id, caretakerID) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.\"Species\" SET \"Caretaker_ID\"=$2 WHERE \"Species_Name\"=$1;";
      dal.query(sql, [id, caretakerID], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  var putSpecies = function(id, scName, caretakerID, ) {
    if(DEBUG) console.log("catetakers.pg.dal.patchCaretaker()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.\"Species\" SET \"Scientific_Name\"=$2, \"Caretaker_ID\" =$3 WHERE \"Species_Name\"=$1;";
      dal.query(sql, [id, scName, caretakerID], (err, result) => {
        if (err) {
            console.log(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  var deleteSpecies = function(id) {
    if(DEBUG) console.log("species.pg.dal.deleteSpecies()");
    return new Promise(function(resolve, reject) {
      const sql = "DELETE FROM public.\"Species\" WHERE \"Species_Name\" = $1;";
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
    getSpecieBySpecieName,
    patchSpecie,
    putSpecies,
    deleteSpecies
}