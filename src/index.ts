import Client from './Client';
import { criaLogger } from './Logs';
import { keepAlive } from './Server';

const logger = criaLogger('App');

new Client()
  .init()
  .then(() => {
    keepAlive();
  })
  .catch((motivo) => {
    logger.error(`na inicialização do Client ${motivo}`);
  });
