import { MessageEmbed } from 'discord.js';

export default class Issue {
  private _id: number;
  public getId(): number {
    return this._id;
  }
  public setId(id: string | number) {
    this._id = typeof id === 'string' ? parseInt(id) : id;
  }

  private _iid: number;
  public getIid(): number {
    return this._iid;
  }
  public setIid(iid: string | number) {
    this._id = typeof iid === 'string' ? parseInt(iid) : iid;
  }

  private _projectId: number;
  public getProjectId(): number {
    return this._projectId;
  }
  public setProjectId(projectId: string | number) {
    this._projectId =
      typeof projectId === 'string' ? parseInt(projectId) : projectId;
  }
  private _title: string;
  public getTitle(): string {
    return this._title;
  }
  public setTitle(title: string) {
    this._title = title;
  }

  private _description: string | null;
  public getDescription(): string | null {
    return this._description;
  }
  public setDescription(description: string | null) {
    this._description = description;
  }

  private _state: string;
  public getState(): string {
    return this._state;
  }
  public setState(state: string) {
    this._state = state;
  }

  private _duedate: Date | null;
  public getDueDate(): Date | null {
    return this._duedate;
  }
  public setDueDate(date: string | Date | null) {
    try {
      this._duedate = new Date(date);
    } catch (error) {
      console.error(error);
    }
  }

  private _creationDate: Date;
  public getCreationDate(): Date {
    return this._creationDate;
  }
  public setCreationDate(creationDate: string | Date) {
    try {
      this._creationDate = new Date(creationDate);
    } catch (error) {
      console.error(error);
    }
  }

  private _updatedDate: Date | null;
  public getUpdatedDate(): Date | null {
    return this._updatedDate;
  }
  public setUpdatedDate(updatedDate: string | Date | null) {
    try {
      this._updatedDate = new Date(updatedDate);
    } catch (error) {
      console.error(error);
    }
  }

  private _closedDate: Date | null;
  public getClosedDate(): Date | null {
    return this._closedDate;
  }
  public setClosedDate(closedDate: string | Date | null) {
    try {
      this._closedDate = new Date(closedDate);
    } catch (error) {
      console.error(error);
    }
  }

  private _closedBy: string | null;
  public getClosedBy(): string | null {
    return this._closedBy;
  }
  public setClosedBy(closedBy: string | null) {
    this._closedBy = closedBy;
  }

  private _labels: string[] | null;
  public getLabels(): string[] | null {
    return this._labels;
  }
  public setLabels(labels: string[] | null) {
    this._labels = labels;
  }

  private _assignee: string;
  public getAssignee(): string {
    return this._assignee;
  }
  public setAssignee(assignee: string) {
    this._assignee = assignee;
  }

  private _author: string;
  public getAuthor(): string {
    return this._author;
  }
  public setAuthor(author: string) {
    this._author = author;
  }

  private _hasTasks: boolean;
  public hasTasks(): boolean {
    return this._hasTasks;
  }
  public setHasTasks(has: boolean) {
    this._hasTasks = has;
  }

  constructor(data: Record<string, any>) {
    this.setId(data.id);
    this.setIid(data.iid);
    this.setProjectId(data.project_id);
    this.setTitle(data.title);
    this.setDescription(data.description);
    this.setState(data.state);
    this.setCreationDate(data.created_at);
    this.setUpdatedDate(data.updated_at);
    this.setClosedDate(data.closed_at);
    this.setLabels(data.labels);
    this.setAuthor(data.author.name);
    this.setAssignee(data.assignee.name);
    this.setDueDate(data.duedate);
    this.setHasTasks(data.has_tasks);
  }

  public toEmbed(): MessageEmbed {
    const addLine = (str: string) => `| - ${str}\n`;

    let description = '';
    description += addLine(this.getId().toString());

    return new MessageEmbed().setDescription(description);
  }
}
