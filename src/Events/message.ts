import { Message } from 'discord.js';

import ExtendedClient from '~/Client';
import { Comando, Evento } from '~/Interfaces';

export const evento: Evento = {
  nome: 'message',
  descricao: 'Evento chamado toda vez que uma mensagem eh enviada',
  run: (client: ExtendedClient, msg: Message) => {
    const comandoValido = () => {
      return (
        !msg.author.bot &&
        msg.content.toLocaleLowerCase().startsWith(client.config.prefix)
      );
    };

    if (!comandoValido()) return;

    const args = msg.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLocaleLowerCase();
    if (!cmd) return;

    const comando: Comando = client.comandos.get(cmd) || client.siglas.get(cmd);
    if (comando) {
      if (comando.permissoes && !msg.member.hasPermission(comando.permissoes)) {
        msg.reply('Desculpe! Você não tem permissão para usar este comando.');
        return;
      }

      if (comando.cargosRequeridos) {
        for (const cargoRequerido of comando.cargosRequeridos) {
          const cargo = msg.guild.roles.cache.find(
            (cargo) => cargo.name === cargoRequerido
          );

          if (!cargo || !msg.member.roles.cache.has(cargo.id)) {
            const msgErroDePermissao = comando.erroDePermissao;
            if (msgErroDePermissao !== null) {
              msg.reply(msgErroDePermissao);
            } else {
              msg.reply(
                `Você deve ter o cargo ${cargoRequerido} para usar este comando!`
              );
            }
            return;
          }
        }
      }

      if (
        (comando.argsMin && args.length < comando.argsMin) ||
        (comando.argsMax && args.length > comando.argsMax)
      ) {
        /**
         * Se a quantidade de argumentos passada for menor que o mínimo esperado,
         * ou for maior que o máximo esperado...
         */
        const sintaxeCorreta = `${client.config.prefix}${comando.nome} ${comando.argsEsperados}`;

        const msgDeErroDeSintaxe =
          'Ops! Sintaxe incorreta. Sintaxe correta: ' +
          '```\n ' +
          sintaxeCorreta +
          '\n```';

        msg.reply(msgDeErroDeSintaxe);
        return;
      }

      if (comando.tipo === 'admin' || comando.tipo === 'adm') {
        msg.delete();
      }

      console.log(
        '---\n~ Comando executado:',
        comando,
        `chamado por "${msg.member.user.tag}" com os argumentos "${args}".\n---`
      );

      comando.run(client, msg, args);
    }
  },
};
