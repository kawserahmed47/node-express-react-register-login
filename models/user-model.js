module.exports =  (sequelize, DataTypes) =>{

    const User = sequelize.define('user', {

        first_name:{
            type : DataTypes.STRING,
            allowNull :true
        },

        last_name:{
            type : DataTypes.STRING,
            allowNull :true
        },

        user_name:{
            type : DataTypes.STRING,
            allowNull :false
        },

        profile_picture:{
            type : DataTypes.STRING,
            allowNull :true
        },

        email:{
            type : DataTypes.STRING,
            allowNull :false
        },

        password:{
            type : DataTypes.STRING,
            allowNull :false
        },

        user_type:{
            type : DataTypes.INTEGER,
            allowNull :true
        },

        status:{
            type : DataTypes.INTEGER,
            allowNull :true
        },

    })

    return User;
}