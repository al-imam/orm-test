const { DataTypes } = require("sequelize");
const sequelize = require("$db/index");

const Post = sequelize.define(
  "Post",
  {
    postId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    createdAt: "created",
    updatedAt: "updated",
  }
);

module.exports = Post;
