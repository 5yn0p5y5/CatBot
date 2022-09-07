module.exports = {
  name: "createInteraction",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Oops, something went wrong while executing this command!`,
          ephemeral: true,
        });
      }
    }
  },
};
