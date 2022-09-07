const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.commandHandler = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command, command.data.toJSON());
        console.log(`Command: ${command.data.name} has been handled!`);
      }
    }

    const clientID = "1006307707906691283";
    const guildID = "1006309233110814831";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started refreshing application commands!");

      await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
        body: client.commandArray,
      });

      console.log("Successfully reloaded application commands!");
    } catch (error) {
      console.error(error);
    }
  };
};
