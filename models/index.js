import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from '../config/db-config.js';

import pkg from 'sequelize';
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

import user from './user-model.js'


db.users = user(sequelize, DataTypes)

db.sequelize.sync({force:false}).then(()=>{
    console.log(' yes re-sync done !')
} );


export default db;




// import user from './user-model.js';
// const USERS = user.default(sequelize, DataTypes);
// export default users = require('./user-model.js').default(sequelize, DataTypes)



