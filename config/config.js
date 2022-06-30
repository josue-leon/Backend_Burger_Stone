const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {

    }
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});


//JOSUE
/*
const databaseConfig = {
    'host': '127.0.0.1',
    'port':  5432,
    'database': 'BurgerStone',
    'user': 'postgres',
    'password': '0602100620' 
};*/

//ERIKA
const databaseConfig = {
    'host': '127.0.0.1',
    'port':  5432,
    'database': 'BurgerStone',
    'user': 'postgres',
    'password': 'ecka3011' 
};

/*
//ANDREA
const databaseConfig = {
    'host': '127.0.0.1', //192.168.100.15
    'port':  5432, //3000
    'database': 'BurgerStone',
    'user': 'postgres',
    'password': 'root' 
};
*/
const db = pgp(databaseConfig);
module.exports = db;