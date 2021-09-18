import axios from 'axios';
import { MessageEmbed } from 'discord.js';

import { Comando } from '~/Interfaces';

function pegaLabelDeConclusao(labels: string[]): string {
  let labelName = '';
  labels.forEach((label) => {
    console.log(label);
    if (label.startsWith('Conc')) labelName = label;
  });
  return labelName;
}

export const comando: Comando = {
  nome: 'analisa',
  descricao: 'Faz uma analise.',
  argsMin: 1,
  argsEsperados: '<dev> ou <issue>',
  permissoes: ['ADMINISTRATOR'],
  run: async (client, msg, args) => {
    const numDaIssue: number = parseInt(args[0]);
    try {
      const instance = axios.create({
        baseURL: 'https://git.synchro.com.br/api/v4',
        timeout: 1000,
        headers: {
          Authorization: `Bearer ${process.env['LAB']}`,
        },
      });

      const response = await instance
        .get(`/projects/210/issues?iids[]=${numDaIssue}`)
        .then((resp) => {
          return resp.data[0];
        });

      let description = '';

      const labelDeConclusao = pegaLabelDeConclusao(response.labels);
      if (labelDeConclusao !== '')
        description += `✅ Status de conclusão (${labelDeConclusao})`;
      else description += '❌ Sem Status de Conclusão';

      description += '\n';

      if (response.due_date !== null)
        description += `✅ Due Date (${response.due_date})`;
      else description += '❌ Sem Due Date';

      const embedMsg = (data) => {
        const embed: MessageEmbed = new MessageEmbed()
          .setColor('#FF6162')
          .setAuthor(`Validando Issue #${data.iid}`)
          .setTitle(`${data.title}`)
          .setDescription(
            `Link: ${data.web_url} \n\n **Resultado das Validações:** \n ${description}`
          )
          .setFooter(
            `Assignee atual ${data.assignee.username}`,
            `${data.assignee.avatar_url}`
          );
        return embed;
      };

      console.log(response);
      msg.reply(embedMsg(response));
    } catch (err) {
      console.log(err);
    }
  },
};
