 const HOST = 'localhost';
 const USER = 'root';
 const PASSWORD = '';
 const DB = 'ever_re_api';
 const dialect = 'mysql';
 const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};

module.exports ={HOST, USER, PASSWORD, DB, dialect, pool}

//  const HOST = 'localhost';
//  const USER = 'ever_ever';
//  const PASSWORD = '#}baUF(R;GTY';
//  const DB = 'ever_user';
//  const dialect = 'mysql';
//  const pool = {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
// };

// module.exports ={HOST, USER, PASSWORD, DB, dialect, pool}


