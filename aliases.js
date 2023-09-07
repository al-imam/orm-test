const path = require("path");
const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  $root: __dirname,
  $src: path.resolve(__dirname, "src"),
  $models: path.resolve(__dirname, "src/db/models"),
  $controllers: path.resolve(__dirname, "src/controllers"),
  $db: path.resolve(__dirname, "src/db"),
});
