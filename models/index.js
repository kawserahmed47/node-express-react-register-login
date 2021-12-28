const DB = require('../config/db-config.js').DB;
const USER = require('../config/db-config.js').USER;
const PASSWORD = require('../config/db-config.js').PASSWORD;
const HOST = require('../config/db-config.js').HOST;
const  _dialect = require('../config/db-config.js').dialect;
const  _pool = require('../config/db-config.js').pool;
const pkg = require('sequelize');
const { Sequelize, DataTypes } = pkg;


const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,{
        host: HOST,
        dialect: _dialect,
        operatorsAliases: false,

        pool: {
            max : _pool.max,
            min : _pool.min,
            acquire: _pool.acquire,
            idle : _pool.idle
        }
    }

);

sequelize.authenticate().then(()=>function(){
    console.log("Database Connected.");
}).catch(err =>{
    console.log("Database Connection Error: "+err);
})





const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

const user = require('./user-model.js');

db.users = user(sequelize, DataTypes)

db.sequelize.sync({force:false}).then(()=>{
    console.log(' yes re-sync done !')
} );


// export default db;
module.exports = db;



// import user from './user-model.js';
// const USERS = user.default(sequelize, DataTypes);
// export default users = require('./user-model.js').default(sequelize, DataTypes)



