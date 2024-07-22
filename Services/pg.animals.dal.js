const dal = require("./zoo_db");
const DEBUG = true;
//get all animals.
var getAnimals = function() {
  if(DEBUG) console.log("animals.pg.dal.getAnimals()");
  return new Promise(function(resolve, reject) {
    //The select statement to get all the animals 
    const sql = "SELECT * FROM public.\"Animals\"\
ORDER BY \"Animal_ID\" ASC;"
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

//Add an animal
var addAnimal = function(name, age, spName) {
  if(DEBUG) console.log("species.pg.dal.addSpecies()");
  return new Promise(function(resolve, reject) {
    //Insert statement to add the animal
    const sql = "INSERT INTO public.\"Animals\"(\"Name\", \"Age\",\"Species_Name\") \
        VALUES ($1, $2, $3)";

        //query the data using the sql and the data imported from the form
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


//Edit an animal
var patchAnimals = function(id, name, age) {
  if(DEBUG) console.log("animals.pg.dal.patchAnimal()");
  return new Promise(function(resolve, reject) {
    //sql stattement to update the animal's data
    const sql = "UPDATE public.\"Animals\" SET \"Name\"=$2, \"Age\"=$3 WHERE \"Animal_ID\"=$1;";
    //query the data using the sql and data imported from the form
    dal.query(sql, [id, name, age], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

//Replace animal
var putAnimals = function(id, name, age, specie) {
  if(DEBUG) console.log("animals.pg.dal.putAnimal()");
  return new Promise(function(resolve, reject) {
    //sql stattement to replace the animal's data
    const sql = "UPDATE public.\"Animals\" SET \"Name\"=$2, \"Age\"=$3, \"Species_Name\"=$4 WHERE \"Animal_ID\"=$1;";
     //query the data using the sql and data imported from the form
    dal.query(sql, [id, name, age, specie], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

//Delete animals
var deleteAnimals = function(id) {
  if(DEBUG) console.log("animals.pg.dal.deleteSpecies()");
  return new Promise(function(resolve, reject) {
    //sql stattement to delete the animal's data
    const sql = "DELETE FROM public.\"Animals\" WHERE \"Animal_ID\" = $1;";
     //query the data using the sql and the ID from the URL
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};


//Export the methods
module.exports = {
    getAnimals,
    addAnimal,
    patchAnimals,
    putAnimals,
    deleteAnimals
}