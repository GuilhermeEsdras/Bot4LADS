import axios from 'axios';

import { Comando } from '~/Interfaces';

export const comando: Comando = {
  nome: 'avatar',
  siglas: ['avatar'],
  argsMin: 1,
  permissoes: ['ADMINISTRATOR'],
  run: async (client, msg, args) => {
    const email = args;

    const instance = axios.create({
      baseURL: 'https://git.synchro.com.br/api/v4',
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${process.env['LAB']}`,
      },
    });

    const response = await instance
      .get(`/avatar?email=${email}`)
      .then((resp) => {
        console.log(resp.data);
        msg.reply(resp.data.avatar_url);

        return resp.data;
      });
  },
};
