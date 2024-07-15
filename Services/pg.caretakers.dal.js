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

module.exports = {
    getCaretakers,
    addCaretaker
}