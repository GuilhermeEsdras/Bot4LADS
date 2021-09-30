import axios from 'axios';

import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import { getUserAvatar } from '../../../Services/GitLab/gitlab-services';

export const comando: Comando = {
  nome: 'avatar',
  siglas: ['avatar'],
  argsMin: 1,
  run: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger(
      `Comando "${comando.nome}" (por ${msg.member.user.tag})`
    );

    const email = args[0];

    // const response = await instance
    //   .get(`/avatar?email=${email}`)
    //   .then((resp) => {
    //     console.log(resp.data);
    //     return resp.data;
    //   });

    const response = await getUserAvatar(email);

    console.log(response);

    logger.success('Comando finalizado com sucesso.');
  },
};
