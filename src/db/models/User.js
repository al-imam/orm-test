const sequelize = require("$db/index");
const { DataTypes } = require("sequelize");
const Post = require("$models/Post");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      validate: {
        isIn: ["Hi", "Hello"],
      },
      allowNull: false,
    },
  },

  {
    createdAt: "created",
    updatedAt: "updated",
  }
);

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = User;
