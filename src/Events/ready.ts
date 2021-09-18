import { ActivityOptions, PresenceStatusData } from 'discord.js';

import ExtendedClient from '~/Client';
import { Evento } from '~/Interfaces';

class GeradorDeStatus {
  private setAtividade(
    client: ExtendedClient,
    options: ActivityOptions,
    status: PresenceStatusData,
    num: number
  ) {
    client.user
      .setActivity(options)
      .then(() => console.log(`Atividade ${num} setada com sucesso!`))
      .catch((err) => {
        console.error(
          `Ops! Houve um erro ao setar atividade ${num}! Log:` + err
        );
      })
      .finally(() => this.setStatus(client, status, num));
  }

  private setStatus(
    client: ExtendedClient,
    status: PresenceStatusData,
    num: number
  ) {
    client.user
      .setStatus(status)
      .then(() => console.log(`Status ${num} setado com sucesso!`))
      .catch((err) => {
        console.error(`Ops! Houve um erro ao setar status ${num}! Log:` + err);
      })
      .finally(() => console.log(`Atualizador de Status ${num} finalizado!`));
  }

  public async atualizaStatus(client: ExtendedClient) {
    try {
      setInterval(() => {
        console.log('---');
        const numAleatorio = Math.floor(Math.random() * 4);
        switch (numAleatorio) {
          case 0:
            this.setAtividade(
              client,
              {
                name: 'um intruso na vala',
                type: 'PLAYING',
              },
              'idle',
              numAleatorio
            );
            break;
          case 1:
            this.setAtividade(
              client,
              {
                name: 'o perfil do desenvolvedor',
                type: 'WATCHING',
              },
              'dnd',
              numAleatorio
            );
            break;
          case 2:
            this.setAtividade(
              client,
              {
                name: 'Skrillex',
                type: 'LISTENING',
              },
              'online',
              numAleatorio
            );
            break;
          case 3:
            this.setAtividade(
              client,
              {
                name: 'joguin',
                type: 'STREAMING',
              },
              'idle',
              numAleatorio
            );
            break;
          case 4:
            this.setAtividade(
              client,
              {
                name: 'qual melhor bot',
                type: 'COMPETING',
              },
              'dnd',
              numAleatorio
            );
            break;
          default:
            break;
        }
      }, 30000);
    } catch (error) {
      console.error('Ops! Houve um erro no Gerador de Status' + error);
    }
  }
}

export const evento: Evento = {
  nome: 'ready',
  descricao:
    'Evento chamado apenas uma vez (quando o BOT eh carregado/iniciado)',
  run: async (client: ExtendedClient) => {
    console.log('----------------------------------------------------------');
    console.log(
      `CopyRight - ${client.user.tag} was developed by Guilherme Esdras!`
    );

    console.log(
      '===================================================================='
    );

    console.log(`
    /$$$$$$$              /$$   /$$   /$$ /$$        /$$$$$$  /$$$$$$$   /$$$$$$ 
    | $$__  $$            | $$  | $$  | $$| $$       /$$__  $$| $$__  $$ /$$__  $$
    | $$  \\ $$  /$$$$$$  /$$$$$$| $$  | $$| $$      | $$  \\ $$| $$  \\ $$| $$  \\__/
    | $$$$$$$  /$$__  $$|_  $$_/| $$$$$$$$| $$      | $$$$$$$$| $$  | $$|  $$$$$$ 
    | $$__  $$| $$  \\ $$  | $$  |_____  $$| $$      | $$__  $$| $$  | $$ \\____  $$
    | $$  \\ $$| $$  | $$  | $$ /$$    | $$| $$      | $$  | $$| $$  | $$ /$$  \\ $$
    | $$$$$$$/|  $$$$$$/  |  $$$$/    | $$| $$$$$$$$| $$  | $$| $$$$$$$/|  $$$$$$/
    |_______/  \\______/    \\___/      |__/|________/|__/  |__/|_______/  \\______/ 
    `);

    console.log(`
     _       ___       _ _          
    (_)___  / _ \\ _ _ | (_)_ _  ___ 
    | (_-< | (_) | ' \\| | | ' \\/ -_)
    |_/__/  \\___/|_||_|_|_|_||_\\___|
    `);

    console.log(
      '===================================================================='
    );

    const geradorDeStatus = new GeradorDeStatus();
    geradorDeStatus.atualizaStatus(client);
  },
};