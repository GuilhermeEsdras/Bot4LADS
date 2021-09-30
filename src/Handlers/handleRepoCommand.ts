import { Handler } from '~/Interfaces';

export const handler: Handler = {
  nome: 'repo',
  handle: async (client, msg, args) => {
    console.log('Hello repo handler');
  },
};
