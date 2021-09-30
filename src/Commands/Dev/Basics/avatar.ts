import axios from 'axios';

import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import { settings } from '../../../Settings/APIs/apisettings';

export const comando: Comando = {
  nome: 'avatar',
  siglas: ['avatar'],
  argsMin: 1,
  run: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger(
      `Comando "${comando.nome}" (por ${msg.member.user.tag})`
    );

    const email = args;

    const instance = axios.create({
      baseURL: settings.baseURL,
      timeout: settings.timeout,
      headers: {
        Authorization: settings.headers_authorization,
      },
    });

    const response = await instance
      .get(`/avatar?email=${email}`)
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      });

    msg.reply(response.avatar_url);
    logger.success('Comando finalizado com sucesso.');
  },
};
