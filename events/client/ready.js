import * as Logger from '../../utils/Logger.js';
import config from '../../config.json' assert {type: 'json'};

export default {
    name: 'ready',
    once: true,
    async execute(client) {
        const guildsCount = await client.guilds.fetch();
        const userCount = await client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        const dev = client.guilds.cache.get(config.dev.devGuild);

        Logger.client(`- USER: ${userCount} / - SERVER: ${guildsCount.size} `);
        client.user.setPresence({status: config.client.presence});

        if(config.dev.devGuild) {
        dev.commands.set(client.commands.map(cmd => cmd));
        } else {
            Logger.warn(`-: devGuild is undefined!`);
        };
    },
};