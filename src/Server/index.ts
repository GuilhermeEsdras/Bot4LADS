import { config } from 'dotenv';
import express from 'express';

import { criaLogger, Logger } from '../Logs';
import { iniciaPrintUtils, PrintUtils } from '../Utils/PrintUtils';

const server = express();

config();

const logger: Logger = criaLogger('Server');
const printUtils: PrintUtils = iniciaPrintUtils();

export function keepAlive() {
  server.get('/', (request, response) => {
    logger.ok(`Ping recebido!`);
    response
      .status(200)
      .send('<h3>bot4LADS™ - The LADS Discord BOT is online!</h3>');
  });
  server.listen(process.env['PORT'], () => {
    printUtils.printHeader('Iniciando Server', '-');
    logger.separator(5);
    logger.success('Server pronto!');
    logger.separator(5);
  });
}
