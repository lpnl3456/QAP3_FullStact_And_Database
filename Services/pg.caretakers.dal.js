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

module.exports = {
    getCaretakers
}