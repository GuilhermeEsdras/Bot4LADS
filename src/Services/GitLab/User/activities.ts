import { GitLabServices } from '../gitlab-services';

export type ActivityTypes = 'COMMENT' | 'PUSH' | 'MR' | 'COMMIT' | 'NEW_BRANCH';

class UserActivitiesServices extends GitLabServices {
  private _email: string;
  public get email() {
    return this._email;
  }

  constructor(email: string) {
    super();
    this._email = email;
  }

  public async getNumberOfActivities(activityType: ActivityTypes) {
    return await this.searchUser(this.email).then(async (userData) => {
      let numberOfActivies = 0;
      let pagina = 1;
      let stop = false;
      while (!stop) {
        const userContributionEventsInThisPage =
          await this.getUserContributionEvents(userData.id, pagina++);

        if (!userContributionEventsInThisPage.length) stop = !stop;
        else {
          if (activityType == 'COMMENT') {
            for (let i = 0; i < userContributionEventsInThisPage.length; i++) {
              const actionName: string =
                userContributionEventsInThisPage[i].action_name;
              if (actionName.startsWith('commented')) {
                // É um comentário!
                numberOfActivies++;
              }
            }
          } else if (activityType == 'MR') {
            for (let i = 0; i < userContributionEventsInThisPage.length; i++) {
              const actionName: string =
                userContributionEventsInThisPage[i].target_type;
              if (actionName == 'MergeRequest') {
                // É um MR!
                numberOfActivies++;
              }
            }
          } else if (activityType == 'PUSH') {
            for (let i = 0; i < userContributionEventsInThisPage.length; i++) {
              const actionName: string =
                userContributionEventsInThisPage[i].action_name;
              if (actionName.startsWith('pushed')) {
                // É um Push!
                numberOfActivies++;
              }
            }
          } else if (activityType == 'COMMIT') {
            for (let i = 0; i < userContributionEventsInThisPage.length; i++) {
              const actionName: string =
                userContributionEventsInThisPage[i].action_name;
              if (actionName == 'pushed to') {
                // É um commit!
                numberOfActivies++;
              }
            }
          } else if (activityType == 'NEW_BRANCH') {
            for (let i = 0; i < userContributionEventsInThisPage.length; i++) {
              const actionName: string =
                userContributionEventsInThisPage[i].action_name;
              if (actionName == 'pushed new') {
                // É uma nova branch!
                numberOfActivies++;
              }
            }
          }
        }
      }

      return numberOfActivies;
    });
  }

  public async getLastActivities(quant: number, activityType?: ActivityTypes) {
    return await this.searchUser(this.email).then(async (userData) => {
      const activities = [];

      let atividadesEncontradas = 0;
      let pagina = 1;

      while (atividadesEncontradas < quant) {
        const userContributionEvents: Record<string, any>[] =
          await this.getUserContributionEvents(userData.id, pagina++);
        if (!userContributionEvents.length) break;

        const procuraAtividade = (target: string, condition: string) => {
          for (
            let i = 0;
            i < userContributionEvents.length && atividadesEncontradas < quant;
            i++
          ) {
            if (target.startsWith(condition)) {
              activities.push(userContributionEvents[i]);
              atividadesEncontradas++;
            }
          }
        };

        if (activityType) {
          if (activityType == 'COMMENT') {
            for (
              let i = 0;
              i < userContributionEvents.length &&
              atividadesEncontradas < quant;
              i++
            ) {
              const actionName: string = userContributionEvents[i].action_name;
              if (actionName.startsWith('commented')) {
                // É um comentário!
                activities.push(userContributionEvents[i]);
                atividadesEncontradas++;
              }
            }
          } else if (activityType == 'MR') {
            for (
              let i = 0;
              i < userContributionEvents.length &&
              atividadesEncontradas < quant;
              i++
            ) {
              const targetType: string = userContributionEvents[i].target_type;
              if (targetType == 'MergeRequest') {
                // É um MR!
                activities.push(userContributionEvents[i]);
                atividadesEncontradas++;
              }
            }
          } else if (activityType == 'PUSH') {
            for (
              let i = 0;
              i < userContributionEvents.length &&
              atividadesEncontradas < quant;
              i++
            ) {
              const actionName: string = userContributionEvents[i].action_name;
              if (actionName.startsWith('pushed')) {
                // É um Push!
                activities.push(userContributionEvents[i]);
                atividadesEncontradas++;
              }
            }
          } else if (activityType == 'COMMIT') {
            for (
              let i = 0;
              i < userContributionEvents.length &&
              atividadesEncontradas < quant;
              i++
            ) {
              const actionName: string = userContributionEvents[i].action_name;
              if (actionName == 'pushed to') {
                // É um commit!
                activities.push(userContributionEvents[i]);
                atividadesEncontradas++;
              }
            }
          } else if (activityType == 'NEW_BRANCH') {
            for (
              let i = 0;
              i < userContributionEvents.length &&
              atividadesEncontradas < quant;
              i++
            ) {
              const actionName: string = userContributionEvents[i].action_name;
              if (actionName == 'pushed new') {
                // É uma nova branch!
                activities.push(userContributionEvents[i]);
                atividadesEncontradas++;
              }
            }
          }
        } else {
          for (
            let i = 0;
            i < userContributionEvents.length && atividadesEncontradas < quant;
            i++
          ) {
            activities.push(userContributionEvents[i]);
            atividadesEncontradas++;
          }
        }
      }

      return activities;
    });
  }

  public async getLastComments(quant: number) {
    return await this.getLastActivities(quant, 'COMMENT').then(
      (lastComments) => {
        return lastComments;
      }
    );
  }

  public async getLastMergeRequests(quant: number) {
    return await this.getLastActivities(quant, 'MR').then(
      (lastMergeRequests) => {
        return lastMergeRequests;
      }
    );
  }

  public async getLastPushs(quant: number) {
    return await this.getLastActivities(quant, 'PUSH').then((lastPush) => {
      return lastPush;
    });
  }

  public async getLastCommits(quant: number) {
    return await this.getLastActivities(quant, 'COMMIT').then((lastPush) => {
      return lastPush;
    });
  }

  public async getLastNewBranches(quant: number) {
    return await this.getLastActivities(quant, 'NEW_BRANCH').then(
      (lastPush) => {
        return lastPush;
      }
    );
  }
}

export const userActivitiesServices = (email: string) =>
  new UserActivitiesServices(email);
