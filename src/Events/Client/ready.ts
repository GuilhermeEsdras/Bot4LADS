import ExtendedClient from '~/Client';
import { Evento } from '~/Interfaces';

import { criaLogger, Logger } from '../../Logs';
import { GeradorDeStatus, geraStatus } from '../../Status/GeradorDeStatus';

export const evento: Evento = {
  nome: 'ready',
  descricao:
    'Evento chamado apenas uma vez (quando o BOT eh carregado/iniciado)',
  run: async (client: ExtendedClient) => {
    const logger: Logger = criaLogger(evento.nome);

    const sep = (sepStr: string, quant: number) => {
      console.log(sepStr.repeat(quant));
    };
    const sepStr = '=';
    const sepQuant = 62;

    sep(sepStr, sepQuant);

    logger.warn(
      `CopyRight \n ${client.user.tag} was developed by Guilherme Esdras!`
    );

    sep(sepStr, sepQuant);

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

    sep(sepStr, sepQuant);

    const geradorDeStatus: GeradorDeStatus = geraStatus(false);
    geradorDeStatus.atualizaStatus(client);
  },
};
