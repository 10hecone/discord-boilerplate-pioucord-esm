export const command = {
    name: 'ping',
    category: 'utils',
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