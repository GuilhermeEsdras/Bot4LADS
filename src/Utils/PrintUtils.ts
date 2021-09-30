export class PrintUtils {
  public printHeader(msg: string, sep: string) {
    const defaultSep: string = '|' + sep + sep.repeat(msg.length) + sep + '|';
    console.log(defaultSep);
    console.log('| ' + msg + ' |');
    console.log(defaultSep);
  }

  public repeatSep(sep: string, quant: number) {
    console.log(sep.repeat(quant));
  }
}

export const iniciaPrintUtils = () => new PrintUtils();
