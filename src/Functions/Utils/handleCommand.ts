import { Message } from 'discord.js';

import ExtendedClient from '~/Client';
import { Comando } from '~/Interfaces';

import { criaLogger, Logger } from '../../Logs';

export default function handleCommand(
  client: ExtendedClient,
  msg: Message,
  args: string[],
  comando: Comando
): boolean {
  const logger: Logger = criaLogger(
    `(Handle) Comando: "${comando.nome}" por "${msg.member.user.tag}"`
  );
  const sepTam = 3;

  console.log(`|----------------[Handle Command]----------------|`);

  console.log(
    '---\n~ Comando chamado:',
    comando,
    `por ${msg.member.user.tag} com os argumentos "${args}".\n---`
  );

  if (comando.permissoes) {
    if (!msg.member.hasPermission(comando.permissoes)) {
      msg.reply('Desculpe! Você não tem permissão para usar este comando.');
      logger.error('Não possui as permissões necessárias!');
      return false;
    } else {
      logger.ok('Possui as permissões necessárias.');
    }
  } else {
    logger.info('Sem permissões específicas.');
  }

  logger.separator(sepTam);

  if (comando.cargosRequeridos) {
    for (const cargoRequerido of comando.cargosRequeridos) {
      const cargo = msg.guild.roles.cache.find(
        (cargo) => cargo.name === cargoRequerido
      );

      if (!cargo || !msg.member.roles.cache.has(cargo.id)) {
        msg.reply(
          comando.erroDePermissao ||
            `Você deve ter o cargo ${cargoRequerido} para usar este comando!`
        );
        logger.error('Não possui o(s) cargo(s) necessário(s)!');
        return false;
      }
    }
    logger.ok('Possui os cargos necessários.');
  } else {
    logger.info('Sem cargos requeridos.');
  }

  logger.separator(sepTam);

  const erroDeArgs = () => {
    const sintaxeCorreta = `${client.config.prefix}${comando.nome} ${comando.argsEsperados}`;

    const msgDeErroDeSintaxe =
      'Ops! Sintaxe incorreta. Sintaxe correta: ' +
      '```\n ' +
      sintaxeCorreta +
      '\n```';

    msg.reply(msgDeErroDeSintaxe);
  };

  if (comando.argsMin) {
    if (args.length < comando.argsMin) {
      erroDeArgs();
      logger.error('Erro de argumentos mínimos!');
      return false;
    } else {
      logger.ok('Argumentos mínimos validados.');
    }
  } else {
    logger.info('Sem argumentos mínimos.');
  }

  logger.separator(sepTam);

  if (comando.argsMax) {
    if (args.length > comando.argsMax) {
      erroDeArgs();
      logger.error('Erro de argumentos máximos!');
      return false;
    } else {
      logger.ok('Argumentos máximos validados.');
    }
  } else {
    logger.info('Sem argumentos máximos.');
  }

  if (comando.tipo === 'admin' || comando.tipo === 'adm') {
    msg.delete();
  }

  logger.separator(sepTam);

  logger.success('Executado com sucesso!');

  console.log(`|------------------------------------------------|`);

  return true;
}
