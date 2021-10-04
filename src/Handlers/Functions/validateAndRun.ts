import { Message } from 'discord.js';

import ExtendedClient from '~/Client';
import { Comando, Handler } from '~/Interfaces';

import { Logger } from '../../Logs';
import handleCommand from './handleCommand';

export default async function ValidateAndRun(
  client: ExtendedClient,
  msg: Message,
  args: string[],
  logger: Logger,
  handler: Handler,
  cmd: string,
  comando: Comando
) {
  if (!comando) {
    let resp = '';
    resp += `Ops, este comando (${cmd}) não existe!\n`;
    resp += `Tente: \`${client.config.prefix}${handler.nome} <comando> <argumentos>\``;
    msg.reply(resp);
  } else {
    if (!handleCommand(client, msg, args, comando)) return;

    logger.success('Handler executado e comando validado com sucesso');

    await comando.run(client, msg, args);

    logger.sepBar();
  }
}
