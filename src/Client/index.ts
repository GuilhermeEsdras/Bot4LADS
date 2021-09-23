import { Client, Collection } from 'discord.js';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import path from 'path';

import { Config, Comando, Evento } from '~/Interfaces';

import ConfigJson from '../config.json';

class ExtendedClient extends Client {
  public siglas: Collection<string, Comando> = new Collection();
  public comandos: Collection<string, Comando> = new Collection();
  public eventos: Collection<string, Evento> = new Collection();

  public config: Config = ConfigJson;

  public async init() {
    config();
    this.login(process.env['DISC']);

    /* ----------------------------------------------------------------------------- */

    console.log('|---------------------------------------|');
    console.log('| Iniciando leitura da Base de Comandos |');
    console.log('|---------------------------------------|');

    const comandosPath = path.join(__dirname, '..', 'Commands');
    readdirSync(comandosPath).forEach((dir) => {
      const comandos = readdirSync(`${comandosPath}/${dir}`).filter((arquivo) =>
        arquivo.endsWith('.ts')
      );

      for (const arquivo of comandos) {
        const { comando } = require(`${comandosPath}/${dir}/${arquivo}`);
        console.log(`> Lendo arquivo "${arquivo}" do diretório "${dir}".`);
        this.comandos.set(comando.nome, comando);
        console.log(`> Registrando comando: `);
        console.log(comando);
        console.log('------');

        if (comando) {
          if (comando.siglas) {
            comando.siglas.forEach((sigla) => {
              this.siglas.set(sigla, comando);
            });
          }
        }
      }
    });

    /* ----------------------------------------------------------------------------- */

    console.log('|--------------------------------------|');
    console.log('| Iniciando leitura da Base de Eventos |');
    console.log('|--------------------------------------|');

    const eventosPath = path.join(__dirname, '..', 'Events');
    readdirSync(eventosPath).forEach(async (arquivo) => {
      console.log('> Arquivo: ' + arquivo);

      const { evento } = await import(`${eventosPath}/${arquivo}`);
      console.log('> Evento: ', evento);

      this.eventos.set(evento.nome, evento);
      this.on(evento.nome, evento.run.bind(null, this));
    });
  }
}

export default ExtendedClient;
