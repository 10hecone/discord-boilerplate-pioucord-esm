import * as fs from 'node:fs';
import * as Logger from '../Logger.js';

export default async (client) => {
    for (const dir of fs.readdirSync('./select/')) {
        for await (const selectFile of fs.readdirSync(`./select/${dir}/`)) {

            const select = await import(`../../select/${dir}/` + selectFile);

            if (['name', 'permissions'].some(key => select.default[key] === undefined)) return Logger.warn(`Select: ${select.default.name} not loaded, missing field`);

            client.select.set(select.default['name'], select.default);
            Logger.command(`-: ${select.default['name']}`);
        };
    };
};