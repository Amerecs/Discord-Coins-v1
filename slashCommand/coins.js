const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cord")
    .setDescription("Manage your coins.")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("Shows the balance of the user.")
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName("amount")
        .setDescription("Amount of coins to transfer.")
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the transaction.")
        .setRequired(false)
    ),

  execute(client, interaction) {
    const targetUser = interaction.options.getUser("user") || interaction.user;
    const amount = parseInt(interaction.options.getString("amount"));
    const reason = interaction.options.getString("reason");

    let data;
    try {
      data = JSON.parse(fs.readFileSync("./cord.json", "utf8"));
    } catch (error) {
      data = {};
    }


    const targetId = targetUser.id;

    if (!data[targetId]) {
      return interaction.reply(`**${targetUser.username} current balance is \`$0\`.**`);
    }

    const userCoins = data[targetId].coins;

    if (!amount) {
      return interaction.reply(`** ${targetUser.username} current balance is \`$${userCoins}\`.**`);
    }

    if (isNaN(amount) || amount <= 0) {
      return message.reply("**🤔 | Please specify a valid amount to transfer!**");
    }

    if (amount > userCoins) {
      return message.reply(`**:thinking: | ${message.author.username}, your balance is not enough for this transfer!**`);
    }

    data[userId].coins -= amount;
    data[targetId].coins += amount;

    fs.writeFileSync("./cord.json", JSON.stringify(data, null, 2));

    return message.reply(`**${message.author.username} has transferred \$${amount} to <@!${targetId}>.**`);
  },
};
