import { Routes } from "pioucord";

export default {
    name: 'READY',
    once: true,
    async execute(client, config) {
        for(const cmd of client.commands) {
            client.rest.post(Routes.applicationCommands(client.user === null ? config.client.user.id : client.user.id), cmd[1]);
        };
    },
};