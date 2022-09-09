import * as Logger from '../../utils/Logger.js';

export default {
    name: 'ready',
    once: true,
    execute(client, config) {

        Logger.client(`- USER: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} / - SERVER: ${client.guilds.size}`);
        client.user.setPresence({status: config.client.presence});

        if(config.dev.devGuild) {
            client.guilds.cache.get(config.dev.devGuild).commands.set(client.commands.map(cmd => cmd)).catch(() => Logger.error('-: Impossible de charger les slash commandes!'));
        } else {
            Logger.warn(`-: devGuild is undefined!`);
        };
    },
};