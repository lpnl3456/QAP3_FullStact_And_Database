const dal = require("./zoo_db");
const DEBUG = true;
//get all actors.
var getAnimals = function() {
  if(DEBUG) console.log("animals.pg.dal.getAnimals()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM public.\"Animals\"\
ORDER BY \"Animal_ID\" ASC;"
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
    getAnimals
}