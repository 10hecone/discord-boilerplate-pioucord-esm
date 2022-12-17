export default {
    name: 'ping',
    category: 'utils',
    whitelistOnly: false,
    description: 'Pong!',

    runInteraction(client, interaction, functions) {
        functions.reply(interaction, {
            content: "Pong!",
            embeds: [
                {
                    fields: [{ name: "Pong!", value: 'Test!'}],
                },
            ],
        });
    },
};