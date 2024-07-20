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

var addAnimal = function(name, age, spName) {
  if(DEBUG) console.log("species.pg.dal.addSpecies()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.\"Animals\"(\"Name\", \"Age\",\"Species_Name\") \
        VALUES ($1, $2, $3)";
    dal.query(sql, [name, age, spName], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var getAnimalById = function(id) {
  if(DEBUG) console.log("species.pg.dal.getgetSpecieBySpecieName()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT \"Aniaml_ID\" AS _id, \"Caretaker_ID FROM Aniamls WHERE Animal_ID = $1";
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

var patchAnimals = function(id, name, age) {
  if(DEBUG) console.log("animals.pg.dal.patchAnimal()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.\"Animals\" SET \"Name\"=$2, \"Age\"=$3,  WHERE \"Animal_ID\"=$1;";
    dal.query(sql, [id, name, age], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var putAnimals = function(id, name, age, specie) {
  if(DEBUG) console.log("animals.pg.dal.putAnimal()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.\"Animals\" SET \"Name\"=$2, \"Age\"=$3, \"Species_Name\"=$4 WHERE \"Animal_ID\"=$1;";
    dal.query(sql, [id, name, age, specie], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var deleteAnimals = function(id) {
  if(DEBUG) console.log("animals.pg.dal.deleteSpecies()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.\"Animals\" WHERE \"Animal_ID\" = $1;";
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
    getAnimals,
    addAnimal,
    getAnimalById,
    patchAnimals,
    putAnimals,
    deleteAnimals
}