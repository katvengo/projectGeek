var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            unique: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
            validate: {
                isNumeric: true,
            }

        },
        profile: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isURL: true,
            // }
        },

        interests: {
            type: DataTypes.STRING,
        },

        fandom: {
            type: DataTypes.STRING,
        },
        favehero: {
            type: DataTypes.STRING,
        },
        favemovie: {
            type: DataTypes.STRING,
        },
        faveworld: {
            type: DataTypes.STRING,
        },
        favetv: {
            type: DataTypes.STRING,
        },
        superpower: {
            type: DataTypes.STRING,
        },

        resetPasswordToken: {
            type: DataTypes.STRING
        },

        resetPasswordExpires: {
            type: DataTypes.DATE
        }
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", function (user) {
        console.log("before create hook");
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};