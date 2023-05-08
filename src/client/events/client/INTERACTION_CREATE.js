export const event = {
    name: "INTERACTION_CREATE",
    once: false,
    async execute(client, config, functions, data) {
        function check(interaction) {
            if (!interaction) return functions.reply(data, {embeds: [{title: "Error", description: "This command doesn't exist!"}]});
            return interaction.runInteraction(client, data, functions, config);
        }
        
        if (data.data.type === 1) return check(client.commands.get(data.data.name));
    },
};