import { InteractionType } from "discord.js";

export default {
    name: 'interactionCreate',
    once: false,
    execute(client, config, interaction) {
        const ownerId = config.dev.devId;

        function check(cmd) {
                if (!cmd) return interaction.reply("The interaction was not found!");
                if (cmd.ownerOnly) {
                    if (!ownerId.some(e => e = interaction.user.id)) return interaction.reply("The interaction is reserved for the whitelist person!");
                };
                if (!interaction.member.permissions.some(e => [cmd.permissions].includes(e))) return interaction.reply({ content: `The interaction requires permissions (\`${cmd.permissions.join(', ')}\`) to use it!`, ephemeral: true });
                cmd.runInteraction(client, interaction);
        };
        
        if (config.dev.clientLock) {
            if (interaction.user.id !== ownerId) return interaction.reply('The application has been temporarily blocked by the development team!');
        };

        if (interaction.type === InteractionType.ApplicationCommand) check(client.commands.get(interaction.commandName));

        else if (interaction.isButton()) check(client.buttons.get(interaction.customId));

        else if (interaction.isSelectMenu()) check(client.select.get(interaction.customId));

        else if (interaction.type === InteractionType.ModalSubmit) check(client.modal.get(interaction.customId));
    },
};