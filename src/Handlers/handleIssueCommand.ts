import { Handler } from '~/Interfaces';

export const handler: Handler = {
  nome: 'issue',
  handle: async (client, msg, args) => {
    console.log('Hello issue handler');
  },
};
