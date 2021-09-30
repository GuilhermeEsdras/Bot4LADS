import moment from 'moment';

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  SUCCESS,
  OK,
}

export const MIN_LOG_LEVEL: LogLevel = LogLevel.DEBUG;

export class Logger {
  private _componentName: string;

  constructor(componentName: string) {
    this._componentName = componentName;
  }

  private log(logLevel: LogLevel, msg: string, cor: string): void {
    if (logLevel < MIN_LOG_LEVEL) return;
    const localTimeStr: string = moment().local().format('YYYY/MM/DD HH:mm:ss');
    const logLevelStr: string = LogLevel[logLevel];
    console.log(
      `${cor}${localTimeStr} ${logLevelStr} [${this._componentName}] > ${msg}\x1b[0m`
    );
  }

  public debug(msg: string) {
    this.log(LogLevel.DEBUG, msg, '\x1b[2m');
  }

  public info(msg: string) {
    this.log(LogLevel.INFO, msg, '');
  }

  public warn(msg: string) {
    this.log(LogLevel.WARN, msg, '\x1b[33m');
  }

  public error(msg: string) {
    this.log(LogLevel.ERROR, msg, '\x1b[31m');
  }

  public success(msg: string) {
    this.log(LogLevel.SUCCESS, msg, '\x1b[32m');
  }

  public ok(msg: string) {
    this.log(LogLevel.OK, msg, '\x1b[34m');
  }

  public separator(tamanho: number) {
    console.log('-'.repeat(tamanho));
  }
}

export const criaLogger = (componentName: string) => new Logger(componentName);
