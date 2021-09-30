import request from './gitlab-request';

export class GitLabService {
  public async getUserAvatar(email: string) {
    return request.get(`/avatar?email=${email}`).then((response) => {
      return response.data;
    });
  }
}

export const gitLabService = () => new GitLabService();
