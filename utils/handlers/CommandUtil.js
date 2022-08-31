export default async (client, Logger, fs) => {
    for (const dir of fs.readdirSync('./commands/')) {
        for await (const cmdFile of fs.readdirSync(`./commands/${dir}/`)) {

            const cmd = await import(`../../commands/${dir}/` + cmdFile);

            if (['name', 'description', 'category', 'permissions', 'ownerOnly'].some(key => cmd.default[key] === undefined)) return Logger.warn(`Command: ${cmd.default.name} not loaded, missing field`);

            client.commands.set(cmd.default['name'], cmd.default);
            Logger.command(`-: ${cmd.default['name']}`);
        };
    };
};