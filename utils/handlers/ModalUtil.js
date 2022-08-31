export default async (client, Logger, fs) => {
    for (const dir of fs.readdirSync('./modal/')) {
        for await (const modalFile of fs.readdirSync(`./modal/${dir}/`)) {

            const modal = await import(`../../modal/${dir}/` + modalFile);

            if (['name', 'permissions'].some(key => modal.default[key] === undefined)) return Logger.warn(`Modal: ${modal.default.name} not loaded, missing field`);

            client.modal.set(modal.default['name'], modal.default);
            Logger.command(`-: ${modal.default['name']}`);
        };
    };
};