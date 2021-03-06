import { criaLogger, Logger } from '../../Logs';
import request from './gitlab-request';

export class GitLabServices {
  private logger: Logger = criaLogger('GitLabService');
  private repoURL: string;

  public setRepoURL(repoURL: string) {
    this.repoURL = repoURL;
  }

  public getRepoURL() {
    return this.repoURL;
  }

  public async getUserAvatar(email: string) {
    return request
      .get(`/avatar?email=${email}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.logger.error('Houve um erro no request getUserAvatar');
        console.log(error);
      })
      .finally(() => this.logger.info('Request getUserAvatar finalizado'));
  }

  public async searchUser(name: string) {
    return request
      .get(`/search?scope=users&search=${name}`)
      .then((response) => {
        return response.data[0];
      })
      .catch((error) => {
        this.logger.error('Houve um erro no request searchUser');
        console.log(error);
      })
      .finally(() => this.logger.info('Request searchUser finalizado'));
  }

  public async getQuantOfUserContributionEvents(userId: number) {
    let page = 1;
    let quantActivies = 0;
    let stop = false;
    while (!stop) {
      let quantsPage = 0;
      await request
        .get(`/users/${userId}/events?page=${page++}`)
        .then((resp) => {
          resp.data.forEach(() => quantsPage++);
        })
        .catch((error) => {
          this.logger.error(
            'Houve um erro no request de getUserContributionEvents'
          );
          console.log(error);
        })
        .finally(() =>
          this.logger.info(
            `Request getUserContributionEvents na pagina ${page} finalizado com ${quantsPage} atividades encontradas`
          )
        );
      if (!quantsPage) stop = true;
      else quantActivies = quantActivies + quantsPage;
    }
    return quantActivies;
  }

  public async getUserContributionEvents(userId: number, pagina: number) {
    return request
      .get(`/users/${userId}/events?page=${pagina}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.logger.error(
          'Houve um erro no request de getUserContributionEvents'
        );
        console.log(error);
      })
      .finally(() =>
        this.logger.info(
          `Request getUserContributionEvents na pagina ${pagina} finalizado`
        )
      );
  }

  public async getIssuesByLabels(labels: string[]) {
    if (!this.getRepoURL()) {
      this.logger.error('Nenhum Repositorio setado!');
      return;
    }
    return request
      .get(`${this.getRepoURL()}/issues?labels=${labels.join(',')}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.logger.error('Houve um erro no request de getIssuesByLabels');
        console.log(error);
      })
      .finally(() => this.logger.info('Request getIssuesByLabels finalizado'));
  }
}

export const gitLabService = () => new GitLabServices();
