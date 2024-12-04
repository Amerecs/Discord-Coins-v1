const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Claim your daily coins reward."),
    async execute(client, interaction) {
        let data;
        try {
            data = JSON.parse(fs.readFileSync("./cord.json", "utf8"));
        } catch (error) {
            data = {};
        }
        
        
        const userId = interaction.user.id;

        if (data[userId]) {
    const lastClaimTime = data[userId].lastClaimTime;
    const cooldown = 12 * 60 * 60 * 1000;

const currentTime = Date.now();

    if (currentTime - lastClaimTime < cooldown) {
        const timeLeft = cooldown - (currentTime - lastClaimTime);
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        const embed2 = new EmbedBuilder()
            .setTitle("> **- Cooldown Active**")
            .setDescription(`> **- You can claim your next daily reward <t:${Math.floor(Date.now() / 1000) + (hoursLeft * 3600)}:R>**`)
            .setColor("#b811ff")
            .setTimestamp();
        
        return interaction.reply({ embeds: [embed2], ephemeral: true });
    }
}

        

        const coins = Math.floor(Math.random() * (1100 - 800 + 1)) + 800;

        data[userId] = {
            coins: (data[userId] ? data[userId].coins : 0) + coins,
            lastClaimTime: Date.now()
        };

        fs.writeFileSync("./cord.json", JSON.stringify(data, null, 2));
        
        
        const embed1 = new EmbedBuilder()
        .setTitle("> **- Daily reward claimed**")
.setDescription(`> **You successfully claimed your daily reward of ${coins} coins!**`)
        .setColor("#b811ff")
        .setTimestamp();
      

        interaction.reply({ embeds: [embed1], ephemeral: true });
    }
};
