import { client } from '../index.js';
import { Routes } from 'pioucord';

export const func = {
    
    /**
     * Reply to an interaction function
     * @param {Object} interaction Interaction object
     * @param {Object} content Content to send
     * @param {Number} type Type of the reply
     */

    async reply(interaction, content, type) {
        await client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
            data: content,
            type: type === undefined ? 4 : type,
        });
    },
};
