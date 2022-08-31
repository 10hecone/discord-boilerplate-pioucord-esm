import { InteractionType } from "discord.js";

export default {
    name: 'interactionCreate',
    once: false,
    async execute(client, config, interaction) {
        const ownerId = config.dev.devId;
        const { found, permissions, check } = {
            check(cmd) {
                if (!cmd) return found()
                if (cmd.ownerOnly) {
                    if (!ownerId.find(e => e = interaction.user.id)) return interaction.reply("The interaction is reserved for the whitelist person!");
                };
                if (!interaction.member.permissions.has([cmd.permissions])) return permissions(cmd);
                cmd.runInteraction(client, interaction);
            },
            permissions(cmd) {
                interaction.reply({ content: `The interaction requires permissions (\`${cmd.permissions.join(', ')}\`) to use it!`, ephemeral: true });
            },
            found() {
                interaction.reply("The interaction was not found!");
            }
        };

        if (config.dev.clientLock) {
            if (interaction.user.id !== ownerId) return interaction.reply('The application has been temporarily blocked by the development team!');
        };

        if (interaction.type === InteractionType.ApplicationCommand) {
            const cmd = client.commands.get(interaction.commandName);
            check(cmd)

        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            check(btn)

        } else if (interaction.isSelectMenu()) {
            const selectMenu = client.select.get(interaction.customId);
            check(selectMenu)

        } else if (interaction.type === InteractionType.ModalSubmit) {
            const modal = client.modal.get(interaction.customId);
            check(modal)
        };
    },
};