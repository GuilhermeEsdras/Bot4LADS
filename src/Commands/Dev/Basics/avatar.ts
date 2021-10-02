import axios from 'axios';

import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import { gitLabService } from '../../../Services/GitLab/gitlab-services';

export const comando: Comando = {
  nome: 'avatar',
  siglas: ['avatar'],
  argsMin: 1,
  run: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger(
      `Comando "${comando.nome}" (por ${msg.member.user.tag})`
    );
    const email = args[0];
    const response = await gitLabService()
      .getUserAvatar(email)
      .then((resp) => {
        return resp;
      })
      .catch((err) => logger.error(err));
    const data = await response;
    console.log(data);

    msg.reply(data.avatar_url);

    logger.success('Comando finalizado com sucesso.');
  },
};
