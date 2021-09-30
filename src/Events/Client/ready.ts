import ExtendedClient from '~/Client';
import { Evento } from '~/Interfaces';

import { criaLogger, Logger } from '../../Logs';

export const evento: Evento = {
  nome: 'ready',
  descricao:
    'Evento chamado apenas uma vez (quando o BOT eh carregado/iniciado)',
  run: async (client: ExtendedClient) => {
    const logger: Logger = criaLogger(evento.nome);

    console.log(
      '====================================================================================================='
    );

    logger.warn(
      `CopyRight - ${client.user.tag} was developed by Guilherme Esdras!`
    );

    console.log(
      '====================================================================================================='
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
      '====================================================================================================='
    );

    // const geradorDeStatus: GeradorDeStatus = iniciaGeradorDeStatus();
    // geradorDeStatus.atualizaStatus(client);
  },
};
