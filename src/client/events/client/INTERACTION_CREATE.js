export default {
    name: 'INTERACTION_CREATE',
    once: false,
    async execute(client, config, functions, interaction) {
        const { found, check } = {
             check(cmd) {
                if (!cmd) return found()
                if (cmd?.whitelistOnly === true) {
                    if(!config.client.whitelistOnly.includes(interaction.member.user.id)) return functions.reply(interaction, {embeds: [{title: "Error", description: "You don't have the permission to use this command!"}]});
                };
                Object.assign(interaction, {createdTimestamp: Date.now()});
                cmd.runInteraction(client, interaction, functions, config);
            },
            found() {
                return functions.reply(interaction, {embeds: [{title: "Error", description: "This command doesn't exist!"}]});
            }
        };

        if (interaction.data.type === 1) return check(client.commands.get(interaction.data.name));
    },
};