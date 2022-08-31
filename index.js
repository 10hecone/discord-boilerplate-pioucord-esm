/** 
* The index allows to export the client in the different Handlers
* He takes care of the processes using the Logger
 */

import { Client, Collection, IntentsBitField, } from 'discord.js';
import { promptOutput } from './utils/Readline.js';
import yaml from 'js-yaml'
import inquirer from 'inquirer';
import * as Logger from './utils/Logger.js';
import * as fs from 'node:fs';
const config = yaml.load(fs.readFileSync('./config.yaml', 'utf-8'))

export const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ]
});

/* If you have a new interaction specify here the type
Examples: ['commands', 'buttons', 'modal', 'select']
*/
['commands' ].forEach(x => client[x] = new Collection());

/* If you have a new interaction specify here the util
Examples: ['EventUtil', 'CommandUtil', 'ModalUtil', 'ButtonUtil']
*/
for (const handler of ['EventUtil', 'CommandUtil']) {
    await import(`./utils/handlers/${handler}.js`).then(c => c.default(client, Logger, fs, config));
};

/*
* Process with Logger 
*/
process.on('warning', (...args) => { Logger.warn(...args) });

process.on('exit', code => {
    Logger.client(`The process stopped with the code: ${code}!`);
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
    console.log(promise);
});

/*
* The inquirer module allows to manage the bot
*/
inquirer
    .prompt(
        {
            type: 'list',
            name: 'execute',
            choices: ['Start', 'Exit'],
            message: 'What action do you want to launch?',
            default: 'Start'
        }
    )
    .then(response => {
        switch (response.execute.toLowerCase()) {
            case 'start':
                console.log(`Command receveid: ${response.execute.toLowerCase()} start!`);
                client.login(config.client.TOKEN).then(() => {
                    setTimeout(() => {
                        promptOutput();
                    }, 1000)
                });
            break;
            case 'exit':
                client.destroy()
            break;
        };
});