import { MessageEmbed } from 'discord.js';

import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../../Logs';
import lastActivity from './last-activity';
import lastComment from './last-comment';
import lastCommit from './last-commit';
import lastMergeRequest from './last-mergerequest';
import lastNewBranch from './last-newbranch';
import lastPush from './last-push';

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
        logger.ok(`Resposta obtida para ${subcmd}`);
        break;

      case 'comment':
        response = await lastComment(email);
        logger.ok(`Resposta obtida para ${subcmd}`);
        break;

      case 'push':
        response = await lastPush(email);
        logger.ok(`Resposta obtida para ${subcmd}`);
        break;

      case 'mr':
        response = await lastMergeRequest(email);
        logger.ok(`Resposta obtida para ${subcmd}`);
        break;

      case 'commit':
        response = await lastCommit(email);
        logger.ok(`Resposta obtida para ${subcmd}`);
        break;

      case 'newbranch':
        response = await lastNewBranch(email);
        logger.ok(`Resposta obtida para ${subcmd}`);
        break;

      default:
        msg.reply(
          `Este comando requer um subcomando. O subcomando informado ("${subcmd}") não é válido`
        );
        break;
    }

    msg.channel.send(response);
    logger.success(`Executado com sucesso! Com subcomando: ${subcmd}`);
  },
};
