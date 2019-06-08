module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: DataTypes.STRING,

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
        }

        },
        profile:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isURL: true,
            }
        }

    });
    return User;
}
