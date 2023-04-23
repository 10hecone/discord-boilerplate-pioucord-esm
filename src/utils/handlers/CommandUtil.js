export default async (client, fs) => {
    for (const dir of fs.readdirSync('./client/commands/')) {
        for(const cmdFile of fs.readdirSync(`./client/commands/${dir}/`)) {
            if(!cmdFile.endsWith('js')) continue;

            const cmd = await import(`../../client/commands/${dir}/` + cmdFile);

            if (['name', 'category'].some(key => cmd.default[key] === undefined)) return console.error(`Command: ${cmd.default.name} not loaded, missing field`);
            if (cmd.default.category !== dir ) return console.error(`Command: dir/${cmd.default.name} not loaded, category not match`);

            client.commands.set(cmd.default.name, cmd.default);

            console.log(`Commande: ${cmd.default.name} loaded!`);
        };

    };
};