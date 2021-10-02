import { config } from 'dotenv';
import express from 'express';

import { criaLogger, Logger } from '../Logs';

const server = express();

config();

const logger: Logger = criaLogger('Server');

export function keepAlive() {
  server.get('/', (request, response) => {
    logger.ok(`Ping recebido!`);
    response
      .status(200)
      .send('<h3>bot4LADS™ - The LADS Discord BOT is online!</h3>');
  });
  server.listen(process.env['PORT'], () => {
    logger.printHeader('Iniciando Server', '-');
    logger.separator(5);
    logger.success('Server pronto!');
    logger.separator(5);
  });
}
