import { Evento } from '~/Interfaces';

export const evento: Evento = {
  nome: 'guildMemberAdd',
  descricao:
    'Evento chamado toda vez que um novo membro eh adicionado ao servidor',
  run: async (newMember) => {
    if (newMember.user.bot) console.log('Entrou um bot');
    else console.log('Entrou um membro');
  },
};
