import ExtendedClient from '~/Client';
import { Evento } from '~/Interfaces';

import { criaLogger, Logger } from '../../Logs';
import { GeradorDeStatus, geraStatus } from '../../Utils/GeradorDeStatus';

export const evento: Evento = {
  nome: 'ready',
  descricao:
    'Evento chamado apenas uma vez (quando o BOT eh carregado/iniciado)',
  run: async (client: ExtendedClient) => {
    const logger: Logger = criaLogger(evento.nome);
    const sepStr = '=';
    const sepQuant = 75;

    logger.repeatSep(sepStr, sepQuant);

    logger.warn(
      `CopyRight \n ${client.user.tag} was developed by Guilherme Esdras!`
    );

    logger.repeatSep(sepStr, sepQuant);

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

    logger.repeatSep(sepStr, sepQuant);

    const geradorDeStatus: GeradorDeStatus = geraStatus(false);
    geradorDeStatus.atualizaStatus(client);
  },
};
