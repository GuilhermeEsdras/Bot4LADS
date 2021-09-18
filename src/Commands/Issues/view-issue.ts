import axios from 'axios';
import { MessageEmbed } from 'discord.js';

import { Comando } from '~/Interfaces';

export const comando: Comando = {
  nome: 'viewissue',
  siglas: ['issue'],
  argsMin: 1,
  argsEsperados: 'Nº da Issue',
  permissoes: ['ADMINISTRATOR'],
  run: async (client, msg, args) => {
    const numDaIssue: number = parseInt(args[0]);

    const embedMsg = (data) => {
      const embed: MessageEmbed = new MessageEmbed()
        .setColor('#FF9E84')
        .setAuthor(`Detalhes da Issue #${data.iid}`)
        .setTitle(`${data.title}`)
        .setDescription(`${data.web_url}` + '\n\n' + `${data.description}`)
        .setThumbnail(data.assignee.avatar_url)
        .addFields(
          { name: 'Autor da Issue', value: `${data.author.name}` },
          { name: 'Due Date', value: `${data.due_date}` },
          { name: 'Labels', value: `${data.labels}` }
        )
        .setFooter(
          `Assignee atual ${data.assignee.username}`,
          `${data.assignee.avatar_url}`
        );
      return embed;
    };

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
          // console.log(resp.data);
          return resp.data[0];
        });

      console.log(response);
      msg.reply(embedMsg(response));
    } catch (err) {
      console.log(err);
    }
  },
};
