#!/usr/bin/env node

const program = require("commander");
const packageJson = require("../package.json");

program.version(packageJson.version).usage("<command> [options]");

program
  .command("init <project-name>")
  .description("Create a new wx web project")
  .action((name) => {
    require("./init.js")(name);
  });

program.on("--help, -h", () => {
  console.log("You can concat " + packageJson.author);
});

program.parse(process.argv);
