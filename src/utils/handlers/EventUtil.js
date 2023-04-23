export default async (client, fs, config, func) => {
    for (const dir of fs.readdirSync('./client/events/')) {
        for (const evnFile of fs.readdirSync(`./client/events/${dir}/`)) {
            if(!evnFile.endsWith('.js')) continue;

            const event = await import(`../../client/events/${dir}/` + evnFile);
            if (['name', 'execute', 'once'].some(key => event.default[key] === undefined)) return console.log(`Event: ${event.default.name} not loaded, missing field`);
            console.log(`Event: ${event.default.name} loaded!`);

            if (event.default['once']) {
                client.ws.once(event.default['name'], (...args) => event.default['execute'] (client, config, func, ...args));
            } else {
                client.ws.on(event.default['name'], (...args) => event.default['execute'] (client, config, func, ...args));
            };
        };
    };
};