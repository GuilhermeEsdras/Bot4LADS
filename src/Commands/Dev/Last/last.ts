import { MessageEmbed } from 'discord.js';

import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import lastActivity from './last-activity';
import lastComment from './last-comment';
import lastCommit from './last-commit';
import lastLogin from './last-login';

export const comando: Comando = {
  nome: 'last',
  argsMin: 1,
  run: async (client: ExtendedClient, msg, args) => {
    const logger: Logger = criaLogger(
      `Comando "${comando.nome}" (por ${msg.member.user.tag})`
    );

    const subcmd = args[0];
    const email = args[1];

    let response: MessageEmbed;

    switch (subcmd) {
      case 'activity':
        response = await lastActivity(email);
        break;

      case 'comment':
        response = await lastComment(email);
        break;

      case 'commit':
        response = new MessageEmbed().setDescription('kladkaskdkasdkakd');
        // response = commit(email);
        break;

      case 'login':
        // response = login(email);
        break;

      default:
        msg.reply(
          `Este comando requer um subcomando. O subcomando informado ("${subcmd}") não é válido`
        );
        break;
    }

    msg.channel.send(response);

    // const instance = axios.create({
    //   baseURL: settings.baseURL,
    //   timeout: settings.timeout,
    //   headers: {
    //     Authorization: settings.headers_authorization,
    //   },
    // });

    // const response = await instance
    //   .get(`/avatar?email=${email}`)
    //   .then((resp) => {
    //     console.log(resp.data);
    //     return resp.data;
    //   });

    // msg.reply(response.avatar_url);
    // logger.success('Comando finalizado com sucesso.');
  },
};
