import { Comando } from '~/Interfaces';

export const comando: Comando = {
  nome: 'clc',
  descricao:
    'Limpa todas as mensagens enviadas a menos de 14 dias do canal de texto atual',
  permissoes: 'ADMINISTRATOR',
  run: (client, message, args) => {
    console.log('sdkskdsd');
  },
};
