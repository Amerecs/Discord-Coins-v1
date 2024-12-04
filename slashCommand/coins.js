const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
data: new SlashCommandBuilder()
.setName("coins")
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
data = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
} catch (error) {
data = {};
}
const targetId = targetUser.id;
if (!data[targetId]) {
return interaction.reply(`**${targetUser.username} 's current balance is \`$0\`.**`);
}
const userCoins = data[targetId].coins;
if (!amount) {
return interaction.reply(`**${targetUser.username} 's current balance is \`$${userCoins}\`.**`);
}
if (isNaN(amount) || amount <= 0) {
return interaction .reply("**🤔 | Please specify a valid amount to transfer!**");
}
if (amount > userCoins) {
return interaction .reply(`**:thinking: | ${ interaction . user .username}, your balance is not enough for this transfer!**`);
}
data[ interaction.user.id ].coins -= amount;
data[targetId].coins += amount;
fs.writeFileSync("./coins.json", JSON.stringify(data, null, 2));
return interaction .reply(`**${ interaction . user .username} has transferred \$${amount} to <@!${targetId}>.**`);
},
};
