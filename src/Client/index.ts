import { Client, Collection } from 'discord.js';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import path from 'path';

import { Config, Comando, Evento, Handler } from '~/Interfaces';

import ConfigJson from '../Data/config.json';
import { criaLogger, Logger } from '../Logs';
import { iniciaPrintUtils, PrintUtils } from '../Utils/PrintUtils';

class ExtendedClient extends Client {
  public logger: Logger = criaLogger(ExtendedClient.name);
  public printUtils: PrintUtils = iniciaPrintUtils();

  public handlers: Collection<string, Handler> = new Collection();

  public devCommands: Collection<string, Comando> = new Collection();
  public issueCommands: Collection<string, Comando> = new Collection();
  public repoCommands: Collection<string, Comando> = new Collection();

  public eventos: Collection<string, Evento> = new Collection();

  public config: Config = ConfigJson;

  public async init() {
    config();
    this.login(process.env['DISC']);

    /* ----------------------------------------------------------------------------- */

    this.printUtils.printHeader('Iniciando leitura da Base de Handlers', '-');

    const handlersPath = path.join(__dirname, '..', 'Handlers');
    readdirSync(handlersPath).forEach((arquivo) => {
      console.log('> Lendo arquivo Handler: ' + arquivo);

      const { handler } = require(`${handlersPath}/${arquivo}`);
      console.log('> Handler: ', handler);

      this.handlers.set(handler.nome, handler);
    });

    /* ----------------------------------------------------------------------------- */

    const regCommands = (
      folder: string,
      commands: Collection<string, Comando>
    ) => {
      this.logger.separator(3);
      console.log('> Lendo da Base: ', folder);
      this.logger.separator(3);

      readdirSync(folder).forEach((dir) => {
        const comandos = readdirSync(`${folder}/${dir}`).filter((arquivo) =>
          arquivo.endsWith('.ts')
        );

        for (const arquivo of comandos) {
          try {
            const { comando } = require(`${folder}/${dir}/${arquivo}`);

            if (comando) {
              console.log(
                `> Lendo arquivo "${arquivo}" do diretório "${dir}".`
              );
              console.log(`> Registrando comando: `);
              console.log(comando);
              console.log('------');

              commands.set(comando.nome, comando);
            }
          } catch (err) {
            this.logger.error(err);
          }
        }
      });
    };

    /* ----------------------------------------------------------------------------- */

    this.printUtils.printHeader('Iniciando leitura das Bases de Comandos', '-');

    const devCommandsPath = path.join(__dirname, '..', 'Commands', 'Dev');
    regCommands(devCommandsPath, this.devCommands);

    const issueCommandsPath = path.join(__dirname, '..', 'Commands', 'Issue');
    regCommands(issueCommandsPath, this.issueCommands);

    const repoCommandsPath = path.join(__dirname, '..', 'Commands', 'Repo');
    regCommands(repoCommandsPath, this.repoCommands);

    /* ----------------------------------------------------------------------------- */

    this.printUtils.printHeader('Iniciando leitura da Base de Eventos', '-');

    const enventosPath = path.join(__dirname, '..', 'Events');
    readdirSync(enventosPath).forEach(async (dir) => {
      const eventos = readdirSync(`${enventosPath}/${dir}`).filter((arquivo) =>
        arquivo.endsWith('.ts')
      );

      for (const arquivo of eventos) {
        const { evento } = await import(`${enventosPath}/${dir}/${arquivo}`);
        console.log(
          `> Lendo arquivo evento "${arquivo}" do diretório "${dir}" | Evento:`
        );
        console.log(evento);
        console.log('------');

        this.eventos.set(evento.nome, evento);
        this.on(evento.nome, evento.run.bind(null, this));
      }
    });
  }
}

export default ExtendedClient;
