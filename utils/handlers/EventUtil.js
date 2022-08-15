import * as fs from 'node:fs';
import * as Logger from '../Logger.js';

export default async (client) => {
    for (const dir of fs.readdirSync('./events/')) {
        for await (const evnFile of fs.readdirSync(`./events/${dir}/`)) {

            const event = await import(`../../events/${dir}/` + evnFile);

            if (['name', 'execute', 'once'].some(key => event.default[key] === undefined)) return Logger.warn(`Event: ${event.default.name} not loaded, missing field`);

            if (event.default['once']) {
                client.once(event.default['name'], (...args) => event.default['execute'] (client, ...args));
            } else {
                client.on(event.default['name'], (...args) => event.default['execute'] (client, ...args));
            };

            Logger.event(`-: ${event.default['name']}`);
        };
    };
};