import { client } from '../index.js';
import inquirer from 'inquirer'

export const promptOutput = () => {
inquirer
    .prompt(
        {
            type: 'list',
            name: 'execute',
            choices: ['Bot-Info', 'Stop'],
            message: 'What command do you want to run ?',
            default: 'Help'
        }
    )
    .then(response => {
        switch(response.execute.toLowerCase()) {
            case 'bot-info': 
                console.log(client.user);
                setTimeout(() => {
                    promptOutput();
                }, 1000);
            break;
            case 'stop': 
                client.destroy();
            break;
        };
    });
};