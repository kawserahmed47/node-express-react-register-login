module.exports =  (sequelize, DataTypes) =>{

    const ForgetPassword = sequelize.define('forget_passwod', {



        email:{
            type : DataTypes.STRING,
            allowNull :false
        },

        token:{
            type : DataTypes.STRING,
            allowNull :false
        },

        expire:{
            type : DataTypes.DATE,
            allowNull :false
        },




        status:{
            type : DataTypes.INTEGER,
            allowNull :true
        },

    })

    return ForgetPassword;
}