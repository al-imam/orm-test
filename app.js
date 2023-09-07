require("./aliases");

const express = require("express");
const { faker } = require("@faker-js/faker");
const sequelize = require("$db/index");
const User = require("$models/User");
const Post = require("$models/Post");

const app = express();

app.get("/db", async (_, res) => {
  const users = await User.findAll({});
  res.json(users);
});

app.post("/db/add-row", async (_, res) => {
  try {
    const users = [];

    for (let i = 0; i < 100; i++) {
      const username = faker.internet.userName();
      users.push({ username });
    }

    await User.bulkCreate(users, { validate: true });

    const posts = [];
    const allUsers = await User.findAll();

    for (const user of allUsers) {
      const shouldHavePosts = faker.datatype.boolean();

      if (shouldHavePosts) {
        for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i++) {
          const title = faker.lorem.words(3);
          const content = faker.lorem.paragraph();
          posts.push({ title, content, userId: user.userId });
        }
      }
    }

    await Post.bulkCreate(posts);

    res.json({ success: true });
  } catch (error) {
    console.log(JSON.stringify(Object.assign({}, error), null, 2));
    res.json({ success: false });
  }
});

app.get("/db/users", async (_, res) => {
  const user = await User.findAll({ include: { model: Post, as: "posts" } });
  res.json(user);
});

app.get("/db/posts", async (_, res) => {
  const postsWithUsers = await Post.findAll({
    attributes: { exclude: ["created", "updated", "userId"] },
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["userId", "updated", "created"] },
    },
  });
  res.json(postsWithUsers);
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database connected");

  app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
  });
});
