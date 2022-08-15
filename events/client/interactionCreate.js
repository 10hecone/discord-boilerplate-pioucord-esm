import config from '../../config.json' assert {type: 'json'};
import { InteractionType } from "discord.js";

export default {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        const ownerId = config.dev.devId;

        if (config.dev.clientLock) {
            if (interaction.user.id !== ownerId) return interaction.reply('The application has been temporarily blocked by the development team!');
        };

        if (interaction.type === InteractionType.ApplicationCommand) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply("The interaction was not found!");
            if (cmd.ownerOnly) {
                if (!ownerId.find(e => e = interaction.user.id)) return interaction.reply("The interaction is reserved for the whitelist person!");
            };

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `The interaction requires permissions  (\`${cmd.permissions.join(', ')}\`) to use it!`, ephemeral: true });

            cmd.runInteraction(client, interaction);

        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply("The button was not found!");

            if (!interaction.member.permissions.has([btn.permissions])) return interaction.reply({ content: `The interaction requires permissions  (\`${btn.permissions.join(', ')}\`) to use it!`, ephemeral: true });
            btn.runInteraction(client, interaction);

        } else if (interaction.isSelectMenu()) {
            const selectMenu = client.select.get(interaction.customId);
            if (!selectMenu) return interaction.reply("The select menu was not found!");

            if (!interaction.member.permissions.has([selectMenu.permissions])) return interaction.reply({ content: `The interaction requires permissions  (\`${selectMenu.permissions.join(', ')}\`) to use it!`, ephemeral: true });
            selectMenu.runInteraction(client, interaction);

        } else if (interaction.type === InteractionType.ModalSubmit) {
            const modal = client.modal.get(interaction.customId);
            if (!modal) return interaction.reply("The modal was not found!");

            if (!interaction.member.permissions.has([modal.permissions])) return interaction.reply({ content: `The interaction requires permissions  (\`${modal.permissions.join(', ')}\`) to use it!`, ephemeral: true });
            modal.runInteraction(client, interaction);
        }
    },
};