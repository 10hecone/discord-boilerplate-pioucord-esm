export default async (client, Logger, fs) => {
    for (const dir of fs.readdirSync('./buttons/')) {
        for await (const buttonFile of fs.readdirSync(`./buttons/${dir}/`)) {

            const buttons = await import(`../../buttons/${dir}/` + buttonFile);

            if (['name', 'permissions'].some(key => buttons.default[key] === undefined)) return Logger.warn(`Button: ${buttons.default.name} not loaded, missing field`);

            client.buttons.set(buttons.default['name'], buttons.default);
            Logger.command(`-: ${buttons.default['name']}`);
        };
    };
};