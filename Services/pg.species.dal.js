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

module.exports = {
    getSpecies,
    addSpecies
}