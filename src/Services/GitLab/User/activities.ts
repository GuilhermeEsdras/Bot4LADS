import { GitLabServices } from '../gitlab-services';

export type ActivityTypes = 'COMMENT' | 'PUSH' | 'MR';

class UserActivitiesServices extends GitLabServices {
  private _email: string;
  public get email() {
    return this._email;
  }

  constructor(email: string) {
    super();
    this._email = email;
  }

  public async getLastActivities(quant: number, activityType?: ActivityTypes) {
    return await this.searchUser(this.email)
      .then((userData) => {
        return this.getUserContributionEvents(userData.id);
      })
      .then((userContributionEvents: Record<string, any>[]) => {
        const activies = [];
        let cont = 0;
        console.log();

        if (activityType) {
          if (activityType == 'COMMENT') {
            userContributionEvents.forEach((activity) => {
              if (cont == quant) return;
              const actionName: string = activity.action_name;
              if (actionName.startsWith('commented')) activies.push(activity);
              cont++;
            });
          } else if (activityType == 'MR') {
            userContributionEvents.forEach((activity) => {
              if (cont == quant) return;
              const actionName: string = activity.action_name;
              const targetType: string | null = activity.target_type;
              if (
                actionName == 'opened' &&
                targetType &&
                targetType == 'MergeRequest'
              )
                activies.push(activity);
              cont++;
            });
          } else if (activityType == 'PUSH') {
            userContributionEvents.forEach((activity) => {
              if (cont == quant) return;
              const actionName: string = activity.action_name;
              const targetType: string | null = activity.target_type;
              if (
                actionName == 'opened' &&
                targetType &&
                targetType == 'MergeRequest'
              )
                activies.push(activity);
              cont++;
            });
          }
        } else {
          userContributionEvents.forEach((activity) => {
            if (cont == quant) return;
            activies.push(activity);
            cont++;
          });
        }
      });
  }

  public async getLastComments(quant: number) {
    return await this.getLastActivities(quant, 'COMMENT').then(
      (lastComments) => {
        console.log('getlast', lastComments);
        return lastComments;
      }
    );
  }

  public async getLastLogin() {}
}

export const userActivitiesServices = (email: string) =>
  new UserActivitiesServices(email);
